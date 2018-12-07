var bodyParser = require('body-parser');
var books = require('./routes/books');
var conversation = require('./routes/conversation');
var express = require('express');
var fs = require('fs');
var handler = require('./handler');
var http = require('http');
var livecheck = require('./routes/livecheck');
var log = require('./log');
var path = require('path');

module.exports = createServer();

function createServer () {
  const errorFile = fs.createWriteStream('logs/errors.log', { flags: 'a' });
  process.__defineGetter__('stderr', () => {
    return errorFile;
  });

  const indexPath = path.join(__dirname,'../../client/public/index.html')

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.all('*', handler.requestLogging);

  app.get('/', (req, res) =>{
    res.snedFile(indexPath);
  })

  app.use('/livecheck', livecheck.router());

  app.use('/v1/books', books.router());

  app.use('/conversation', conversation.router()); //routing to the conversation functions

  let port = 5000;

  http.createServer(app).listen(port);

  process.on('SIGBREAK', () => shutdown());
  process.on('SIGINT', () => shutdown());
  process.on('SIGTERM', () => shutdown());

  console.log(`Omnibus is listening on port ${port}`);
  console.log(path.join(__dirname,'../'));
  log.info(`Omnibus is listening on port ${port}`);

  return app;
}

function shutdown () {
  log.info('Stopping...');
  process.exit();
}
