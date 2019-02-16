import models from "miles-prototype/models";
import { createQuery } from "miles-prototype/models/query";

class Todo extends models.Model {
  static fields = {
    id: new models.IDField(),
    text: new models.StringField(),
    completed: new models.BooleanField({ default: false })
  };

  toggle() {
    this.update({ completed: !this.completed });
  }
}
Todo.Query = createQuery(Todo);

export default Todo;
