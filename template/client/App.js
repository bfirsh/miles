import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import HomeController from "./controllers/home";

const App = () => (
  <Router>
    <Route exact path="/" component={HomeController} />
  </Router>
);

export default App;
