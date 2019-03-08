'use strict';

var _ = require('underscore');
var log = require('./log');
var uuid = require('node-uuid');
const fs = require('fs');

module.exports = {
  requestLogging,
  correlationId,
  conversationLogging,
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

function conversationLogging(req,res,next){
  let sessionId = req.body.sessionId;
  let fileName = './conversationlogs/conversation_'+sessionId+'.log';
  let question = req.body.currentQ.question;
  let answer = req.body.answer;
  let keyWordAttribute = req.body.attribute.keywords;
  let likeBookAttribute = req.body.attribute.likeBook;
  let likeGenreAttribute = req.body.attribute.likeGenre;
  let likeAuthorAttribute = req.body.attribute.likeAuthor;
  let readerType = req.body.attribute.readerType;
  let dataToWrite = 'question: '+question+'; ' + 'answer: '+answer+'; '+'Attribute Obtained: keywords: [' + keyWordAttribute + ']; likeBook: ['+likeBookAttribute + ']; likeGenre:[' + likeGenreAttribute +']; likeAuthor: ['+likeAuthorAttribute+']; readerType: [' + readerType + ']\n'

  fs.open(fileName, 'a', (err, fd) => {
    if (err) throw err;
    //for each key in req.body (which for now is just the userProfile object from Conversation.js)
    //write out the key's value as a string + ','
    //if the key is 'attribute' or currentQ, go through each of the keys in those objects as well
    //at the end write a new line character
    fs.appendFile(fd, dataToWrite, (err) => {
      fs.close(fd, (err) => {
        if (err) throw err;
      });
      if (err) throw err;
    });
  });
  next();
}

function correlationId (req, res, next) {
  req.id = uuid.v4();
  res.setHeader('X-Request-Id', req.id);

  next();
}
