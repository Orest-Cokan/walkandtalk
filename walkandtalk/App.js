import React, { Component } from "react";
import firebase from "@firebase/app";
import "@firebase/auth";
import Main from "./src/Main";

export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCCL5OqXeMa4iAa-xEcwtOkL3bwbWReuM4",
      authDomain: "walkandtalk401.firebaseapp.com",
      databaseURL: "https://walkandtalk401.firebaseio.com",
      projectId: "walkandtalk401",
      storageBucket: "walkandtalk401.appspot.com",
      messagingSenderId: "592772538333"
    });
  }
  render() {
    return <Main />;
  }
}
