var _ = require('underscore');
var env = require('../env');
var express = require('express');
var log = require('../log');
var request = require('request-promise');

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
	client.query("SELECT * FROM question_table", function (err, result, fields){
	if (err) {
		throw err;
	} else {
		setquestionList(result);
	}
	});
	client.query("SELECT * FROM question_followup_table",function(err,result,fields){
	if (err) {
		throw err;
	} else {
		setquestionFollowup(result);
	}
	});
	var questionList = [];
	function setquestionList(result){
		//questionList = result;
		for (i=0; i<result.rows.length; i++){
			questionList[i]={question:result.rows[i].question, userInput:result.rows[i].need_user_input, bbrelevancy:result.rows[i].default_relevancy,	specificity:result.rows[i].specificity, userAttribute:result.rows[i].userAttribute, followUpBy:[]};
		}
		//console.log(questionList);
	}

	function setquestionFollowup(result){
		for (i=0; i<result.rows.length; i++){
			questionList[result.rows[i].question_id].followUpBy.push(result.rows[i].follow_up_by_id);
		}
		//console.log(questionList)
	}
	res.render(questionList)
}