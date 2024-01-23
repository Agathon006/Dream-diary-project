'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    mainPage: "./js/pages/home/",
    time: {
      import: "./js/pages/time/",
      filename: "otherBundles/bundle_[name].js",
    },
    moon: {
      import: "./js/pages/moon/",
      filename: "otherBundles/bundle_[name].js",
    },
    music: {
      import: "./js/pages/music/",
      filename: "otherBundles/bundle_[name].js",
    },
    register: {
      import: "./js/pages/register/",
      filename: "otherBundles/bundle_[name].js",
    },
    sign_in: {
      import: "./js/pages/sign_in/",
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