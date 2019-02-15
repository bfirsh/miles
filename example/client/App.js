import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import TodoListController from "./controllers/todoList";

const App = () => (
  <Router>
    <Route exact path="/" component={TodoListController} />
  </Router>
);

export default App;
