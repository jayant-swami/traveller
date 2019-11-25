import React from 'react';
import {connect} from "react-redux";
import manageUserActions from "../store/actions/manageUserActions"

const Logout = (props) => {

const handleLogout =() => {
    props.logoutUserAction();
}

    return ( 
    <div className="Logout">
        <button className="Logout-Button" onClick={handleLogout}>Logout</button>
    </div> );
}
 
// const mapStoreToProps= (store) => {
//     return{

//     }
// }

export default connect(null,manageUserActions)(Logout);