import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducers/app";

// Create a store for redux
const store = createStore(reducer);

export default store;
