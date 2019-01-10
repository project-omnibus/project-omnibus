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
import renderRouteMiddleware from '../../isomorph-middleware/renderRoute';

module.exports = createServer();

function createServer () {
  const errorFile = fs.createWriteStream('logs/errors.log', { flags: 'a' });
  process.__defineGetter__('stderr', () => {
    return errorFile;
  });

  const buildPath = path.join(__dirname, '../../', 'build');

  const app = express();

  app.set('port', 5000 || 8080);

  app.use('/', express.static(buildPath));

  console.log(buildPath);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('*', handler.requestLogging);

  app.use('/livecheck', livecheck.router());

  app.use('/v1/books', books.router());

  app.use('/conversation/api', conversation.router()); //routing to the conversation functions

  app.get('*',renderRouteMiddleware);

  if (process.env.NODE_ENV !== 'test') {
    http.createServer(app).listen(app.get('port'));
  }

  process.on('SIGBREAK', () => shutdown());
  process.on('SIGINT', () => shutdown());
  process.on('SIGTERM', () => shutdown());

  console.log(`Omnibus is listening on port ${app.get('port')}`);
  console.log(path.join(__dirname,'../'));
  log.info(`Omnibus is listening on port ${app.get('port')}`);

  return app;
}

function shutdown () {
  log.info('Stopping...');
  process.exit();
}
