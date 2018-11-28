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


exports.generate_response = function(req,res){
	res.send('function not made yet');
}

exports.handle_user_input = function(req,res,next){
	//need to write the code still!
	next()
}

//make and returns the list of questions as a json
exports.make_init_user = function(req,res,next) {
	if (!req.params.relevancy) {// check if the req is empty, therefore it is a new session and there has been no request yet. Make the initial user request
		var client = new pg.Client({
			connectionString: databaseURL,
		});
		client.connect();
		var userSession = {relevancy:[], qAskedID:[],attribute:[],currentQ:"", answer:[]};
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
				userSession.currentQ = result.rows[maxRelevancy[0]].question;
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


// finding the maximum of a array of numbers
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