var webpack = require('webpack');
var dotenv = require('dotenv').load();

module.exports = exports = require('./webpack.config');

exports.plugins[1] = new webpack.DefinePlugin({
  __API_URL__: JSON.stringify(process.env.LANDLINE_API_URL),
  __PROD__: false,
  __S3_BUCKET__: JSON.stringify('landline-dev')
});
exports.output = Object.create(exports.output);
exports.output.filename = exports.output.filename.replace(/\.js$/, ".dev.js");
exports.devtool = 'source-map'
