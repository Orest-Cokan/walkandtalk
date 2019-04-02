// Create Event Screen View
import React, { Component } from "react";
import { fetchUserEvents } from "../../actions/EventActions";
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
  }
  componentDidMount() {
    console.log("fetching events");
    this.props.fetchUserEvents(this.props.user.user.email);
  }

  getEvents() {
    let events = [];
    const fullname = this.props.user.user.fullname;
    console.log(this.props.events);
    this.props.events.map(event => {
      let badge = null;
      if (fullname == event.organizer) {
        badge = "HOSTING";
        events.unshift(
          <BaseCard
            key={event.id}
            id={event.id}
            date={event.date}
            start_time={event.start_time}
            title={event.title}
            location={event.location.streetName}
            badge={badge}
          />
        );
      } else {
        for (let i = 0; i < event.attendees.length; i++) {
          if (event.attendees[i].name == fullname) {
            badge = "GOING";
            events.unshift(
              <BaseCard
                key={event.id}
                id={event.id}
                date={event.date}
                start_time={event.start_time}
                title={event.title}
                location={event.location.streetName}
                badge={badge}
              />
            );
            break;
          }
        }
      }
    });
    return events;
  }

  render() {
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Home</Title>
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
    events: state.event.userEvents,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchUserEvents }
)(HomeScreen);
