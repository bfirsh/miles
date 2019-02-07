import React from "react";

const TodoView = ({ onClick, onDelete, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text} <span onClick={onDelete}>🗑</span>
  </li>
);

const TodoListView = ({ todos, toggleTodo, deleteTodo }) => (
  <ul>
    {todos.map(todo => (
      <TodoView
        key={todo.id}
        {...todo}
        onClick={() => toggleTodo(todo)}
        onDelete={() => deleteTodo(todo)}
      />
    ))}
  </ul>
);

export default TodoListView;
