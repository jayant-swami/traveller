import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Component Styles/Nav.css";

const Nav = () => {
  const initialNavList = [
    { id: "people", name: "People", route: "/people" },
    { id: "register", name: "Register", route: "/register" },
    { id: "login", name: "Login", route: "/login" }
  ];

  const [navList] = useState(initialNavList);

  return (
null
  )
};

export default Nav;
