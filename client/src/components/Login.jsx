import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Component Styles/Login.css";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer.jsx";
import manageUserActions from "../store/actions/manageUserActions";
import Spinner from "./Spinner";

const Login = props => {
  const finalQuote = "I don't know where I'm going, but I'm on my way...";

  const [loginUser, setUser] = useState({
    user_name: "",
    password: ""
  });

  const handleFormInput = e => {
    setUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const handleLogin = event => {
    event.preventDefault();
    if (loginUser.user_name && loginUser.password) {
      props.loginUserAction(loginUser);
    }
  };

  useEffect(() => {
    return props.clearLogin;
  }, [props.clearLogin]);

  if (props.status === "SUCCESS") {
    return <Redirect to="/home"></Redirect>;
  } else {
    return (
      <div className="Login-Container">
        <Spinner></Spinner>
        <div className="Login">
          <div className="Login-Head">
            <h1>
              <Link className="Login-Head-Link" to="/">
                traveller
              </Link>
            </h1>
          </div>
          <form>
            <div className="Login-Form-Element">
              <label>
                User Name
                <span className="Login-Alert">{props.error.user_name}</span>
              </label>
              <input
                type="text"
                required={true}
                placeholder="Enter the User Name"
                name="user_name"
                autoComplete="false"
                value={loginUser.user_name}
                onChange={handleFormInput}
              />
            </div>

            <div className="Login-Form-Element">
              <label>
                Password
                <span className="Login-Alert">{props.error.password}</span>
              </label>
              <input
                type="password"
                required={true}
                placeholder="Enter the Password"
                name="password"
                autoComplete="false"
                value={loginUser.password}
                onChange={handleFormInput}
              />
            </div>

            <button
              className="Btn-Login"
              type="submit"
              onClick={handleLogin}
              disabled={!(loginUser.user_name && loginUser.password)}
            >
              Log in
            </button>
          </form>

          <div className="Login-Footer">
            <span>Need an account?</span>
            <Link className="Login-Footer-Link" to="/register">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="Login-Bg"></div>
        <div className="Login-Quote">
          <span>{finalQuote}</span>
        </div>
        <Footer></Footer>
      </div>
    );
  }
};

const mapStoreToProps = store => {
  console.log("Call from mapStoreToProps");
  console.log(store.manageUserReducer);
  return {
    status: store.manageUserReducer.login.status,
    token: store.manageUserReducer.login.token,
    user: store.manageUserReducer.login.user,
    error: store.manageUserReducer.login.error
  };
};

export default connect(
  mapStoreToProps,
  manageUserActions
)(Login);
