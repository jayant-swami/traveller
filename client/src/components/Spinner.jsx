import React from "react";
import { connect } from "react-redux";
import "./Component Styles/Spinner.css";

const Spinner = (props) => {
  if (props.toggle) {
    return (
      <div className="Spinner-Box">
        <div className="Spinner1"></div>
        <div className="Spinner2"></div>
        <div className="Spinner-Text">
            <h1>{props.text}</h1></div>
      </div>
    );
  } else {
    return null;
  }
};

const mapStoreToProps = store => {
  return {
    toggle: store.manageSpinnerReducer.toggle,
    text: store.manageSpinnerReducer.text
  };
};

export default connect(mapStoreToProps)(Spinner);
