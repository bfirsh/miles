import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import HomeController from "./controllers/home";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={HomeController} />
      </Router>
    );
  }
}

export default App;
