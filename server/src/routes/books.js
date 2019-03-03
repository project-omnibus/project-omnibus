var _ = require('underscore');
var env = require('../env');
var express = require('express');
var log = require('../log');
var request = require('request-promise');

module.exports = {
  router: () => {
    var router = express.Router();
    router.route('/').get(getTopRelatedBooks);

    return router;
  }
};

function getTopRelatedBooks (req, res) {
  if (!req.query.q) {
    return res.status(400)
      .json({
        error: 'Missing required query parameter: q'
      });
  }

  req.query.key = env.googleApiKey;
  req.query.orderBy = 'relevance';
  req.query.maxResults = '5';

  request({
    uri: `https://www.googleapis.com/books/v1/volumes`,
    qs: req.query,
    json: true
  })
    .then(response => {
      const topRelatedBooks = _.map(response.items, (item) => {
        return item.volumeInfo;
      });

      log.info(`Found related books: [${topRelatedBooks.join(', ')}]`);
      res.json({
        relatedBooks: topRelatedBooks
      });
    })
    .catch(err => {
      log.info(err);
      res.status(err.statusCode)
        .json(err.error);
    });
}
