const { DataSource } = require("apollo-datasource");

const STORE = [
  { id: "1", text: "Get milk", completed: false },
  { id: "2", text: "Feed cat", completed: false }
];

class TodoAPI extends DataSource {
  getAllTodos() {
    return STORE;
  }

  getTodoById(id) {
    return STORE.filter(obj => obj.id === id)[0];
  }

  updateTodo({ id, completed }) {
    const todo = STORE.filter(obj => obj.id === id)[0];
    if (!todo) return;
    todo.completed = completed;
    return todo;
  }
}

module.exports = TodoAPI;
