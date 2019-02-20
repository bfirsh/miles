const ApolloClient = require("apollo-boost").default;

let client;

if (process.browser) {
  client = new ApolloClient({
    uri: "/_graphql"
  });
}

module.exports = {
  client: client
};
