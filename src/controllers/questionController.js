var _ = require('underscore');
var env = require('../env');
var express = require('express');
var log = require('../log');
var request = require('request-promise');
var pg = require('pg');
pg.defaults.ssl = true;
var async = require('async');

var databaseURL = process.env.OMNIBUS_DATABASE_URL;
var databaseHost = process.env.OMNIBUS_DATABASE_HOST;
var databaseUser = process.env.OMNIBUS_DATABASE_USERNAME;
var databasePassword = process.env.OMNIBUS_DATABASE_PASSWORD;

var client = new pg.Client({
	connectionString: databaseURL,
});
client.connect();

//make and returns the list of questions as a json
exports.grab_question = function(req,res) {
	var questionList = [];
	//make the questionList object from the question table on the database. 
	client.query("SELECT * FROM question_table")
		.then(result => {
			if (result.length == 0){
				res.sent("No Questions Found");
			}
			for (i=0; i<result.rows.length; i++){
				//question object has fields: question[text], userInput[boolean], relevancy[integer], specificity[integer], userAttribute[string], followupBy[array of integer]
				//followupBy field is NULL after this operation because that is in another table
				questionList[i]={question:result.rows[i].question, userInput:result.rows[i].need_user_input, relevancy:result.rows[i].default_relevancy, specificity:result.rows[i].specificity, userAttribute:result.rows[i].userAttribute, followUpBy:[]};
			}
			client.query("SELECT * FROM question_followup_table")
				.then(result => {
					// adds the follow-up question array to the question objects in the question list array. The follow-up quesiton is an array of integers
					for (i=0; i<result.rows.length; i++){
						questionList[result.rows[i].question_id].followUpBy.push(result.rows[i].follow_up_by_id);
					}
					res.json(questionList);
				})
				.catch(err => {
					log.info(err);
				});
		})
		.catch(err => {
			log.info(err);
      		res.status(err.statusCode)
        	.json(err);
		});
	//res.send("hello");
	//res.json(questionList);
	//res.render(questionList)
	//res.render(questionList[0].question)
}

// takes pg sql query and populates the questionlist array with question objects
function setquestionList(result){
	for (i=0; i<result.rows.length; i++){
		//question object has fields: question[text], userInput[boolean], relevancy[integer], specificity[integer], userAttribute[string], followupBy[array of integer]
		//followupBy field is NULL after this operation because that is in another table
		questionList[i]={question:result.rows[i].question, userInput:result.rows[i].need_user_input, relevancy:result.rows[i].default_relevancy, specificity:result.rows[i].specificity, userAttribute:result.rows[i].userAttribute, followUpBy:[]};
	}
}

// adds the follow-up question array to the question objects in the question list array. The follow-up quesiton is an array of integers
function setquestionFollowup(result){
	for (i=0; i<result.rows.length; i++){
		questionList[result.rows[i].question_id].followUpBy.push(result.rows[i].follow_up_by_id);
	}
}