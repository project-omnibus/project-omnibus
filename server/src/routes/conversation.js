var express = require('express');
var question = require('../controllers/questionController');
var bodyParser = require('body-parser');
var handler = require('../handler')

module.exports = {
  router: () => {
    var router = express.Router();

    router.use('/', bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    router.use('*', handler.conversationLogging);

    router.use('/', question.make_init_user);
    router.use('/', question.handle_user_input);
    router.use('/', question.generate_response);

    return router;
  }
};
