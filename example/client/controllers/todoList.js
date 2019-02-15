import React from "react";

import Todo from "../models/todo";
import TodoCreateView from "../views/todoCreate";
import TodoListView from "../views/todoList";

const TodoListController = () => (
  <div>
    <h1>Todos</h1>
    <Todo.Query>
      {({ loading, error, todos }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.toString()}</div>;

        return (
          <React.Fragment>
            <TodoCreateView
              createTodo={text => Todo.create({ text: text, completed: false })}
            />
            <TodoListView
              todos={todos}
              toggleTodo={todo => todo.toggle()}
              deleteTodo={todo => todo.delete()}
            />
          </React.Fragment>
        );
      }}
    </Todo.Query>
  </div>
);

export default TodoListController;
