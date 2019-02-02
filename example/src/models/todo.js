import { Model } from "miles/models";

class Todo extends Model {
  static fields = {
    id: "ID",
    text: "String",
    completed: "Boolean"
  };

  toggle() {
    this.update({ completed: !this.completed });
  }
}

export default Todo;
