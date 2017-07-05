const webpack = require('webpack');

module.exports = {
  entry: {
    app: [ './main.js' ]
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'card.min.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  devServer: {
    disableHostCheck: true
  },
  node: {
    net: 'empty',
    tls: 'empty',
    fs: 'empty'
  },
  // externals: {
  //   'axios': 'axios',
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  //   './src/js/react-jsonschema-form': 'JSONSchemaForm'
  // },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:
        {
          presets:['react']
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
