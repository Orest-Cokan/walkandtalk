// Helpline links Screen View
import React, { Component } from "react";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { StyleSheet, View, Image, Text, Linking } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Accordion,
  Left,
  Body,
  Title,
  Right,
  Content,
  Button
} from "native-base";
import { Actions } from "react-native-router-flux";

class EventRatingScreen extends Component {
  onBack = () => {
    // Navigate back to profile page
    Actions.pop();
  };

  render() {
    const dataArray = [
      { title: "First Element", content: "Lorem ipsum dolor sit amet" },
      { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
      { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
    ];
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Left style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.onBack}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/back-button.png")}
              />
            </Button>
          </Left>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Location Ratings</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          <Accordion dataArray={dataArray} expanded={0} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(EventRatingScreen);

// Styles
const styles = StyleSheet.create({
  HelplineTitle: {
    marginHorizontal: 10,
    paddingTop: 10
  },
  HelplineLink: {
    color: "#A680B8",
    marginHorizontal: 10,
    paddingBottom: 10
  }
});
