import axios from "axios";

const manageUserActions = {
  signupUserAction: user => async dispatch => {
    const timeout = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    dispatch({ type: "TOGGLE_SPINNER", payload: true });
    dispatch({ type: "CHANGE_SPINNER_TEXT", payload: "Registering User..." });

    await timeout(1500);
    const header = {
      "Content-Type": "application/json"
    };

    try {
      let res = await axios.post("/api/users/register", user, header);
      console.log("Call from manageUserActions");
      console.log(res);

      if (res.data.status === "SUCCESS") {
        dispatch({
          type: "CHANGE_SPINNER_TEXT",
          payload: "Success. Redirecting to Login..."
        });
        await timeout(1500);
        dispatch({ type: "TOGGLE_SPINNER", payload: false });
        dispatch({ type: "SIGNUP", payload: res.data });
        await timeout(1500);
        dispatch({ type: "CLEAR_SIGNUP" });
      } else {
        dispatch({
          type: "CHANGE_SPINNER_TEXT",
          payload: "User registration failed"
        });
        await timeout(1500);
        dispatch({ type: "TOGGLE_SPINNER", payload: false });
        dispatch({ type: "SIGNUP", payload: res.data });
      }
    } catch (err) {
      console.log("Error in manageUserActions");
      console.log(err);
    }
  },
// ---------------------------------------------------------------------------

  loginUserAction: user => async dispatch => {
    const timeout = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    dispatch({ type: "TOGGLE_SPINNER", payload: true });
    dispatch({ type: "CHANGE_SPINNER_TEXT", payload: "Logging in..." });

    await timeout(1500);
    const header = {
      "Content-Type": "application/json"
    };

    try {
      let res = await axios.post("/api/users/login", user, header);
      console.log("Call from manageUserActions");
      console.log(res);

      if (res.data.status === "SUCCESS") {
        dispatch({
          type: "CHANGE_SPINNER_TEXT",
          payload: "Success. Redirecting to Home..."
        })

        await timeout(1500);
        dispatch({ type: "TOGGLE_SPINNER", payload: false });
        dispatch({ type: "LOGIN", payload: res.data });

        localStorage.setItem('token',res.data.token);
      } else {
        dispatch({
          type: "CHANGE_SPINNER_TEXT",
          payload: "Login failed"
        })
        await timeout(1500);
        dispatch({ type: "TOGGLE_SPINNER", payload: false });
        dispatch({ type: "LOGIN", payload: res.data });
      }
    } catch (err) {
      console.log("Error in manageUserActions");
      console.log(err);
    }
  },

// ----------------------------------------------------------------------------
clearSignup: () => dispatch => {
  dispatch({type:"CLEAR_SIGNUP"})
},

// ----------------------------------------------------------------------------
clearLogin: () => dispatch => {
  dispatch({type:"CLEAR_LOGIN"})
}
};

export default manageUserActions;
