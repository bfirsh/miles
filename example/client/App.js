import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import TodoListController from "./controllers/todoList";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={TodoListController} />
      </Router>
    );
  }
}

export default App;
