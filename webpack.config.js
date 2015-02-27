var config = require('./config');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/app.jsx'
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'landline.js',
    library: 'Landline',
    target: 'umd'
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      FIREBASE_URL: JSON.stringify(config.FIREBASE_URL),
      __PROD__: true
    })
  ],

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['babel', 'jsx?harmony'], exclude: /node_modules/ },
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
};
