import React from "react";
import AuthScreen from "../src/screens/AuthScreen";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<AuthScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
