import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home/Home.jsx";
import NotFound from "./components/NotFound";
import setAuthHeader from "./utils/setAuthHeader";
import { Provider } from "react-redux";
import store from "./store/store";
import manageUserActions from "./store/actions/manageUserActions";
import PrivateRoute from "./components/PrivateRoute.jsx";
import RestrictedRoute from "./components/RestrictedRoute.jsx"
import People from "./components/Home/People.jsx";
import Profile from "./components/Home/Profile.jsx";


setAuthHeader(localStorage.getItem("token"));


const App = () => {

  useEffect(() => {
    store.dispatch(manageUserActions.authUserAction());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <RestrictedRoute exact path="/" component={Landing}></RestrictedRoute>
            <RestrictedRoute exact path="/register" component={Register}></RestrictedRoute>
            <RestrictedRoute exact path="/login" component={Login}></RestrictedRoute>
            <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
            <PrivateRoute exact path="/people" component={People}></PrivateRoute>
            <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
