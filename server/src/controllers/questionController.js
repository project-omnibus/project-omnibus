var _ = require('underscore');
var env = require('../env');
var log = require('../log');
var request = require('request-promise');
var pg = require('pg');
pg.defaults.ssl = true;
var natural = require('natural');
var lowerCase = require('lower-case');
var path = require('path');
var nlpCore = require('./nlpCore')

/*import CoreNLP, { Properties, Pipeline, ConnectorCli } from 'corenlp';

const connector = new ConnectorCli({
  classPath: "\"corenlp/stanford-corenlp-full-2018-10-05/*\""
});
const props = new Properties({
  annotators: 'tokenize,ssplit,pos,lemma,ner,parse',
});
const pipeline = new Pipeline(props, 'English', connector); */

//sql database url
var databaseURL = env.databaseURL;

var natural_base_folder = path.join(path.dirname(require.resolve("natural")), "brill_pos_tagger");
var rulesFilename = natural_base_folder + "/data/English/tr_from_posjs.txt";
var lexiconFilename = natural_base_folder + "/data/English/lexicon_from_posjs.json";
var defaultCategory = 'N';


//Remove all non-keywords from user answer
//assign the keywords to the appropriate user attribute property in the req.
exports.handle_user_input = function(req,res,next){
	log.info('handle_user_input is called');
	//removing keywords from user input
	var tokenizer = new natural.WordTokenizer();
	var answerTokens = tokenizer.tokenize(req.body.answer);

	//var lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
	//var rules = new natural.RuleSet(rulesFilename);
	//var tagger = new natural.BrillPOSTagger(lexicon,rules);

	//console.log(typeof(req.body.answer));
	//console.log(typeof(req.body.currentQ.question));
	//console.log(tagger.tag(answerTokens));
	//console.log(tagger.tag(tokenizer.tokenize(req.body.currentQ.question)));

	//var coreToken = nlpCore.simpleTokenize(req.body.answer);

	/*const sent = new CoreNLP.simple.Sentence(req.body.answer);
	pipeline.annotate(sent)
  	.then(sent => {
    	console.log(sent.words());
    	console.log(sent.nerTags());
  })
  .catch(err => {
    console.log('err', err);
  });*/ //commented for now because it returns a JSON file and don't know how to use it yet.

	var keywords = removeNonKeywords(answerTokens);

	//if the current question doesn't have user attribute assigned, append keyword to user attribute "keyword" property
	if(JSON.stringify(req.body.currentQ.userAttribute) == "null"){
		log.info('quesiton has no user attribute pushing keywords to keywords prop of user attribute');
		req.body.attribute.keywords.push(keywords);
	} else {
		// if the current question has user attribute assigned, append new property to usre attribute with the keywords from the user as the value for it
		log.info('quesiton has user attribute: ' + req.body.currentQ.userAttribute + ', pushing keywords into user attribute');
		var attribute_key = req.body.currentQ.userAttribute;
		//if the attribute is already in the user session profile, append instead of assign
		if(req.body.attribute.hasOwnProperty(attribute_key)){
			req.body.attribute[attribute_key].push(keywords);
		} else{
			req.body.attribute[attribute_key]=keywords;
		}
	}

	//append the current questions to the list of questions asked of in the user req object
	var currentQ_id = req.body.currentQ.qid;
	req.body.qAskedID.push(currentQ_id);

	//print to console if middleware performed all actuions.
	log.info("input handling first middleware successful");
	next();
}

//generating the next question to send to user to answer
exports.generate_response = function(req,res){
	log.info('generat_response is called');
	//make the current user session from the req
	var userSession = req.body;
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
			for (var i=0; i<result.rows.length; i++){
				req.body.currentQ.followUpBy.push(result.rows[i].follow_up_by_id);
			}

			//use the values in followUpBy and current relevancy list to update to a new relevancy list
			var newRelevancy = assignRelevancy(req.body.currentQ, req.body.relevancy);
			userSession.relevancy = newRelevancy;
			var maxRelevancy = findMaxRelevancy(newRelevancy);
			var next_question ={}

			//query for the next question by using th new index of the max relevancy in relevancy list
			client.query("SELECT * FROM question_table WHERE question_id = $1",[maxRelevancy[0]])
				.then(result => {
					next_question = {
						qid:result.rows[0].question_id,
						question:result.rows[0].question,
						userInput:result.rows[0].need_user_input,
						relevancy:result.rows[0].default_relevancy,
						specificity:result.rows[0].specificity,
						userAttribute:result.rows[0].userAttribute,
						followUpBy:[]};
					userSession.currentQ = next_question;
					log.info('user session updated with '+JSON.stringify(userSession))
					res.json(userSession);

				})
				.catch(err => {
				log.info(err);
      			res.status(err.statusCode)
        		.json(err);
			})
			.then(()=>client.end());
		})
		.catch(err => {
				log.info(err);
      			res.status(err.statusCode)
        		.json(err);
		});
};


