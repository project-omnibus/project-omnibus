var express = require('express');
var bookSearch = require('../controllers/bookSearchController');
var bodyParser = require('body-parser');

module.exports = {
  router: () => {
    var router = express.Router();

    router.use('/', bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));

    router.use('/', bookSearch.createSearchTerms);
    router.use('/', bookSearch.searchBooks);

    return router;
  }
};
