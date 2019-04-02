// Create Event Screen View
import React, { Component } from "react";
import { fetchEvents } from "../../actions/EventActions";
import { getUnreadNotifications } from "../../actions/NotificationActions";
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
import { Actions } from "react-native-router-flux";
import IconWithBadge from "../../constants/IconWithBadge";

class HomeScreen extends Component {
  constructor(props) {
    super(props);    
    this.props.fetchEvents();
    this.props.getUnreadNotifications(this.props.user.user.email);
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener('didFocus', () => { 
      console.log('HomeScreen did focus'); 
      this.props.fetchEvents();
      this.props.getUnreadNotifications(this.props.user.user.email);
    })
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
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
              <IconWithBadge 
                icon={
                  <Image
                    style={ScreenStyleSheet.headerIcon}
                    source={require("../../assets/icons/notification.png")}
                  />
                }
                total_unread={this.props.unread_notifications.length}
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
    unread_notifications: state.notification.unread_notifications,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchEvents, getUnreadNotifications }
)(HomeScreen);
