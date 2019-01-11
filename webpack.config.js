var path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        use: [
            {
              loader: MiniCssExtractPlugin.loader
            },

            {
              loader: "css-loader",
              // options: {
              //   sourceMap: true,
              //   modules: true,
              //   localIdentName: "[local]___[hash:base64:5]"
              // }
            },
            //
            // {
            //   loader: 'postcss-loader'
            // }
          ],
        exclude: [
          path.join(__dirname,'node_modules'),
          path.join(__dirname,'processUserResponse'),
          path.join(__dirname,'static'),
          path.join(__dirname,'templates'),
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
        },
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.es6'],
  }
};
