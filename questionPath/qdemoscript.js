var qfunctions = require('./qfunction.js');
var pg = require('pg');
pg.defaults.ssl = true;
var http = require('http');
var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	var databaseURL = process.env.OMNIBUS_DATABASE_URL;
	var databaseHost = process.env.OMNIBUS_DATABASE_HOST;
	var databaseUser = process.env.OMNIBUS_DATABASE_USERNAME;
	var databasePassword = process.env.OMNIBUS_DATABASE_PASSWORD;

})


var client = new pg.Client({
	connectionString: databaseURL,
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

client.connect();
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




http.createServer(function (req, res) {

		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write ('Hello World');
    	res.write (questionList.rows[0].question);
    	res.end();	

}).listen(8080);