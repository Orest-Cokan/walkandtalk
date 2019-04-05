// Create Event Screen View
import React, { Component } from "react";
import { getUnreadNotifications } from "../../actions/NotificationActions";
import { fetchUserEvents } from "../../actions/EventActions";
import { getPicture } from "../../actions/PictureActions";
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
import Loader from "../../constants/loader";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.props.getPicture(this.props.user.token, this.props.user.user.email);
    this.props.getUnreadNotifications(this.props.user.token, this.props.user.user.email);
    this.props.fetchUserEvents(this.props.user.token, this.props.user.user.email);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener('willFocus', 
    async () => { 
      this.setState({loading: true})
      await this.props.fetchUserEvents(this.props.user.token, this.props.user.user.email);
      await this.props.getUnreadNotifications(this.props.user.token, this.props.user.user.email);
      this.setState({loading: false})
    })
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  viewEvent(index, badge) {
    Actions.viewEvent( {
      event: this.props.events[index],
      badge: badge
    })
  }


  getEvents() {
    let events = [];
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
        <Loader loading={this.state.loading} />
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

        {!this.state.loading && (
        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {this.getEvents()}
        </Content>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    unread_notifications: state.notification.unread_notifications,
    events: state.event.userEvents,
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  { fetchUserEvents, getUnreadNotifications, getPicture }
)(HomeScreen);
