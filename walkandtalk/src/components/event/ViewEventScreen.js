import React, { Component } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
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
import SwitchSelector from "react-native-switch-selector";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { Actions } from "react-native-router-flux";
import { fetchUserEvents, deleteEvent } from "../../actions/EventActions";
import { sendNotification } from "../../actions/NotificationActions";
import { addAttendees, removeAttendees } from "../../actions/AttendeeActions";

class ViewEventScreen extends Component {
  constructor(props) {
    super(props);
  
    // Mapping the passed props to the component state
    this.state = {
      id: this.props.event.id,
      email: this.props.event.email,
      title: this.props.event.title,
      date: this.props.event.date,
      startTime: this.props.event.start_time,
      endTime: this.props.event.end_time,
      location: this.props.event.location.streetName,
      organizer: this.props.event.organizer,
      intensity: this.props.event.intensity,
      attending: this.props.event.total_attendees,
      description: this.props.event.description,
      badge: this.props.badge
    }
  }
  // Navigate back to previous screen
  onBack = () => {
    Actions.pop();
  };

  // Deletes the event
  deleteEvent = () => {
    this.props.deleteEvent(this.state.id);
    this.props.sendNotification(
      this.state.id,
      this.state.title,
      'cancelledEvent'
      );
  };

  // When edit event button is clicked
  goToEditEvent = () => {
    // Navigate to edit event
    Actions.editEvent({ event: this.props.event});
  };

  // Set state of attending status
  onChangeStatus(name, value) {
    this.setState({ [name] : value }, function () {
      this.updateAttendees();
    });
  }

  // Updates the attendee list
  updateAttendees() {
    if (this.state.badge == "GOING"){
      this.props.addAttendees(
        this.state.id,
        this.props.user.user.fullname,
        this.props.user.user.email
      );
    } else {
      this.props.removeAttendees(
        this.state.id,
        this.props.user.user.email
      );
    }
  }

    // Conditional rendering for the buttons present on view event
    // If going or not going, will display those buttons
    // Otherwise, you're hosting the event and edit and delete buttons will be displayed
  showOptions() {
    if (this.state.badge == "GOING" || this.state.badge == null) {
      //const attendingOptions = ["Not Going", "Going"];
      const attendingStatuses = [
        { label: "Not Going", value: null },
        { label: "Going", value: "GOING" }
      ];
      let default_status = null;
      attendingStatuses.map((option, index) => {
        if (this.state.badge == option.value) {
          default_status = index;
        }
      });
      return (
        <View style={styles.segmentedControls}>
          <SwitchSelector
            options={attendingStatuses}
            initial={default_status}
            onPress={this.onChangeStatus.bind(this, "badge")}
            textColor={"#A680B8"} //'#7a44cf'
            selectedColor={"#ffffff"}
            buttonColor={"#A680B8"}
            borderColor={"#A680B8"}
            borderRadius={8}
            hasPadding
          />
        </View>
      );
  } else {
    return (
        <View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={this.goToEditEvent}
          >
            {/*Edit Event*/}
            <Text style={styles.buttonText}> EDIT </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={this.deleteEvent}
          >
            {/*Delete Event*/}
            <Text style={styles.buttonText}> DELETE </Text>
          </TouchableOpacity>
        </View>
      );
    }
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
          <Left style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.onBack}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/back-button.png")}
              />
            </Button>
          </Left>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>
              {this.state.title}
            </Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Date and Time*/}
          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.EventSectionTitle}>
                {this.state.date} {this.state.startTime}-{this.state.endTime}
              </Text>
            </View>
          </View>

          {/* Title */}
          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.TitleHeader}>
                {this.state.title}
              </Text>
            </View>
          </View>

          {/* Intensity */}
          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View>
              <Image
                style={ScreenStyleSheet.eventIcons}
                source={require("../../assets/icons/walk.png")}
              />
            </View>
            <View s>
              <Text style={ScreenStyleSheet.eventInfoInput}>
                {this.state.intensity}
              </Text>
            </View>
          </View>

          {/* Location */}
          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View>
              <Image
                style={ScreenStyleSheet.eventIcons}
                source={require("../../assets/icons/pin.png")}
              />
            </View>
            <View s>
              <Text style={ScreenStyleSheet.eventInfoInput}>
                {this.state.location}
              </Text>
            </View>
          </View>

          {/* Organizer */}
          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View>
              <Image
                style={ScreenStyleSheet.eventIcons}
                source={require("../../assets/icons/event-host.png")}
              />
            </View>
            <View s>
              <Text style={ScreenStyleSheet.eventInfoInput}>
                {this.state.organizer}
              </Text>
            </View>
          </View>

        {/* Number or attendees */}
          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View>
              <Image
                style={ScreenStyleSheet.eventIcons}
                source={require("../../assets/icons/user-group.png")}
              />
            </View>
            <View style={ScreenStyleSheet.rowContainerEvent2}>
              <Text style={ScreenStyleSheet.attending}>
                {this.state.attending} people
              </Text>
              <Text style={ScreenStyleSheet.attendingText}>
                are attending this event
              </Text>
            </View>
          </View>

          {/* On screen separator */}
          <View style={ScreenStyleSheet.EventLineSeparator} />

          {/* Description */}
          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View>
              <Image
                style={ScreenStyleSheet.eventIcons}
                source={require("../../assets/icons/aboutEvent.png")}
              />
            </View>
            <View>
              <Text style={ScreenStyleSheet.aboutInfo}>About this event</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainerEvent}>
            <Text style={ScreenStyleSheet.eventDescription}>
              {this.state.description}
            </Text>
          </View>

          {/* User options depending on their badge */}
          {this.showOptions()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchUserEvents, 
    deleteEvent, 
    addAttendees, 
    removeAttendees, 
    sendNotification }
)(ViewEventScreen);

const styles = {
  segmentedControls: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  buttonContainer: {
    marginVertical: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 10
  },
  editButton: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 40,
    marginLeft: 40,
    padding: 10,
    backgroundColor: "#A680B8",
    borderRadius: 8
  },
  deleteButton: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 40,
    marginLeft: 40,
    padding: 10,
    backgroundColor: "#ae4949",
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  }
};
