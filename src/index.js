if (process.env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var config = require('../webpack.config');
  var path = require('path');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
  }).listen(8080, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:8080');
  });
}
