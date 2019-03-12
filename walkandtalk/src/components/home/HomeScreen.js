// Create Event Screen View
import React, { Component } from "react";
import { fetchEvents } from "../../actions/EventActions";
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

  getEvents() {
    let events = [];
    console.log(this.props.events, "inside get events");
    this.props.events.map(event => {
      events.unshift(
        <BaseCard
          key={event.id}
          time={event.date}
          title={event.title}
          location={event.location}
          badge={"GOING"}
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
    events: state.event.events
    //fullname: state.user.user.fullname
  };
};

export default connect(
  mapStateToProps,
  { fetchEvents }
)(HomeScreen);
