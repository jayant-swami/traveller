const spinnerActions = {
  spinnerToggleAction: toggle => dispatch => {
    dispatch({ type: "TOGGLE_SPINNER", payload: toggle });
  },

  changeSpinnerTextAction: text => dispatch => {
    dispatch({ type: "CHANGE_SPINNER_TEXT", payload: text });
  }
};

export default spinnerActions;
