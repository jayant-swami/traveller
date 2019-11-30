import React from 'react';
import {connect} from "react-redux";
import "../Component Styles/Home/Profile.css";
import Nav from "./Nav.jsx"

const Profile = (props) => {

return ( <div className="Profile"><h1 className="quote">The future's so bright...</h1>
    <h1 className="message">Hi {props.user.first_name} the Profile page is still under construction. Check back soon.</h1>
    <div className="div"></div>
    <Nav></Nav>
</div> );
}


const mapStoreToProps = store => {
    return {
      user: store.manageUserReducer.authorization.user
    };
  };
 
export default connect(mapStoreToProps)(Profile);