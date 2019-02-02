const { ApolloServer } = require("apollo-server");
const TodoAPI = require("./datasources/todo");
const resolvers = require("./resolvers");

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
      typeDefs: this.models[0].typeDefs,
      resolvers: resolvers,
      dataSources: () => ({ todoAPI: todoAPI })
    });

    return server.listen();
  }
}

module.exports = {
  MilesServer: MilesServer
};
