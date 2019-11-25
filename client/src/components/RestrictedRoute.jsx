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



const RestrictedRoute = ({component: Component, isAuthorized, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogin(isAuthorized) && true ?
                <Redirect to="/home" />
            : <Component {...props} />
        )} />
    );
};


const mapStoreToProps = store => {
    return {
      isAuthorized: store.manageUserReducer.authorization.token
    };
  };
  

export default connect(mapStoreToProps)(RestrictedRoute);