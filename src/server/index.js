const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const TodoAPI = require("./datasources/todo");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ todoAPI: new TodoAPI() })
});

server.listen().then(({ url }) => {
  console.log(`🎺 Server ready at ${url}`);
});
