const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  // entry: {
  //   app: [ './main.js' ]
  // },
  entry: './main.js',
  // output: {
  //   path: __dirname,
  //   publicPath: '/',
  //   filename: 'bundle.js',
  // },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({ 
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  // devServer: {
  //   disableHostCheck: true
  // },
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


