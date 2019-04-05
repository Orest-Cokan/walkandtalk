import React, { Component } from 'react';
import { Button, 
  Container, 
  Content, 
  Left,
  Header,
  Right, 
  Body, 
  Title, 
  ListItem 
} from 'native-base';
import moment from "moment";
import { Image, View } from 'react-native';
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { StyledText as Text } from "../../constants/StyledText";
import { Actions}  from 'react-native-router-flux';
import { connect } from "react-redux";
import { getNotifications, updateNotification } from "../../actions/NotificationActions"
import { fetchEvents } from "../../actions/EventActions";
import { getUncompletedRecords } from "../../actions/RecordActions"

// This components displays the user's notifications
class NotificationScreen extends Component{
  constructor(props) {
    super(props);

    // Gets the state ready to set unread notifications to read
    this.state = {
      isRead: 1,
      loading: false
    }

    // Grabs all needed data for this screen
    this.props.getNotifications( this.props.user.token, this.props.user.user.email);
    this.props.fetchEvents(this.props.user.token);
    this.props.getUncompletedRecords( this.props.user.token, this.props.user.user.email);
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener('willFocus', 
    async () => { 
      this.setState({loading: true});
      await this.props.getNotifications( this.props.user.token, this.props.user.user.email);
      await this.props.fetchEvents(this.props.user.token);
      await this.props.getUncompletedRecords(this.props.user.token, this.props.user.user.email);
      this.setState({loading: false});
    });
    this.willBlurListener = this.props.navigation.addListener('willBlur', 
    async () => {
      await this.props.notifications.map( async (notification) => {
        await this.props.updateNotification(
          this.props.user.token,
          notification.id,
          this.state.isRead
        );
      });
    });
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
    this.willBlurListener.remove();
  }

  // Called when an 'updatedEvent' or 'upcomingEvent' notification is pressed
  // Redirects the user to the viewEvent screen
  viewEvent(subjectId) {
    let event = this.props.events.find(event => event.id == subjectId);
    if (event){
      let badge = null;
      if (this.props.user.user.email == event.email) {
        badge = "HOSTING";
      } 
      else {
        for (let i = 0; i < event.attendees.length; i++) {
          if (event.attendees[i].email == this.props.user.user.email) {
            badge = "GOING";
            break;
          }
        }
      }
      Actions.viewEvent( { 
        event: event,
        badge: badge
       });
    } else {
      null;
    }
  }

  // Called when an 'eventRecord' notification is pressed
  // Redirects the user to the submitRecord screen
  submitRecord(subjectId) {
    let record = this.props.uncompleted_records.find(record => record.id == subjectId);
    if (record){
      Actions.submitRecord({ record: record });
    } else {
      null;
    }
  }


  // Called when a 'questionnaire' notification is pressed
  // Redirects the user to the mainFormPage screen
  goToForms() {
    Actions.mainFormPage();
  }


  // Takes the user back to home
  onBack() {
    Actions.home();
  }

  // Gets all user notification objects and
  // Transforms them for rendering
  getNotifications() {
    let notifications = [];
    let message = "";
    let onPress = null;
    let createdAt = '';
    this.props.notifications.map((notification, index) => {
      createdAt = moment(notification.createdAt).fromNow();
      if (notification.type == 'updatedEvent') {
        message = "The details for " + notification.title + " have been updated."
        onPress = this.viewEvent.bind(this, notification.subjectId);
        icon = require("../../assets/icons/updated.png");
      } 
      if (notification.type == 'cancelledEvent') {
        message = notification.title + " has been cancelled.";
        onPress = null;
        icon = require("../../assets/icons/disabled.png");
      }
      if (notification.type == 'upcomingEvent') {
        message = "You have " + notification.title + " coming up today."
        onPress = this.viewEvent.bind(this, notification.subjectId);
        icon = require("../../assets/icons/calendar.png");
      }
      if (notification.type == 'eventRecord') {
        message = "Let us know how " + notification.title + " went. Tap to fill in your record."
        icon = require("../../assets/icons/test.png");
        onPress = this.submitRecord.bind(this, notification.subjectId);
      }
      if (notification.type == 'questionnaire') {
        message = "It is time to fill in your monthly questionnaires."
        icon = require("../../assets/icons/test.png");
        onPress = this.goToForms.bind(this);
      }
      if (notification.isRead == 0) {
        color = "#A680B8";
      } else {
        color = "grey";
      }
      notifications.unshift(
        <ListItem
            button={true}
            key={index}
            onPress={onPress}
        >
          <Image
            style={ScreenStyleSheet.notificationIcon}
            source={icon}
          />
          <View style={[{flexDirection: 'column'}, ScreenStyleSheet.notificationTextItem]}>
            <View style={{flex: 1}}>
              <Text style={{color: color}}>{message}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text>{createdAt}</Text>
            </View>
          </View>
        </ListItem>
      )
    });
    return notifications;
  }

  render(){
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}>
          <Left style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.onBack.bind(this)}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/back-button.png")}
              />
            </Button>
          </Left>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Notifications</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides}/>
        </Header>

        {!this.state.loading && (
        <Content>
          <View><Text> </Text></View>
          {this.getNotifications()}
        </Content>
        )}
    </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notification.notifications,
    events: state.event.events,
    uncompleted_records: state.record.uncompleted_records,
    user: state.user
  };
};

export default connect(
  mapStateToProps, { 
    getNotifications, 
    updateNotification, 
    fetchEvents, 
    getUncompletedRecords 
  }
)(NotificationScreen);