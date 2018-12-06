var _ = require('underscore');
var log = require('./log');

module.exports = {
  requestLogging
};

function requestLogging (req, res, next) {
  // Log all but /livecheck requests.
  if (req.originalUrl !== '/livecheck') {
    // Remove empty objects/strings/arrays.
    const obj = _.omit({
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      query: req.query,
      body: req.body,
      correlationId: req.id
    }, _.isEmpty);

    log.info(obj, 'API request');
  }

  next();
}
