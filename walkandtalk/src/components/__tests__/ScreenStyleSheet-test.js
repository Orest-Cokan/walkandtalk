import React from "react";
import Stylesheet from "../../constants/StyledText";
import renderer from "react-test-renderer";


test("renders correctly", () => {
    const tree = renderer.create(<Stylesheet />).toJSON();
    expect(tree).toMatchSnapshot();
  });