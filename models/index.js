const { client } = require("../client");
const {
  createMutation,
  updateMutation,
  deleteMutation
} = require("./graphqlQuery");
const graphql = require("graphql");

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

  delete() {
    return client.mutate({
      mutation: deleteMutation(this.constructor),
      variables: { id: this.id }
    });
  }

  static defaults() {
    const defaults = {};
    for (let key in this.fields) {
      if (this.fields[key].default !== undefined) {
        defaults[key] = this.fields[key].default;
      }
    }
    return defaults;
  }

  static create(attrs) {
    const ModelSubclass = this;
    const attrsWithDefaults = Object.assign(ModelSubclass.defaults(), attrs);

    return client
      .mutate({
        mutation: createMutation(ModelSubclass),
        variables: attrsWithDefaults
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

class IDField {
  constructor() {
    this.graphqlType = graphql.GraphQLID;
  }
}

class StringField {
  constructor(opts = {}) {
    this.default = opts.default;
    this.graphqlType = graphql.GraphQLString;
  }
}

class BooleanField {
  constructor(opts = {}) {
    this.default = opts.default;
    this.graphqlType = graphql.GraphQLBoolean;
  }
}

module.exports = {
  Model: Model,
  IDField: IDField,
  StringField: StringField,
  BooleanField: BooleanField
};
