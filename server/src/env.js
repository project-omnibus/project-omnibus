'use strict';

var fs = require('fs');
var log = require('./log');

module.exports = (() => {
  return {
    googleApiKey: getGoogleApiKey(),
  };
})();

function getGoogleApiKey () {
  // TODO: Use process environments for now.
  return process.env.GOOGLE_API_KEY || 'dumb-value-for-now';
}
