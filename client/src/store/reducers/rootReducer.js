import manageUserReducer from "./manageUserReducer";
import manageSpinnerReducer from "./manageSpinnerReducer";
import feedReducer from "./feedReducer";
import {combineReducers} from "redux";

export default combineReducers({
    manageUserReducer: manageUserReducer,
    manageSpinnerReducer: manageSpinnerReducer,
    feedReducer: feedReducer
})