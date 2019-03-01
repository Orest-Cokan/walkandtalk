import React from "react";
import renderer from "react-test-renderer";
import AddEventScreen from "../src/screens/AddEventScreen";

test("renders correctly", () => {
  const tree = renderer.create(<AddEventScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
