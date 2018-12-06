module.exports = (() => {
  return {
    googleApiKey: getGoogleApiKey()
  };
})();

function getGoogleApiKey () {
  return process.env.GOOGLE_API_KEY || 'dumb-value-for-now';
}
