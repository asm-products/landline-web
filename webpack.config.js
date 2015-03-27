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
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify('https://api.landline.io'),
      __PROD__: true,
      __S3_BUCKET__: JSON.stringify('landline')
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ['babel', 'jsx?harmony'], exclude: /node_modules/ },
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  }
};
