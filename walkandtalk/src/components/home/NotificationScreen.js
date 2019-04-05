import React, { Component } from 'react';
import { Button, 
  Container, 
  Content, 
  Left,
  Header,
  Right, 
  Body, 
  Title, 
  List, 
  ListItem 
} from 'native-base';
import moment from "moment";
import { Image, View } from 'react-native';
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { StyledText as Text } from "../../constants/StyledText";
import { Actions}  from 'react-native-router-flux';
import { connect } from "react-redux";
import { getNotifications, updateNotification } from "../../actions/NotificationActions"

class NotificationScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      isRead: 1,
      loading: false
    }

    this.props.getNotifications(this.props.user.user.email);
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener('willFocus', 
    async () => { 
      this.setState({loading: true});
      await this.props.getNotifications(this.props.user.user.email);
      this.setState({loading: false});
    });
    this.willBlurListener = this.props.navigation.addListener('willBlur', 
    async () => {
      console.log('Notification did blur'); 
      await this.props.notifications.map( async (notification) => {
        await this.props.updateNotification(
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

  viewEvent(eventId) {
    Actions.viewEvent( {eventId: eventId, searchScreen: false});
  }

  submitRecord() {
    Actions.submitRecord();
  }

  submitQuestionnaires() {
    Actions.mainFormPage();
  }

  onBack() {
    Actions.home();
  }

  getNotifications() {
    let notifications = [];
    let message = "";
    let onPress = null;
    let createdAt = '';
    this.props.notifications.map((notification, index) => {
      createdAt = moment(notification.createdAt).fromNow();
      if (notification.type == 'updatedEvent') {
        message = "The details for " + notification.eventTitle + " have been updated."
        onPress = this.viewEvent.bind(this, notification.eventId);
      } 
      if (notification.type == 'cancelledEvent') {
        message = notification.eventTitle + " has been cancelled."
        onPress = this.viewEvent.bind(this, notification.eventId);
      }
      if (notification.type == 'upcomingEvent') {
        message = "You have " + notification.eventTitle + " coming up today."
        onPress = this.viewEvent.bind(this, notification.eventId);
      }
      if (notification.type == 'eventRecord') {
        message = "Let us know how " + notification.recordTitle + " went. Tap to fill in your record"
      }
      if (notification.type == 'questionnaire') {
        message = "It is time to fill in your monthly questionnaires."
      }
      if (notification.isRead == 0) {
        backgroundColor = "#DBDAF2";
      } else {
        backgroundColor = "#FFFFFF";
      }
      notifications.unshift(
        <ListItem
            button={true}
            key={index}
            onPress={onPress}
            style={{backgroundColor: backgroundColor}}
        >
          <View style={{flexDirection: 'column'}}>
            <View style={{flex: 1}}>
              <Text>{message}</Text>
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
          <List>
            {this.getNotifications()}
          </List>
        </Content>
        )}
    </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("notification playground");
  return {
    notifications: state.notification.notifications,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getNotifications, updateNotification }
)(NotificationScreen);