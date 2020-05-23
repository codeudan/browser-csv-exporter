const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'browser-csv-exporter.min.js',
    libraryTarget: 'umd',
    library: 'CSVExporter',
    libraryExport: "default"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },

  mode: 'production'
};
