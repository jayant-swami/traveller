const initialState = {
  signup: {
    status: "",
    error: {
      user_name: "",
      email: "",
      password: "",
      first_name: "",
      last_name: ""
    }
  },

  login: {
    user: {
      user_name: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      token: "",
      is_authenticated: ""
    }
  }
};

const manageUserReducer = (state = initialState, action) => {
  if (action.type === "SIGNUP") {
    console.log("call from manageUserReducer ");
    console.log(action.payload);
    let newState = {
      ...state,
      signup: {
        ...state.signup,
        error: {...state.signup.error,
        user_name: action.payload.error.user_name,
        email: action.payload.error.email,
        first_name: action.payload.error.first_name,
        last_name: action.payload.error.last_name,
        password: action.payload.error.password},
        status: action.payload.status
      }
    }

    return newState;

  }

    if (action.type === "CLEAR_SIGNUP") {

      let newState = {
        ...state,
        signup: {
          ...state.signup,
          error: {...state.signup.error,
          user_name: "",
          email: "",
          first_name: "",
          last_name: "",
          password: ""},
          status: ""
        }
      };

    return newState;
  }

  if (action.type === "LOGIN") {
    return state;
  } else {
    return state;
  }
};

export default manageUserReducer;
