// View Past Event Record Screen
import React, { Component } from "react";
import { View, Image, TouchableOpacity} from "react-native";
import { connect } from "react-redux";
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
import { Actions } from "react-native-router-flux";
import { StyledText as Text } from "../../constants/StyledText";
import { RecordInfo as Record } from "./RecordInfo";


class ViewPastEventRecord extends Component {

  constructor(props) {
    super(props);

    this.state = {
      organizer: this.props.record.organizer,
      title: this.props.record.title,
      date: this.props.record.date,
      startTime: this.props.record.start_time,
      endTime: this.props.record.end_time,
      location: this.props.record.location,
      numAttendees: this.props.record.total_attendees,
      completed: this.props.record.completed,
      venue: this.props.record.venue,
      distance: this.props.record.distance,
      duration: this.props.record.duration,
      intensity: this.props.record.intensity,
      walkRating: this.props.record.walk_rating,
      locationRating: this.props.record.location_rating
    }
    console.log("----------constructor--------", this.state)
  }

  onBack = () => {
    // Navigate back to Past Events List screen
    Actions.pop();
  };

  render() {

    return (

      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Left style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.onBack}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/back-button.png")}
              />
            </Button>
          </Left>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>{this.state.title}</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Event info */}

          {/* Date and time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.eventTimeInfo}>
                {this.state.date.toUpperCase()} {" AT "}
                {this.state.startTime.toUpperCase()} {" - "}
                {this.state.endTime.toUpperCase()}
              </Text>
            </View>
          </View>
          {/* Title */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.eventTitleInfo}>
                {this.state.title}
              </Text>
            </View>
          </View>
          {/* Intensity */}
          <View style={ScreenStyleSheet.rowContainer}>
            <Image
              style={ScreenStyleSheet.iconByInfo}
              source={require("../../assets/icons/walk.png")}
            />
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.infoByIcon}>
                {this.state.intensity}
              </Text>
            </View>
          </View>
          {/* Location */}
          <View style={ScreenStyleSheet.rowContainer}>
            <Image
              style={ScreenStyleSheet.iconByInfo}
              source={require("../../assets/icons/pin.png")}
            />
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.infoByIcon}>
                {this.state.location}
              </Text>
            </View>
          </View>
          {/* Organizer */}
          <View style={ScreenStyleSheet.rowContainer}>
            <Image
              style={ScreenStyleSheet.iconByInfo}
              source={require("../../assets/icons/default-profile.png")}
            />
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.infoByIcon}>
                {this.state.organizer}
              </Text>
            </View>
          </View>
          {/* Number of attendees */}
          <View style={ScreenStyleSheet.rowContainer}>
            <Image
              style={ScreenStyleSheet.iconByInfo}
              source={require("../../assets/icons/user-group.png")}
            />
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.numAttendees}>
                {this.state.numAttendees} people
                <Text> attended this event.</Text>
              </Text>
            </View>
          </View>

          {/* On screen separator */}
          <View style={ScreenStyleSheet.lineSeparator} />

          <Record 
            isComplete={this.state.completed}
            venue={this.state.venue}
            distance={this.state.distance}
            duration={this.state.duration}
            intensity={this.state.intensity}
            walkRating={this.state.walkRating}
            locationRating={this.state.locationRating}  
          />

        </Content>

      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("viewpasteventrecord");
  return {
    user: state.user
  };
};


export default connect(
  mapStateToProps,
)(ViewPastEventRecord);

const styles= {
  controls: {
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  buttonContainer: {
    marginVertical: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 10,
  }
};