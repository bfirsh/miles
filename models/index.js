const { client } = require("../client");
const { allQuery, updateMutation } = require("./graphqlQuery");

class Model {
  constructor(attrs) {
    for (let key in attrs) {
      this[key] = attrs[key];
    }
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

  /*
   * Returns things like `Todos`
   */
  static pluralName() {
    return `${this.name}s`;
  }

  /*
   * Returns things like `todos`
   */
  static pluralLowerName() {
    return `${this.name.toLowerCase()}s`;
  }
}

module.exports = {
  Model: Model
};
