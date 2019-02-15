const ApolloClient = require("apollo-boost").default;

let client;

if (process.browser) {
  client = new ApolloClient({
    uri: "/graphql"
  });
}

module.exports = {
  client: client
};
