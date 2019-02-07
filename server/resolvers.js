module.exports = {
  Query: {
    todos: (_, __, { dataSources }) => dataSources.todoAPI.getAllTodos(),
    todo: (_, { id }, { dataSources }) => dataSources.todoAPI.getTodoById(id)
  },
  Mutation: {
    createTodo: (_, attrs, { dataSources }) => {
      const todo = dataSources.todoAPI.createTodo(attrs);

      if (!todo) {
        return {
          success: false,
          message: "failed to create todo"
        };
      }

      return {
        success: true,
        message: "todo created",
        todo: todo
      };
    },
    updateTodo: (_, { id, completed }, { dataSources }) => {
      const todo = dataSources.todoAPI.updateTodo({ id, completed });

      if (!todo) {
        return {
          success: false,
          message: "failed to update todo"
        };
      }

      return {
        success: true,
        message: "todo updated",
        todo: todo
      };
    },
    deleteTodo: (_, { id }, { dataSources }) => {
      dataSources.todoAPI.deleteTodo(id);
      return {
        success: true,
        message: "todo deleted"
      };
    }
  }
};
