var _ = require('underscore');
var env = require('../env');
var express = require('express');
var log = require('../log');
var request = require('request-promise');
var question = require('../controllers/questionController');
var books = require('../routes/books');
var bodyParser = require('body-parser');

module.exports = {
  router: () => {
    var router = express.Router();

    router.use('/', bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    router.use('/', question.make_init_user);
    router.use('/', question.handle_user_input);
    router.use('/', question.generate_response);

    return router;
  }
};
