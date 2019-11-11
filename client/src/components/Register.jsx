import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "./Footer.jsx";
import "./Component Styles/Register.css";
import manageUserActions from "../store/actions/manageUserActions";
import Spinner from "./Spinner.jsx";

const Register = props => {
  const finalQuote = "It feels good to be lost in the right direction...";

  console.log("Component Rendered");

  const [newUser, setUser] = useState({
    user_name: "",
    email: "",
    first_name: "",
    last_name: "",
    password: ""
  });
  const handleFormInput = e => {
    setUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSignUp = event => {
    console.log("Call from handleSignUp");
    event.preventDefault();
    if (
      newUser.user_name &&
      newUser.email &&
      newUser.first_name &&
      newUser.last_name &&
      newUser.password
    ) {
      props.signupUserAction(newUser);
    }
  };

  useEffect(()=> {
    return props.clearSignup;
  },[props.clearSignup])

  if (props.status === "SUCCESS") {
    return <Redirect to="/login"></Redirect>;
  } else {
    return (
      <div className="Register-Container">
        <Spinner></Spinner>
        <div className="Register">
          <div className="Register-Head">
            <h1>
              <Link className="Register-Head-Link" to="/">
                traveller
              </Link>
            </h1>
          </div>
          <form>
            <div className="Register-Form-Element">
              <label>
                User Name
                <span className="Register-Alert">{props.error.user_name}</span>
              </label>

              <input
                type="text"
                required={true}
                placeholder="Enter the User Name"
                name="user_name"
                autoComplete="false"
                value={newUser.user_name}
                onChange={handleFormInput}
              />
            </div>

            <div className="Register-Form-Element">
              <label>
                Email<span className="Register-Alert">{props.error.email}</span>
              </label>
              <input
                type="email"
                required={true}
                placeholder="Enter the Email"
                name="email"
                autoComplete="false"
                value={newUser.email}
                onChange={handleFormInput}
              />
            </div>

            <div className="Register-Form-Element" id="Name-Element">
              <div className="Name-Input">
                <label>
                  First Name
                  <span className="Register-Alert">
                    {props.error.first_name}
                  </span>
                </label>
                <input
                  type="text"
                  required={true}
                  placeholder="Enter your First Name"
                  name="first_name"
                  autoComplete="false"
                  value={newUser.first_name}
                  onChange={handleFormInput}
                />
              </div>

              <div className="Name-Input">
                <label>
                  Last Name
                  <span className="Register-Alert">
                    {props.error.last_name}
                  </span>
                </label>
                <input
                  type="text"
                  required={true}
                  placeholder="Enter your Last Name"
                  name="last_name"
                  autoComplete="false"
                  value={newUser.last_name}
                  onChange={handleFormInput}
                />
              </div>
            </div>

            <div className="Register-Form-Element">
              <label>
                Password
                <span className="Register-Alert">{props.error.password}</span>
              </label>
              <input
                type="password"
                required={true}
                placeholder="Enter the Password"
                name="password"
                autoComplete="false"
                value={newUser.password}
                onChange={handleFormInput}
              />
            </div>

            <button
              className="Btn-Register"
              type="submit"
              onClick={handleSignUp}
              disabled={
                !(
                  newUser.user_name &&
                  newUser.email &&
                  newUser.first_name &&
                  newUser.last_name &&
                  newUser.password
                )
              }
            >
              Sign up
            </button>
          </form>

          <div className="Register-Footer">
            <span>Already have an account?</span>
            <Link className="Register-Footer-Link" to="/login">
              Log in
            </Link>
          </div>
        </div>

        <div className="Register-Bg"></div>
        <div className="Register-Quote">
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
    status: store.manageUserReducer.signup.status,
    error: store.manageUserReducer.signup.error
  };
};

export default connect(
  mapStoreToProps,
  manageUserActions
)(Register);
