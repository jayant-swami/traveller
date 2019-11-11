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
    status: "",
    error: {
      user_name: "",
      password: ""
    }
  },

  authentication: {
    token: "",
    user: {
      user_name: "",
      email: "",
      first_name: "",
      last_name: "",
      added_on: ""
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
        error: {
          ...state.signup.error,
          user_name: action.payload.error.user_name,
          email: action.payload.error.email,
          first_name: action.payload.error.first_name,
          last_name: action.payload.error.last_name,
          password: action.payload.error.password
        },
        status: action.payload.status
      }
    };

    return newState;
  }

  if (action.type === "CLEAR_SIGNUP") {
    let newState = {
      ...state,
      signup: {
        ...state.signup,
        error: {
          ...state.signup.error,
          user_name: "",
          email: "",
          first_name: "",
          last_name: "",
          password: ""
        },
        status: ""
      }
    };

    return newState;
  }

 

  if (action.type === "LOGIN") {
    let newState = {
      ...state,
      login: {
        ...state.login,
        status: action.payload.status,
        error: {
          ...state.login.error,
          user_name: action.payload.error.user_name,
          password: action.payload.error.password
        },
        
        },
        authentication: {
          ...state.authentication,
          token: action.payload.token,
            user: {
              ...state.login.user,
              user_name: action.payload.user.user_name,
              email: action.payload.user.email,
              first_name: action.payload.user.first_name,
              last_name: action.payload.user.last_name,
              added_on: action.payload.user.added_on
          }
        }
      };


    return newState;
  }

  if (action.type === "CLEAR_LOGIN") {
    let newState = {
      ...state,
      login: {
        ...state.signup,
        error: {
          ...state.login.error,
          user_name: "",
          password: ""
        },
        status: ""
      }
    };

    return newState;
  } else {
    return state;
  }
};

export default manageUserReducer;
