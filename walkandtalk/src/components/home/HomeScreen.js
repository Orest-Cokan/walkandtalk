// Create Event Screen View
import React, { Component } from "react";
import { fetchEvents } from "../../actions/EventActions";
import { loginUser, createUser } from "../../actions/UserActions";

import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  StatusBar
} from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import BaseCard from "../../cardview/baseCard";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    console.log("inside constructor");
    this.props.fetchEvents();
  }

  componentDidMount() {
    this.props.fetchEvents;
  }

  getEvents() {
    let events = [];
    const fullname = this.props.user.user.fullname;
    this.props.events.map(event => {
      let badge = null;
      if (fullname == event.organizer) {
        badge = "HOSTING";
      } else {
        for (let i = 0; i < event.attendees.length; i++) {
          if (event.attendees[i].name == fullname) {
            badge = "GOING";
            break;
          }
        }
      }
      events.unshift(
        <BaseCard
          key={event.id}
          time={event.date}
          title={event.title}
          location={event.locations.streetName}
          badge={badge}
        />
      );
    });
    return events;
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
          {this.getEvents()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("homescreen");
  return {
    events: state.event.events,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchEvents }
)(HomeScreen);
