import React, { Component } from "react";

const TodoView = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}
  </li>
);

const TodoListView = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map(todo => (
      <TodoView key={todo.id} {...todo} onClick={() => toggleTodo(todo)} />
    ))}
  </ul>
);

export default TodoListView;
