import {
  Model,
  IDField,
  StringField,
  BooleanField
} from "miles-prototype/models";
import { createQuery } from "miles-prototype/models/query";

class Todo extends Model {
  static fields = {
    id: new IDField(),
    text: new StringField(),
    completed: new BooleanField()
  };

  toggle() {
    this.update({ completed: !this.completed });
  }
}
Todo.Query = createQuery(Todo);

export default Todo;
