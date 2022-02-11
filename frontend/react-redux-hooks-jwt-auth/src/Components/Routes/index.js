import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Profile from "../Profile";
import Login from "../Login";
import Register from "../Register";

class index extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Routes>
      </Router>
    );
  }
}

export default index;
