import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Provider} from "react-redux";
import Nav from "./components/Nav.jsx";
import Landing from "./components/Landing.jsx";
import People from "./components/People.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav></Nav>
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/people" component={People}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
