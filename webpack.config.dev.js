var webpack = require('webpack');

module.exports = exports = Object.create(require('./webpack.config'));
exports.entry.unshift('webpack/hot/dev-server');
exports.module.loaders[0].loaders = ['babel', 'react-hot', 'jsx?harmony'];
exports.output = Object.create(exports.output);
exports.output.filename = exports.output.filename.replace(/\.js$/, ".dev.js");

console.log(exports);
