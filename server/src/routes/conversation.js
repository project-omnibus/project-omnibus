var _ = require('underscore');
var env = require('../env');
var express = require('express');
var log = require('../log');
var request = require('request-promise');
var question = require('../controllers/questionController')

module.exports = {
  router: () => {
    var router = express.Router();
    router.route('/').get(question.grab_question);
    return router;
  }
};