import { Model } from "miles/models";

class Todo extends Model {
  static fields = {
    id: "id",
    text: "string",
    completed: "boolean"
  };

  toggle() {
    this.update({ completed: !this.completed });
  }
}

export default Todo;
