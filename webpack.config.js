var path = require('path');
var webpack = require('webpack');

// module.exports = {
//   entry: './client/index.js',
//   output: { path: __dirname + '/public/javascripts', filename: 'bundle.js' },
//   module: {
//     loaders: [
//       {
//         test: /.js?$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         query: {
//           presets: ['es2015', 'react', 'stage-0']
//         }
//       }
//     ]
//   },
// };

var path = require("path");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        bundle: './client/index.js',
        player: './player/index.js',
    },
    output: {
        path: path.join(__dirname, "public/javascripts"),
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
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
    plugins: [
        new CommonsChunkPlugin({
            filename: "commons.js",
            name: "commons"
        })
    ]
}
