import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
import "./Component Styles/Register.css";

const Register = () => {
  const finalQuote = "It feels good to be lost in the right direction...";

  return (
    <div className="Register-Container">
      <div className="Register">
        <div className="Register-Head">
        <h1><Link className="Register-Head-Link" to="/">traveller</Link></h1>
        </div>
        <form>
          <div className="Register-Form-Element">
            <label>User Name</label>
            <input
              type="text"
              required="true"
              placeholder="Enter the User Name"
              name="user_name"
              autoComplete="false"
            />
          </div>

          <div className="Register-Form-Element">
            <label>Email</label>
            <input
              type="email"
              required="true"
              placeholder="Enter the Email"
              name="email"
              autoComplete="false"
            />
          </div>

          <div className="Register-Form-Element" id="Name-Element">
            <div className="Name-Input">
            <label>First Name</label>
            <input
              type="text"
              required="true"
              placeholder="Enter your First Name"
              name="first_name"
              autoComplete="false"
            />
            </div>
            
            <div className="Name-Input">
            <label>Last Name</label>
            <input
              type="text"
              required="true"
              placeholder="Enter your Last Name"
              name="last_name"
              autoComplete="false"
            />
            </div>
            
          </div>


          <div className="Register-Form-Element">
            <label>Password</label>
            <input
              type="password"
              required="true"
              placeholder="Enter the Password"
              name="password"
              autoComplete="false"
            />
          </div>

          <button className="Btn-Register" type="submit">
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
};

export default Register;
