import { Model } from "miles";
import gql from "graphql-tag";

class Todo extends Model {
  props = {
    text: "string",
    completed: "boolean"
  };

  toggle() {
    this.update({ completed: !this.completed });
  }
}

Todo.typeDefs = gql`
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

export default Todo;
