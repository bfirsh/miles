import Model from "./model";

class Todo extends Model {
  toggle() {
    this.update({ completed: !this.completed });
  }
}

export default Todo;
