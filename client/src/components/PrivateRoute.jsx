import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const isLogin= (isAuthorized) => {
    if(isAuthorized){
        return true
    }
    else{
        return false
    }
}

const PrivateRoute = ({component: Component,isAuthorized, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin(isAuthorized) ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

const mapStoreToProps = store => {
  return {
    isAuthorized: store.manageUserReducer.authorization.token
  };
};

export default connect(mapStoreToProps)(PrivateRoute);
