'use strict';

module.exports = (() => {
  return {
    googleApiKey: getGoogleApiKey(),
    databaseURL: getDatabaseURL()
  };
})();

function getGoogleApiKey () {
  // TODO: Use process environments for now.
  return process.env.GOOGLE_API_KEY || 'dumb-value-for-now';
}

function getDatabaseURL () {
  return process.env.OMNIBUS_DATABASE_URL || 'dumb-value-for-now';
}
