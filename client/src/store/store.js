import {createStore,applyMiddleware} from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

const initialState={};

const enhancers=[thunk];

let store= createStore(rootReducer,initialState,applyMiddleware(...enhancers));

export default store;