//make and returns the list of questions as a json
exports.make_init_user = function(req,res,next) {
	log.info('make_init_user is called');
	if (!req.body.relevancy || req.body.relevancy.length == 0) {// check if the req is empty, therefore it is a new session and there has been no request yet. Make the initial user request
		log.info('make_init_user: Checked that there is no param in HTTP, making new user');
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
				for (var i=0; i<result.rows.length; i++){
					//question object has fields: question[text], userInput[boolean], relevancy[integer], specificity[integer], userAttribute[string], followupBy[array of integer]
					//followupBy field is NULL after this operation because that is in another table
					userSession.relevancy[i]=result.rows[i].default_relevancy;
					//questionList[i]={question:result.rows[i].question, userInput:result.rows[i].need_user_input, relevancy:result.rows[i].default_relevancy, specificity:result.rows[i].specificity, userAttribute:result.rows[i].userAttribute, followUpBy:[]};
				}
				var maxRelevancy = findMaxRelevancy(userSession.relevancy);
				var first_question={
					qid:result.rows[maxRelevancy[0]].question_id,
					question:result.rows[maxRelevancy[0]].question,
					userInput:result.rows[maxRelevancy[0]].need_user_input,
					relevancy:result.rows[maxRelevancy[0]].default_relevancy,
					specificity:result.rows[maxRelevancy[0]].specificity,
					userAttribute:result.rows[maxRelevancy[0]].userAttribute,
					followUpBy:[]};
				//console.log('query made' + JSON.stringify(first_question))
				userSession.currentQ = first_question;
				log.info('make_init_user: new user made sending back to client now');
				res.json(userSession);
			})
			.catch(err => {
				log.info(err);
      	if(err.statusCode >= 100 && statusCode < 600) {
					res.status(err.statusCode)
        		.json(err);
				} else {
					res.status(500)
        		.json(err);
				}
			})
			.then(()=>client.end());
	} else {
		console.log(req.body.qAskedID);
		log.info('user already in session, passing to handle_user_response now')
		next();
	}
}


// returns the index of the maximum and the maximum of a array of numbers
function findMaxRelevancy(arr){
	if(arr.length == 0){
		return -1;
	}
	var max = arr[0];
	var maxIndex = 0;
	for (var i=0; i<arr.length; i++){
		if (arr[i] > max) {
			maxIndex = i;
			max = arr[i];
		}
	}
	return [maxIndex, max];
}

function removeNonKeywords(message){
	//removes words like "the"/"and" from the user's message to identify keywords for searching through book recommendations
	//the message should be tokenized to individual words.

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



	for (var i = 0; i < message.length; i++) {
		//for every token in message
		if (!separators.includes(message[i]) && !nonkeywords.includes(lowerCase(message[i]))){
			//check if the message is included in any of the nonkeyword listslists
				keywords.push(lowerCase(message[i]));
		}
	}
	return keywords;
}

function assignRelevancy(qObject, relevancyList){
	// Function assigns the relevancy of all questions in the question
	//qObject is the question object of the current question that was just asked
	//qObjectList is the complete array of all question objects, including the current one
	//the index of qObjectList and qObject should be the same, starting at 0
	relevancyList[(qObject.qid)] = 0; //set the relevancy of the current question in question array to 0
	var followUpLen = qObject.followUpBy.length; //get the length of the number of folloUpBy question to the current question
	if (followUpLen != 0) { //if length isn't 0, then there is some questions that can follow up to current question, set relevancy of those questions to 100.
		for (var i = 0; i<followUpLen; i++) {
			relevancyList[qObject.followUpBy[i]]=100; //"-9" here beacuse the minimum default relevancy is 10 for now
		}
	}
	return relevancyList;
}
