import React from "react";
import renderer from "react-test-renderer";
import SignupScreen from "../src/screens/SignupScreen";

test("renders correctly", () => {
  const tree = renderer.create(<SignupScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
