import React, { Component } from "react";

import Todo from "../models/todo";
import TodoListView from "../views/todoList";

import { Query } from "react-apollo";

const MilesQuery = ({ query, children }) => (
  <Query query={query} pollInterval={500}>
    {({ loading, error, data }) => {
      if (data && data.todos) {
        data = data.todos.map(attrs => new Todo(attrs));
      }
      return children({ loading, error, data });
    }}
  </Query>
);

const TodoListController = () => (
  <div>
    <h1>Todos</h1>
    <MilesQuery query={Todo.all()}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.toString()}</div>;

        return <TodoListView todos={data} toggleTodo={todo => todo.toggle()} />;
      }}
    </MilesQuery>
  </div>
);

export default TodoListController;
