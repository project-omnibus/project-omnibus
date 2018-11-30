var _ = require('underscore');
var env = require('../env');
var log = require('../log');
var request = require('request-promise');
var pg = require('pg');
pg.defaults.ssl = true;
var async = require('async');




var databaseURL = process.env.OMNIBUS_DATABASE_URL;
var databaseHost = process.env.OMNIBUS_DATABASE_HOST;
var databaseUser = process.env.OMNIBUS_DATABASE_USERNAME;
var databasePassword = process.env.OMNIBUS_DATABASE_PASSWORD;


//Remove all non-keywords from user answer and assign the keywords to the appropriate user attribute property in the req.
exports.handle_user_input = function(req,res,next){
	//removing keywords from user input
	var keywords = removeNonKeywords(req.body.answer);

	//if the current question doesn't have user attribute assigned, append keyword to user attribute "keyword" property
	if(!req.body.currentQ.userAttribute){
		req.attribute.keywords.push(keywords);
	} else {
		// if the current question has user attribute assigned, append new property to usre attribute with the keywords from the user as the value for it
		var attribute = {[req.body.currentQ.userAttribute]:keywords};
		req.attribute.push(attribute);
	}

	//append the current questions to the list of questions asked of in the user req object
	var currentQ_id = req.currentQ.qid;
	req.qAskedID.push(currentQ_id);

	//print to console if middleware performed all actuions.
	console.log("input handling first middleware successful");
	next();
}

//generating the next question to send to user to answer
exports.generate_response = function(req,res){
	//make the current user session from the req
	var userSession = {relevancy:req.relevancy, qAskedID:req.qAskedID,attribute:req.attribute,currentQ:{}, answer:[]};
	//get the follow up questions of the current question from database
	var client = new pg.Client({
		connectionString: databaseURL,
	});
	client.connect();

	//the question id of the current question in the post
	var qid = req.body.currentQ.qid

	//query for follow up question ids
	client.query("SELECT * FROM question_followup_table WHERE question_id = $1",[qid])
		.then(result =>{
			//append the follow up question id to current question's followUpBy property
			for (i=0; i<result.rows.length; i++){
				req.currentQ.followUpBy.push(result.rows[i].follow_up_by_id);
			}

			//use the values in followUpBy and current relevancy list to update to a new relevancy list
			var newRelevancy = assignRelevancy(req.currentQ, req.relevancy);
			userSession.relevancy = newRelevancy;
			var maxRelevancy = findMaxRelevancy(newRelevancy);
			var next_question ={}

			//query for the next question by using th new index of the max relevancy in relevancy list
			client.query("SELECT * FROM question_table WHERE question_id = $1",[maxRelevancy[0]])
				.then(result => {
					next_question = {qid:results.rows[maxRelevancy[0]].question_id, question:result.rows[maxRelevancy[0]].question, userInput:result.rows[maxRelevancy[0]].need_user_input, relevancy:result.rows[maxRelevancy[0]].default_relevancy, specificity:result.rows[maxRelevancy[0]].specificity, userAttribute:[result.rows[maxRelevancy[0]].userAttribute], folloupBy:[]};
					userSession.currentQ = next_question;
					res.json(userSession);
				})
				.catch(err => {
				log.info(err);
      			res.status(err.statusCode)
        		.json(err);
			});
		})
		.catch(err => {
				log.info(err);
      			res.status(err.statusCode)
        		.json(err);
		});
};


