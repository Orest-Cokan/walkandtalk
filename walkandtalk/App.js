import React, { Component } from "react";
import firebase from "firebase";
import Main from "./src/Main";

export default class App extends Component {
  componentWillMount() {
    firebase
      .auth()
      .signInAnonymously()
      .then(credential => {
        if (credential) {
          console.log("default app user ->", credential.user.toJSON());
        }
      });
  }
  render() {
    return <Main />;
  }
}
