const React = require("react");
const { Query } = require("react-apollo");
const { client } = require("../client");
const { allQuery } = require("./graphqlQuery");

function createQuery(model) {
  const resultKey = model.pluralLowerName();

  return function MilesQuery({ children }) {
    // TODO: assume all query
    const query = allQuery(model);
    return React.createElement(
      Query,
      { client: client, query: query, pollInterval: 500 },
      ({ loading, error, data }) => {
        let result = [];
        if (data && data[resultKey]) {
          result = data[resultKey].map(attrs => new model(attrs));
        }

        // Returns an object like { loading: false, error: false, result: [...], todos: [...]}
        // Both result and todos is returned so you have two options for what to name it
        return children({ loading, error, result, [resultKey]: result });
      }
    );
  };
}

module.exports = {
  createQuery: createQuery
};
