const { client } = require("../client");
const { allQuery, updateMutation } = require("./query");

class Model {
  constructor(attrs) {
    for (let key in attrs) {
      this[key] = attrs[key];
    }
  }

  static all() {
    return allQuery(this);
  }

  static get(id) {
    const obj = new this();
    obj["id"] = id;
    return obj;
  }

  update(newAttrs) {
    for (let key in newAttrs) {
      this[key] = newAttrs[key];
    }
    client.mutate({
      mutation: updateMutation(this.constructor),
      variables: Object.assign(
        {
          id: this.id
        },
        newAttrs
      )
    });
  }
}

module.exports = {
  Model: Model
};
