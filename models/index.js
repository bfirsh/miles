const { client } = require("../client");
const { createMutation, updateMutation } = require("./graphqlQuery");

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
    return client.mutate({
      mutation: updateMutation(this.constructor),
      variables: Object.assign(
        {
          id: this.id
        },
        newAttrs
      )
    });
  }

  static create(attrs) {
    const ModelSubclass = this;
    return client
      .mutate({
        mutation: createMutation(ModelSubclass),
        variables: attrs
      })
      .then(({ data }) => {
        return new ModelSubclass(data);
      });
  }

  /*
   * Returns things like `todo`
   */
  static lowerName() {
    return this.name.toLowerCase();
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
