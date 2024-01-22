'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    mainPage: "./js/index.js",
    time: {
      import: "./js/time.js",
      filename: "otherBundles/[name].js",
    },
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js/build'
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                debug: true,
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};