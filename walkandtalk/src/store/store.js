import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducers/app";
import thunk from "redux-thunk";

const store = createStore(reducer);

export default store;
