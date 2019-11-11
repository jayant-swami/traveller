import React, { useState, useEffect } from "react";
import "./Component Styles/Login.css";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";

const Login = () => {
  const finalQuote = "I don't know where I'm going, but I'm on my way...";


  return (
    <div className="Login-Container">
      <div className="Login">
        <div className="Login-Head">
          <h1><Link className="Login-Head-Link" to="/">traveller</Link></h1>
        </div>
        <form>
          <div className="Login-Form-Element">
            <label>User Name</label>
            <input
              type="text"
              required={true}
              placeholder="Enter the User Name"
              name="user_name"
              autoComplete="false"
            />
          </div>

          <div className="Login-Form-Element">
            <label>Password</label>
            <input
              type="password"
              required={true}
              placeholder="Enter the Password"
              name="password"
              autoComplete="false"
            />
          </div>

          <button className="Btn-Login" type="submit">
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
};

export default Login;
