const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const express = require("express");

const app = express();

const PORT = 8080;
const config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

const compiler = webpack(config);

const server = new WebpackDevServer(compiler);

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on ${PORT}`);
});