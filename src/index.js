'use strict';

if (process.env.NODE_ENV === 'development') {
  let webpack = require('webpack');
  let WebpackDevServer = require('webpack-dev-server');
  let config = require('../webpack.config');
  let path = require('path');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
  }).listen(8080, 'localhost', function(err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:8080');
  });
}