//make and returns the list of questions as a json
exports.make_init_user = function(req,res,next) {
	if (!req.params.relevancy) {// check if the req is empty, therefore it is a new session and there has been no request yet. Make the initial user request
		var client = new pg.Client({
			connectionString: databaseURL,
		});
		client.connect();
		var userSession = {relevancy:[], qAskedID:[],attribute:{keywords:[]},currentQ:{}, answer:[]};
		//make the questionList object from the question table on the database.
		client.query("SELECT * FROM question_table")
			.then(result => {
				if (result.length == 0){
					res.sent("No Questions Found");
				}
				for (i=0; i<result.rows.length; i++){
					//question object has fields: question[text], userInput[boolean], relevancy[integer], specificity[integer], userAttribute[string], followupBy[array of integer]
					//followupBy field is NULL after this operation because that is in another table
					userSession.relevancy[i]=result.rows[i].default_relevancy;
					//questionList[i]={question:result.rows[i].question, userInput:result.rows[i].need_user_input, relevancy:result.rows[i].default_relevancy, specificity:result.rows[i].specificity, userAttribute:result.rows[i].userAttribute, followUpBy:[]};
				}
				var maxRelevancy = findMaxRelevancy(userSession.relevancy);
				var first_question={qid:results.rows[maxRelevancy[0]].question_id, question:result.rows[maxRelevancy[0]].question, userInput:result.rows[maxRelevancy[0]].need_user_input, relevancy:result.rows[maxRelevancy[0]].default_relevancy, specificity:result.rows[maxRelevancy[0]].specificity, userAttribute:[result.rows[maxRelevancy[0]].userAttribute], folloupBy:[]};
				userSession.currentQ = first_question;
				res.json(userSession);
			})
			.catch(err => {
				log.info(err);
      			res.status(err.statusCode)
        		.json(err);
			});
	} else {
		console.log(req.params.relevancy);
		next();
	}
}


// returns the index of the maximum and the maximum of a array of numbers
findMaxRelevancy=function(arr){
	if(arr.length == 0){
		return -1;
	}
	var max = arr[0];
	var maxIndex = 0;
	for (i=0; i<arr.length; i++){
		if (arr[i] > max) {
			maxIndex = i;
			max = arr[i];
		}
	}
	return [maxIndex, max];
}

function removeNonKeywords(message){
	//removes words like "the"/"and" from the user's message to identify keywords for searching through book recommendations

	const definiteArticles = ['the']
	const indefiniteArticles = ['a', 'an']
	const infinitives = ['is','be','am','are','do']
	const auxVerbs = ['be', 'have', 'will', 'shall', 'would', 'should', 'can', 'could', 'may', 'might', 'must', 'ought'];
	const pronouns = ['i','you','me','my','he','she','they','myself','yourself','himself','herself','itself','it','him','her','we','us','them','ourselves','yourselves','themselves']
	const prepositions = ['on', 'at', 'in', 'of', 'to', 'for', 'with', 'over', 'by']
	const conjunctions = ['and', 'but', 'or', 'so', 'for', 'yet', 'either', 'neither', 'nor', 'although', 'after', 'before', 'because', 'how', 'if', 'once', 'since', 'that', 'until', 'unless', 'when', 'while', 'where', 'whether', 'however', 'therefore', 'moreover', 'then', 'otherwise', 'nevertheless', 'instead', 'meanwhile', 'likewise']

	const nonkeywords =
		definiteArticles.concat(
			indefiniteArticles,
			infinitives,
			auxVerbs,
			pronouns,
			prepositions,
			conjunctions
		);

	const punctuation = ['.','"',',','/','?',':',';','!','(',')']; //except apostrophe

	const separators = punctuation.concat([' ','/']);

	let keywords = [];

	let word = '';

	for (var i = 0; i < message.length; i++) {
		//for char in message
		const char = message.charAt(i)
		if (separators.includes(char)){
			//if the char is a separator or in the punctuation array
			if((word != '') && !(nonkeywords.includes(word))){
				//and if the word is not blank and in the nonkeywords array
				//store word into keywords list
				keywords = keywords.push(word);
				//clear words variable
				word = '';
			}
			//otherwise continue to the next char
		}
		else{
			//if the char is not a separator or in the punctuation array
			//store letter into a word variable
			word = word + char;
		}
	}
	return keywords;
}

assignRelevancy = function(qObject, relevancyList){
	// Function assigns the relevancy of all questions in the question
	//qObject is the question object of the current question that was just asked
	//qObjectList is the complete array of all question objects, including the current one
	//the index of qObjectList and qObject should be the same, starting at 0
	relevancyList[(qObject.index)] = 0; //set the relevancy of the current question in question array to 0
	var followUpLen = qObject.followUpBy.length; //get the length of the number of folloUpBy question to the current question
	if (followUpLen != 0) { //if length isn't 0, then there is some questions that can follow up to current question, set relevancy of those questions to 100.
		for (i = 0; i<followUpLen; i++) {
			relevancyList[qObject.followUpBy[i]]=100*(qObject.followUpBy[i].relevancy-9); //"-9" here beacuse the minimum default relevancy is 10 for now
		}
	}
}
