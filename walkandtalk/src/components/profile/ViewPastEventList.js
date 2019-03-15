// Past Event List Screen View
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image
} from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Button,
  StatusBar
} from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { Actions } from 'react-native-router-flux';
import BaseCard from "../../cardview/baseCard";

class PastEventListScreen extends Component {

  onBack = () => {
    // Navigate back to profile page
    Actions.pop();
    //Actions.pastEventRecord();
  }

  render() {
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor="white"
          androidStatusBarStyle="dark-content"
        >
          <Left style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.onBack}>
              <Image
                style={ScreenStyleSheet.backIcon}
                source={require("../../assets/icons/back-button.png")}
              />
            </Button>
          </Left>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Past Events</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides}>
          </Right>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Card List View */}
          <BaseCard
            title="Walk in the park"
            date="WED, MAR 3"
            start_time="10:00 PM"
            location="Hawrelak Park"
          />
          <BaseCard
            title="Morning Stroll"
            date="SAT, MAR 17"
            start_time="9:00 AM"
            location="River Valley"
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(PastEventListScreen);

