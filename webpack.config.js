var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/main.js',
  output: { path: __dirname + '/public/javascripts', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
};
