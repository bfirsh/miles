const React = require("react");
const { Query } = require("react-apollo");
const { allQuery } = require("./graphqlQuery");

function createQuery(model) {
  return function MilesQuery({ children }) {
    // TODO: assume all query
    const query = allQuery(model);
    return React.createElement(
      Query,
      { query: query, pollInterval: 500 },
      ({ loading, error, data }) => {
        let todos = [];
        if (data && data.todos) {
          todos = data.todos.map(attrs => new model(attrs));
        }
        return children({ loading, error, todos });
      }
    );
  };
}

module.exports = {
  createQuery: createQuery
};
