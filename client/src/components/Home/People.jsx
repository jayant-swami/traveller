import React from 'react';
import {connect} from "react-redux";
import "../Component Styles/Home/People.css";
import Nav from "./Nav.jsx"

const People = (props) => {

return ( <div className="People"><h1 className="quote">The future's so bright...</h1>
    <h1 className="message">Hi {props.user.first_name} the People page is still under construction. Check back soon.</h1>
    <div className="div"></div>
    <Nav></Nav>
</div> );
}


const mapStoreToProps = store => {
    return {
      user: store.manageUserReducer.authorization.user
    };
  };
 
export default connect(mapStoreToProps)(People);