import manageUserReducer from "./manageUserReducer";
import manageSpinnerReducer from "./manageSpinnerReducer"
import {combineReducers} from "redux";

export default combineReducers({
    manageUserReducer: manageUserReducer,
    manageSpinnerReducer: manageSpinnerReducer
})