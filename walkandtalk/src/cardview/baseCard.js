import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { StyledText as Text } from "../constants/StyledText";
import ScreenStyleSheet from "../constants/ScreenStyleSheet";


/*
This is the view for event card.
Parameters: Time, title, locaiton and badge(optional) of the event.
Returns: The list view that contains information about the event.
*/

class BaseCard extends Component {
  goToEvent = () => {
    // Navigate to view this event
    Actions.viewEvent({ eventId: this.props.id, searchScreen: false });
  };
  /*
  This is funtion checks if badge is null.
  Parameters: Time, title, locaiton and badge of the event.
  Returns: if badge is null, returns the card view without the badge.
  Else, calls change badge colour to determine the colour of the badge.
  */
  checkIfBadge = () => {
    if (!this.props.badge) {
      return (
        <TouchableOpacity onPress={this.goToEvent}>
        <View style={ScreenStyleSheet.baseCard}>
          <Text style={ScreenStyleSheet.cardEventTime}>
            {this.props.date.toUpperCase()} AT{" "}
            {this.props.start_time.toUpperCase()}
          </Text>
          <Text style={ScreenStyleSheet.cardEventTitle}>{this.props.title}</Text>
          <Text>{this.props.location}</Text>
        </View>
        </TouchableOpacity>
      );
    } else {
      return this.changeBadgeColour();
    }
  };
  /*
  This is funtion determines the colour of the badge and returns a card view with the badge.
  Parameters: Time, title, locaiton and badge of the event.
  Returns: if badge is 'going', returns the card view with a green badge.
  if the badge is 'hosting', returns the card view with a blue badge.
  */
  changeBadgeColour = () => {
    if (this.props.badge.toUpperCase() == "GOING") {
      return (
        <TouchableOpacity onPress={this.goToEvent}>
          <View style={ScreenStyleSheet.baseCard}>
            <View style={ScreenStyleSheet.timeWithBadge}>
              <Text style={ScreenStyleSheet.cardEventTime}>
                {this.props.date.toUpperCase()} AT{" "}
                {this.props.start_time.toUpperCase()}
              </Text>
              <Text style={ScreenStyleSheet.goingBadge}>
                {this.props.badge}
              </Text>
            </View>
            <Text style={ScreenStyleSheet.cardEventTitle}>{this.props.title}</Text>
            <Text>{this.props.location}</Text>
          </View>
        </TouchableOpacity>
      );
    } else if (this.props.badge.toUpperCase() == "HOSTING") {
      return (
        <TouchableOpacity onPress={this.goToEvent}>
          <View style={ScreenStyleSheet.baseCard}>
            <View style={ScreenStyleSheet.timeWithBadge}>
              <Text style={ScreenStyleSheet.cardEventTime}>
                {this.props.date.toUpperCase()} AT{" "}
                {this.props.start_time.toUpperCase()}
              </Text>
              <Text style={ScreenStyleSheet.hostingBadge}>
                {this.props.badge}
              </Text>
            </View>
            <Text style={ScreenStyleSheet.cardEventTitle}>{this.props.title}</Text>
            <Text>{this.props.location}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  render() {
    return this.checkIfBadge();
  }
}

export default BaseCard;
