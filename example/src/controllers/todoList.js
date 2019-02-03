import React from "react";

import Todo from "../models/todo";
import TodoListView from "../views/todoList";

const TodoListController = () => (
  <div>
    <h1>Todos</h1>
    <Todo.Query>
      {({ loading, error, todos }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.toString()}</div>;

        return (
          <TodoListView todos={todos} toggleTodo={todo => todo.toggle()} />
        );
      }}
    </Todo.Query>
  </div>
);

export default TodoListController;
