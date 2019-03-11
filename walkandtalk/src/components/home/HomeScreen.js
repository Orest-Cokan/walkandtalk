// Create Event Screen View
import React, { Component } from "react";
<<<<<<< HEAD
import { fetchEvents } from "../../actions/EventActions";
=======
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
>>>>>>> master
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
import { SegmentedControls } from "react-native-radio-buttons";
import DatePicker from "react-native-datepicker";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { createEvent } from "../../actions/EventActions";
import BaseCard from "../../cardview/baseCard";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.props.fetchEvents();
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  getEvents() {
    let events = [];
    this.props.events.forEach(event => {
      let badge = null;
      if (this.props.fullname == event.organizer) {
        badge = "HOSTING";
        console.log(this.props.fullname, events.organizer);
      } else {
        for (let i = 0; i < event.attendees.length; i++) {
          if (event.attendees[i] == this.props.fullname) {
            badge = "GOING";
            break;
          }
        }
      }
      events.push(
        <BaseCard
          time={event.date}
          title={event.title}
          location={event.location}
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
    events: state.event.events
    //fullname: state.user.user.fullname
  };
};

export default connect(
  mapStateToProps,
  { fetchEvents }
)(HomeScreen);
