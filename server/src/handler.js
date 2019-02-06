'use strict';

var _ = require('underscore');
var log = require('./log');
var uuid = require('node-uuid');
const fs = require('fs');

module.exports = {
  requestLogging,
  correlationId
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
    if(req.method=='POST'){
      fs.open('conversation.log', 'a', (err, fd) => {
        if (err) throw err;
        //for each key in req.body (which for now is just the userProfile object from Conversation.js)
        //write out the key's value as a string + ','
        //if the key is 'attribute' or currentQ, go through each of the keys in those objects as well
        //at the end write a new line character
        fs.appendFile(fd, (JSON.stringify(req.body)+'\n'), 'utf8', (err) => {
          fs.close(fd, (err) => {
            if (err) throw err;
          });
          if (err) throw err;
        });
      });
    }

    log.info(obj, 'API request');
  }

  next();
}

function correlationId (req, res, next) {
  req.id = uuid.v4();
  res.setHeader('X-Request-Id', req.id);

  next();
}
