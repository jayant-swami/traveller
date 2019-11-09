import React, {useState} from "react";
import Footer from "./Footer.jsx";
import "./Component Styles/Landing.css";
import {Redirect} from "react-router-dom";

const Landing = () => {
  const finalText = [
    { logo: "\u260C", text: "Join discussions" },
    { logo: "\u260B", text: "Connect with travellers" },
    { logo: "\u260D", text: "Find mates to travel with" }
  ];

const initialRedirect= {
  logIn: false,
  signUp: false
}  

const [redirect, setRedirect]=useState(initialRedirect);


if(redirect.logIn) {
  return(<Redirect to="/login"></Redirect>)
}
else if(redirect.signUp){
  return(<Redirect to="/register"></Redirect>)
}
else{
  return (
    <div className="Landing-Container">
      <div className="Landing">
        <div className="Landing-Head">
          <h1>traveller</h1>
        </div>
        <h2>Explore places and meet new people everyday.</h2>
        <h3>Join traveller today</h3>
        <div className="Landing-Btn-Box">
          
          <button className="Btn-Landing-Login" onClick={()=> setRedirect({...redirect,logIn:true})}>
            Log in
          </button>
        </div>
        <div className="Landing-Btn-Box">
          <button className="Btn-Landing-Signup" onClick={()=> setRedirect({...redirect,signUp:true})}>
            Sign Up
          </button>
        </div>
      </div>

      <div className="Landing-Bg"></div>
      <div className="Landing-Text">
        {finalText.map(text => (
          <div className="Landing-Text-Element">
            <span className="Landing-Text-Logo">{text.logo}</span>
            <span className="Landing-Text-Value">{text.text}</span>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  )

}

};

export default Landing;
