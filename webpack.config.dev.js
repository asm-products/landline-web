var webpack = require('webpack');

module.exports = exports = Object.create(require('./webpack.config'));
exports.plugins[1] = new webpack.DefinePlugin({
  __API_URL__: JSON.stringify('https://landline-dev.herokuapp.com'),
  __PROD__: false,
  __S3_BUCKET__: JSON.stringify('landline-dev')
});
exports.output = Object.create(exports.output);
exports.output.filename = exports.output.filename.replace(/\.js$/, ".dev.js");
