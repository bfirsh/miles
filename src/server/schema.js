const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    todos: [Todo]!
    todo(id: ID!): Todo
  }

  type Todo {
    id: ID!
    text: String
    completed: Boolean!
  }

  type TodoUpdateResponse {
    success: Boolean!
    message: String
    todo: [Todo]
  }

  type Mutation {
    updateTodo(id: ID!, completed: Boolean!): TodoUpdateResponse
  }
`;

module.exports = typeDefs;
