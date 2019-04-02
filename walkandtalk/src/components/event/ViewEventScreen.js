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
import { fetchEvents, deleteEvent } from "../../actions/EventActions";
<<<<<<< HEAD
import { sendNotification } from "../../actions/NotificationActions";
=======
>>>>>>> 22372b998ac2a865abd99c18404874241ea9741e
import { addAttendees, removeAttendees } from "../../actions/AttendeeActions";

class ViewEventScreen extends Component {
  constructor(props) {
    super(props);
  }

  onBack = () => {
    // Navigate back to profile page
    Actions.pop();
  };

  //Depending on whether we are viewing an event in home or in search different props will be passing
  // First we want to determine props available and set state with the necessary values
  //
  // First will do for search events
  componentWillMount() {
<<<<<<< HEAD
    this.props.fetchEvents;
=======
    this.props.fetchUserEvents;
>>>>>>> 22372b998ac2a865abd99c18404874241ea9741e
    if (this.props.searchScreen == true) {
      searchEvent = this.props.markerSent;
      console.log(searchEvent, "markerSent");

      //check if hosting, going or not going
      var badge = "";
      const fullname = this.props.user.user.fullname;
      console.log('SEARCH EVENT', searchEvent)
      if (fullname === searchEvent.organizer) {
        badge = "HOSTING";
      } else {
        //get event and see if user is attending
        attendees = searchEvent.attendees;
        attendees.forEach(function(a) {
          if (a.fullname == fullname) {
            badge = "GOING";
          }
        });
      }

      this.setState({
        eventId: searchEvent.id,
        date: searchEvent.date,
        startTime: searchEvent.start_time,
        endTime: searchEvent.end_time,
        title: searchEvent.title,
        location: searchEvent.location.streetName,
        badge: badge,
        organizer: searchEvent.organizer,
        intensity: searchEvent.intensity,
        attending: searchEvent.total_attendees,
        description: searchEvent.description
      });
    }

    //The following is for viewing an event from the homescreen
    // The user might be attending the event (GOING) or HOSTING the event
    if (this.props.searchScreen == false) {
      // console.log("eventID", this.props.eventId);
      id = this.props.eventId;
      events = this.props.events;
      console.log("events", events, "event id", id);

      //retrieve the current event
      let currEvent = events.find(e => e.id === id);
      console.log("current event", currEvent);

      //check if hosting, going or not going
      var badge = "";
      const fullname = this.props.user.user.fullname;
      if (fullname == currEvent.organizer) {
        badge = "HOSTING";
      } else {
        //get event and see if user is attending
        attendees = currEvent.attendees;
        attendees.forEach(function(a) {
          if (a.fullname == fullname) {
            badge = "GOING";
          }
        });
      }

      // console.log("currEvent", currEvent);
      this.setState(
        {
          eventId: currEvent.id,
          date: currEvent.date,
          startTime: currEvent.start_time,
          endTime: currEvent.end_time,
          title: currEvent.title,
          location: currEvent.location,
          badge: badge,
          organizer: currEvent.organizer,
          intensity: currEvent.intensity,
          attending: currEvent.total_attendees,
          description: currEvent.description
        },
        () => {
          console.log(this.state, "state updated");
        }
      );
    }
  }

  deleteEvent = () => {
    console.log("we are deleting event with id", this.state.eventId);
    this.props.deleteEvent(this.state.eventId);
    this.props.sendNotification(
      this.state.eventId,
      this.state.title,
      'cancelledEvent'
      );
  };

  // When edit event button is clicked
  goToEditEvent = () => {
    // Navigate to edit event
    Actions.editEvent(this.state.eventId);
  };

  // Set state
  onChange(name, value) {
<<<<<<< HEAD
    console.log("name", name, "value", value)
    this.setState({ [name] : value }, function () {
      this.updateAttendees();
  });
}

  updateAttendees() {
    console.log("am i going???", this.state.badge)
    console.log("current user", this.props.user.user.email)
    if (this.state.badge == "GOING"){
=======
    console.log("name", name, "value", value);
    this.setState({ [name]: value }, function() {
      this.updateAttendees();
    });
  }

  updateAttendees() {
    this.setState({ [name]: value });
    console.log("am i going???", this.state.badge);
    console.log("current user", this.props.user.user.email);
    if (this.state.badge == "GOING") {
>>>>>>> 22372b998ac2a865abd99c18404874241ea9741e
      this.props.addAttendees(
        this.state.eventId,
        this.props.user.user.fullname,
        this.props.user.user.email
      );
<<<<<<< HEAD
      console.log("You joined!", this.props)
    }else{
=======
      console.log("You joined!");
    } else {
>>>>>>> 22372b998ac2a865abd99c18404874241ea9741e
      this.props.removeAttendees(
        this.state.eventId,
        this.props.user.user.email
      );
      console.log("You left!");
    }
  }

  render() {
    //const attendingOptions = ["Not Going", "Going"];

    const attendingOptions = [
      { label: "Not Going", value: "" },
      { label: "Going", value: "GOING" }
    ];

    //Conditional rendering for the buttons present on view event
    //If going or not going, will display those buttons
    //If hosting, will display edit and delete buttons
    if (this.state.badge == "GOING" || this.state.badge == "") {
      //check if user going or not
      var going = 0;
      if (this.state.badge == "GOING") {
        going = 1;
      }
      console.log(going, "going");
      buttons = (
        <View style={styles.segmentedControls}>
          <SwitchSelector
            options={attendingOptions}
            initial={going}
            onPress={this.onChange.bind(this, "badge")}
            textColor={"#A680B8"} //'#7a44cf'
            selectedColor={"#ffffff"}
            buttonColor={"#A680B8"}
            borderColor={"#A680B8"}
            borderRadius={8}
            hasPadding
          />
        </View>
      );
    }
    if (this.state.badge == "HOSTING") {
      buttons = (
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

    //conditional rendering for the description
    if (this.state.badge == "GOING" || this.state.badge == "") {
      description = (
        <View style={ScreenStyleSheet.rowContainerEvent}>
          <Text style={ScreenStyleSheet.eventDescription}>
            {this.state.description}
          </Text>
        </View>
      );
    } else {
      description = (
        <View style={ScreenStyleSheet.rowContainerEvent}>
          <Text style={ScreenStyleSheet.eventDescription1}>
            {this.state.description}
          </Text>
        </View>
      );
    }

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
          {/* Card List View */}
          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.EventSectionTitle}>
                {this.state.date} {this.state.startTime}-{this.state.endTime}
              </Text>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.TitleHeader}>
                {this.state.title}
              </Text>
            </View>
          </View>

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

          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View>
              <Image
                style={ScreenStyleSheet.eventIcons}
                source={require("../../assets/icons/pin.png")}
              />
            </View>
            <View s>
              <Text style={ScreenStyleSheet.eventInfoInput}>
                {this.state.location.streetName}
              </Text>
            </View>
          </View>

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
          {description}
          {buttons}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.event.events,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchEvents, 
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
