var log4js = require('log4js');

module.exports = (() => {
  log4js.configure({
    appenders: {
      file: {
        type: 'file',
        filename: 'logs/omnibus.log',
        maxLogSize: 200000000 // 200 MBs
      },
      console: {
        type: 'console'
      }
    },
    categories: {
      default: {
        appenders: ['file', 'console'],
        level: 'info'
      }
    }
  });

  const logger = log4js.getLogger();

  return logger;
})();
