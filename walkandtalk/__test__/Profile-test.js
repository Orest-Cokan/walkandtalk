import React from "react";
import renderer from "react-test-renderer";
import ProfileScreen from "../src/screens/ProfileScreen";

test("renders correctly", () => {
  const tree = renderer.create(<ProfileScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
