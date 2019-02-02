const ApolloClient = require("apollo-boost").default;

let client;

if (process.browser) {
  client = new ApolloClient({
    uri: "http://localhost:4000"
  });
}

module.exports = {
  client: client
};
