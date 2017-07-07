const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

const { LAN } = process.env;

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, 'src', 'index.js')],
  output: {
    path: path.join(__dirname, 'src', 'static'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.scss/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.js$/,
      use: [
        'babel-loader',
        'eslint-loader',
      ],
    }],
  },
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    contentBase: 'src',
    host: LAN || 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.tpl.html'),
      filename: 'index.html',
      inject: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
  ],
};

