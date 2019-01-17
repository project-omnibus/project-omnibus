process.env.NODE_ENV = 'development';
require('@babel/register')({
  ignore: [/build/, /node_modules/],
  presets: ['@babel/preset-env', '@babel/preset-react']
});
require.extensions['.css'] = () => {
  return;
};
// const hook = require('css-modules-require-hook');
//
// hook({
//   generateScopedName: '[name]__[local]___[hash:base64:5]',
// });
require('@babel/polyfill');
require('es6-promise').polyfill();
require('isomorphic-fetch');

require('./server.js');
