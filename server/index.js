const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const TodoAPI = require("./datasources/todo");
const { generateSchema } = require("../models/schema");
const resolvers = require("./resolvers");
const webpackConfig = require("./webpack.config");

const todoAPI = new TodoAPI();

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
      resolvers: resolvers,
      dataSources: () => ({ todoAPI: todoAPI })
    });
  }

  createServer() {
    const app = express();
    const compiler = webpack(webpackConfig(this.entry, this.public));
    const apolloServer = this.createApolloServer();

    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: "/"
      })
    );
    app.use(webpackHotMiddleware(compiler));

    apolloServer.applyMiddleware({ app });

    return app;
  }

  listen(options, cb) {
    return this.createServer().listen(options, cb);
  }
}

module.exports = {
  MilesServer: MilesServer
};
