import React, { useState } from "react";
import { Link } from "react-router-dom";
import ".././Component Styles/Home/Nav.css";

const Nav = () => {
  const initialNavList = [
    { id: "Home", name: "\u27F0", route: "/home" },
    { id: "People", name: "\u29DD", route: "/people" },
    { id: "Profile", name: "\u267E", route: "/profile" }
  ];

  const [navList] = useState(initialNavList);

  return (
    <div className="Nav">
      <div className="NavItemBox">
        {navList.map(navItemVal => (
          <div key={navItemVal.id} className="NavItem">
            <Link to={navItemVal.route} className="NavItemLink" title={navItemVal.id}>
              {navItemVal.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nav;
