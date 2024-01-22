'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    mainPage: "./js/index.js",
    time: {
      import: "./js/time.js",
      filename: "otherBundles/bundle_[name].js",
    },
    moon: {
      import: "./js/moon.js",
      filename: "otherBundles/bundle_[name].js",
    },
    music: {
      import: "./js/music.js",
      filename: "otherBundles/bundle_[name].js",
    },
    register: {
      import: "./js/register.js",
      filename: "otherBundles/bundle_[name].js",
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