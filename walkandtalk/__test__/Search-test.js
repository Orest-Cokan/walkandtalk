import React from "react";
import SearchScreen from "../src/screens/SearchScreen";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<SearchScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
