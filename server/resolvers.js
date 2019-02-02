module.exports = {
  Query: {
    todos: (_, __, { dataSources }) => dataSources.todoAPI.getAllTodos(),
    todo: (_, { id }, { dataSources }) => dataSources.todoAPI.getTodoById(id)
  },
  Mutation: {
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
    }
  }
};
