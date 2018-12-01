var _ = require('underscore');
var env = require('../env');
var express = require('express');
var log = require('../log');
var request = require('request-promise');
var question = require('../controllers/questionController')
var books = require('../routes/books')

module.exports = {
  router: () => {
    var router = express.Router();
    router.get('/',function(req,res){
    	res.sendFile("../../client/public/conversation.html");
    });
    router.get('/',question.make_init_user);
    router.use('/',question.handle_user_input);
    router.get('/',question.generate_response);

    return router;
  }
};
