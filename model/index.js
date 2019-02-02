const gql = require("graphql-tag");
const { client } = require("../client");

const UpdateTodoMutation = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      success
      message
    }
  }
`;

class Model {
  constructor(attrs) {
    for (let key in attrs) {
      this[key] = attrs[key];
    }
  }

  static all() {
    return gql`
      {
        todos {
          id
          text
          completed
        }
      }
    `;
  }

  static get(id) {
    const todo = new this();
    todo["id"] = id;
    return todo;
  }

  update(newAttrs) {
    for (let key in newAttrs) {
      this[key] = newAttrs[key];
    }
    client.mutate({
      mutation: UpdateTodoMutation,
      variables: {
        id: this.id,
        completed: newAttrs.completed
      }
    });
  }
}

module.exports = {
  Model: Model
};
