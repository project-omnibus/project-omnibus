var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: ['./client/src/index.js'],
  output: {
    pah:path.join(_dirname, 'build'),
    filename: 'bundle.js'
  },
  module:{
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname),
        exclude: [
          path.join(__dirname,'node_modules'),
          path.join(__dirname,'server/node_modules'),
          path.join(__dirname,'client/node_modules')
        ],
        query:{
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
