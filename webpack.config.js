var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/dev-server',
    './src/js/app.jsx'
  ],

  output: {
    path: __dirname + '/dist/js',
    filename: 'app.js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['babel', 'react-hot', 'jsx?harmony'], exclude: /node_modules/ },
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }
    ]
  }
};
