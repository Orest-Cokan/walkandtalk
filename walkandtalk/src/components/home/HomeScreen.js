// Create Event Screen View
import React, { Component } from "react";
import { getUnreadNotifications } from "../../actions/NotificationActions";
import { fetchUserEvents } from "../../actions/EventActions";
import { connect } from "react-redux";
import { Image, TouchableOpacity } from "react-native";
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
    this.props.getUnreadNotifications(this.props.user.user.email);
    this.props.fetchUserEvents(this.props.user.user.email);
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener('didFocus', () => { 
      console.log('HomeScreen did focus'); 
      this.props.fetchUserEvents(this.props.user.user.email);
      this.props.getUnreadNotifications(this.props.user.user.email);
    })
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  viewEvent(index, badge) {
    Actions.viewEvent( {
      event: this.props.events[index],
      badge: badge
    })
  }


  getEvents() {
    let events = [];
    console.log('userEvents', this.props.events);
    this.props.events.map((event, index) => {
      let badge = null;
      if ( this.props.user.user.email == event.email) {
        badge = "HOSTING";
      } else {
        badge = "GOING";
      }
      events.unshift(
        <TouchableOpacity
        key={index}
        onPress={this.viewEvent.bind(this, index, badge)}
      >
        <BaseCard
          date={event.date}
          start_time={event.start_time}
          title={event.title}
          location={event.location.streetName}
          badge={badge}
        />
      </TouchableOpacity>
          
        );
      }); 
    return events;
  }

  showNotifications() {
    Actions.notifications({});
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
    unread_notifications: state.notification.unread_notifications,
    events: state.event.userEvents,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchUserEvents, getUnreadNotifications }
)(HomeScreen);
