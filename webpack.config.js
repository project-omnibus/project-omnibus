var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: ['@babel/polyfill', './client/src/index.js']
  },
  output: {
    path:path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module:{
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.join(__dirname),
        exclude: [
          path.join(__dirname,'node_modules'),
          path.join(__dirname,'processUserResponse'),
          path.join(__dirname,'static'),
          path.join(__dirname,'templates'),
        ],
      },
      {
        test: /\.css$/,
        loader: ['css-loader'],
        exclude: [
          path.join(__dirname,'node_modules'),
          path.join(__dirname,'processUserResponse'),
          path.join(__dirname,'static'),
          path.join(__dirname,'templates'),
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/public/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.es6'],
  }
};
