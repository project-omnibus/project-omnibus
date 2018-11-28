'use strict';

var fs = require('fs');
var log = require('./log');

module.exports = (() => {
  const variables = readVariables();

  return {
    googleApiKey: getGoogleApiKey(),
    // TODO: Writing this so style won't throw error about function not used.
    random: variables.something
  };
})();

function readVariables () {
  try {
    return fs.readFileSync('env-variables.json')
      .toString('utf-8')
      .trim();
  } catch (e) {
    log.error('Unable to read variables.json file.', e);
    throw e;
  }
}

function getGoogleApiKey () {
  // TODO: Use process environments for now.
  return process.env.GOOGLE_API_KEY || 'dumb-value-for-now';
}
