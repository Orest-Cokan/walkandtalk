import React from "react";
import AuthScreen from "../src/screens/AuthScreen";
import SignUpScreen from "../src/screens/SignupScreen";
import renderer from "react-test-renderer";
import RNFirebase from "react-native-firebase";

test("renders correctly", () => {
  const tree = renderer.create(<SignUpScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly", () => {
  const tree = renderer.create(<AuthScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
