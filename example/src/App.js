import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import TodoListController from "./controllers/todoList";

import { ApolloProvider } from "react-apollo";

import client from "./client";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Route exact path="/" component={TodoListController} />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
