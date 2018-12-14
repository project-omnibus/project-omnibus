process.env.NODE_ENV = 'development';
require('@babel/register')({
  ignore: [/build/, /node_modules/],
  presets: ["@babel/preset-env","@babel/preset-react"]
});

require('@babel/polyfill');
require('es6-promise').polyfill();
require('isomorphic-fetch');

require('./server.js');
