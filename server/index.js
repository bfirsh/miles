const { ApolloServer } = require("apollo-server");
const TodoAPI = require("./datasources/todo");
const resolvers = require("./resolvers");
const { generateSchema } = require("../models/schema");

const todoAPI = new TodoAPI();

class MilesServer {
  constructor() {
    this.models = [];
  }

  registerModel(model) {
    this.models.push(model);
  }

  listen() {
    const server = new ApolloServer({
      typeDefs: generateSchema(this.models),
      resolvers: resolvers,
      dataSources: () => ({ todoAPI: todoAPI })
    });

    return server.listen();
  }
}

module.exports = {
  MilesServer: MilesServer
};
