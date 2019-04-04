import React, { Component } from "react";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import {
  Container,
  Content
} from "native-base";

/*
This is the list view search screen. Users can search for events in this screen.
Results are shown as cardview that can be selected to view further details
*/
class SearchListViewScreen extends Component {
  //text stores the input from user which is initalized to an empty string.
  //
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={ScreenStyleSheet.content}
        >
          {this.props.results}
        </Content>
      </Container>
    );
  }
}

export default SearchListViewScreen;
