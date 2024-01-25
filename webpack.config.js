'use strict';

const webpack = require('webpack');

let path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    mainPage: "./js/pages/home/",
    registered_home: {
      import: "./js/pages/registered_home/",
      filename: "otherBundles/bundle_[name].js",
    },
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
  },
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
    },
    alias: {
        process: "process/browser",
    },
  },
  plugins: [
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }),
  ],
};