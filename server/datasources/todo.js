const { DataSource } = require("apollo-datasource");
const uuidv4 = require("uuid/v4");

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

  createTodo(attrs) {
    const todo = Object.assign(
      {
        id: uuidv4()
      },
      attrs
    );
    STORE.push(todo);
    return todo;
  }

  updateTodo({ id, completed }) {
    const todo = this.getTodoById(id);
    if (!todo) return;
    todo.completed = completed;
    return todo;
  }

  deleteTodo(id) {
    for (let i = STORE.length - 1; i >= 0; i--) {
      if (STORE[i].id === id) {
        STORE.splice(i, 1);
        break;
      }
    }
  }
}

module.exports = TodoAPI;
