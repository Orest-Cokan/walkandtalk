import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content
} from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import BaseCard from "../../cardview/baseCard";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      title: null,
      description: null,
      date: null,
      startTime: null,
      endTime: null,
      intensity: null,
      venue: null,
      location: null
    };
  }
  render() {
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor="#A680B8"
          androidStatusBarStyle="light-content"
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title>Home</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Card List View */}
          <BaseCard
            time="WED, MAR 3 AT 10:00PM"
            title="Walk in the park"
            location="Hawrelak Park"
            badge="GOING"
          />
          <BaseCard
            time="SAT, MAR 17 AT 9:00AM"
            title="Morning Stroll"
            location="River Valley"
            badge="HOSTING"
          />
          <BaseCard
            time="MON, MAR 19 AT 11:00AM"
            title="Betty's Evening Stroll"
            location="Van Vliet Centre"
            badge="GOING"
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
)(HomeScreen);
