import React, { Component } from "react";
import RouterComponent from "./Router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./reducers";

// Initializes app and redux
export default class Main extends Component {
  render() {
    return (
      <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
        <RouterComponent />
      </Provider>
    );
  }
}
