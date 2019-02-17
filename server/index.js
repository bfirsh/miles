const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const { generateSchema } = require("../models/schema");
const createResolvers = require("./resolvers");
const webpackConfig = require("./webpack.config");

// HACK
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

class MilesServer {
  constructor(opts) {
    this.entry = opts.entry;
    this.public = opts.public;
    this.models = [];
  }

  registerModel(model) {
    this.models.push(model);
  }

  createApolloServer() {
    return new ApolloServer({
      typeDefs: generateSchema(this.models),
      resolvers: createResolvers(this.models)
    });
  }

  createServer() {
    const app = express();
    const compiler = webpack(webpackConfig(this.entry, this.public));

    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: "/"
      })
    );
    app.use(webpackHotMiddleware(compiler));

    if (this.models.length) {
      const apolloServer = this.createApolloServer();
      apolloServer.applyMiddleware({ app });
    }

    return app;
  }

  listen(options, cb) {
    return this.createServer().listen(options, cb);
  }
}

module.exports = {
  MilesServer: MilesServer
};
