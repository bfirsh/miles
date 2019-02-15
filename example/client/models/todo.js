import { Model } from "miles/models";
import { createQuery } from "miles/models/query";

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
Todo.Query = createQuery(Todo);

export default Todo;
