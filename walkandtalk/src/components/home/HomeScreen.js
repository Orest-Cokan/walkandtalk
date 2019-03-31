// Create Event Screen View
import React, { Component } from "react";
import { fetchEvents } from "../../actions/EventActions";
import { connect } from "react-redux";
import { Image, View, StatusBar } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Button
} from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import BaseCard from "../../cardview/baseCard";
import Popover from 'react-native-popover-view'
import { StyledText as Text } from "../../constants/StyledText";
import { Actions } from "react-native-router-flux";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    
    //this.showNotifications = this.showNotifications.bind(this);
    //this.closeNotifications = this.closeNotifications.bind(this);
  }

  componentDidMount() {
    console.log('fetching events')
    this.props.fetchEvents();
  }

  getEvents() {
    let events = [];
    const fullname = this.props.user.user.fullname;
    console.log(this.props.events)
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
          if (event.attendees[i].fullname == fullname) {
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

  showNotifications() {
    Actions.notifications();
  };

  render() {
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          androidStatusBarStyle={"dark-content"}
          iosBarStyle={"dark-content"}
        >
          <Left style={ScreenStyleSheet.headerSides} />
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Home</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.showNotifications.bind(this)}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/notification.png")}
              />
            </Button>
          </Right>
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
