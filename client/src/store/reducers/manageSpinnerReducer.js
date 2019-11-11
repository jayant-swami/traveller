const initialState = {
  toggle: false,
  text: ""
};

const manageSpinnerReducer = (state = initialState, action) => {
  if (action.type === "TOGGLE_SPINNER") {
    let newState = { ...state, toggle: action.payload };
    return newState;
  }
  else if (action.type === "CHANGE_SPINNER_TEXT") {
    let newState = { ...state, text: action.payload };
    return newState;
  }
  else {
    return state
  }
};

export default manageSpinnerReducer;
