const app = require('./app');
const http = require('http');
const log = require('./log');
const fs = require('fs');

module.exports = createServer();

function createServer () {
  const errorFile = fs.createWriteStream('logs/errors.log', { flags: 'a' });
  process.__defineGetter__('stderr', () => {
    return errorFile;
  });

  let port = 5000;

  http.createServer(app).listen(process.env.PORT || port);

  process.on('SIGBREAK', () => shutdown());
  process.on('SIGINT', () => shutdown());
  process.on('SIGTERM', () => shutdown());

  console.log(`Omnibus is listening on port ${port}`);
  log.info(`Omnibus is listening on port ${port}}`);

  return app;
}

function shutdown () {
  log.info('Stopping...');
  process.exit();
}
