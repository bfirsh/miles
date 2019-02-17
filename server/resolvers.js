const Database = require("./database");

const database = new Database();

/*
 * Creates queries like `todo` and `todos`.
 */
function createQuery(model) {
  return {
    [model.pluralLowerName()]: () => database.getAll(model.name),
    [model.lowerName()]: (_, { id }) => database.getByID(model.name, id)
  };
}

/*
 * Creates mutations like `createTodo`, `updateTodo`, and `deleteTodo`.
 */
function createMutation(model) {
  return {
    [`create${model.name}`]: (_, attrs) => {
      const obj = database.create(model.name, attrs);
      return {
        success: true,
        [model.lowerName()]: obj
      };
    },
    [`update${model.name}`]: (_, { id, ...attrs }) => {
      const obj = database.update(model.name, id, attrs);
      if (!obj) {
        return { success: false, message: "object not found" };
      }
      return {
        success: true,
        [model.lowerName()]: obj
      };
    },
    [`delete${model.name}`]: (_, { id }) => {
      database.delete(model.name, id);
      return { success: true };
    }
  };
}

module.exports = models => {
  const resolvers = {
    Query: {},
    Mutation: {}
  };

  for (let model of models) {
    database.createTable(model.name);
    resolvers.Query = Object.assign(resolvers.Query, createQuery(model));
    resolvers.Mutation = Object.assign(
      resolvers.Mutation,
      createMutation(model)
    );
  }

  return resolvers;
};
