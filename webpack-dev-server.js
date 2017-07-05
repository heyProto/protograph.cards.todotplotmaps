// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
// const express = require("express");

// const app = express();

// const PORT = 8080;
// const config = require("./webpack.config.js");
// config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

// const compiler = webpack(config);

// const server = new WebpackDevServer(compiler);

// app.get('*.js', function (req, res, next) {
//   console.log(req, res, next, "----dev")
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

// server.listen(PORT, '0.0.0.0', () => {
//     console.log(`Listening on ${PORT}`);
// });

const path = require("path");
const express = require("express");
const webpack = require("webpack");

const server = process.env.RJSF_DEV_SERVER || "localhost:8080";
const splitServer = server.split(":");
const host = splitServer[0];
const port = splitServer[1];
const env = "dev";

const webpackConfig = require("./webpack.config");
const compiler = webpack(webpackConfig);
const app = express();

app.use(require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("/favicon.ico", function(req, res) {
  res.status(204).end();
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.listen(port, host, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at ${port});
});