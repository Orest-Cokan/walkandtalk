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

import UserCard from "../../cardview/userCard";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";
import { fetchEvents, deleteEvent } from "../../actions/EventActions";
import { addAttendees, removeAttendees } from "../../actions/AttendeeActions";

class ViewEventScreen extends Component {
  constructor(props) {
    super(props);

    // Set state on inital profile signup
    this.state = {
      eventId: 0,
      date: "WED, MAR 3 AT",
      startTime: "10:00PM",
      endTime: "2:00AM",
      title: "Walk in the park",
      location: "Hawrelak Park",
      badge: "GOING",
      organizer: "Beatrice",
      intensity: "Brisk",
      attending: 6,
      description:"none",
      visibleModal: false,
      attendees:[],
      researcher:""
    };
  }

 
  //Depending on whether we are viewing an event in home or in search different props will be passing
  // First we want to determine props available and set state with the necessary values
  //
  // First will do for search events
  componentWillMount() {
    this.props.fetchUserEvents;
    if (this.props.searchScreen == true) {
      searchEvent = this.props.markerSent;
      console.log(searchEvent, "markerSent");

      //check if hosting, going or not going
      var badge = "";
      const fullname = this.props.user.user.fullname;
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
        description: searchEvent.description,
        attendees: searchEvent.attendees,
        researcher: this.props.user.user.researcher
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
          description: currEvent.description,
          attendees: currEvent.attendees,
          researcher: this.props.user.user.researcher
        },
        () => {
          console.log(this.state, "state updated");
        }
      );
    }
  }

  componentWillUnmount(){
    this.setState({visibleModal:false})
  }


  // When edit event button is clicked
  goToEditEvent = () => {
    // Navigate to edit event
    Actions.editEvent(this.state.eventId);
  };

  viewOtherProfile = email => {
    // Navigate to view this event
    this.setState({visibleModal:false})
   console.log("we are going to view other profile")
   Actions.otherProfile({email:email})
  };

  onBack = () => {
    // Navigate back to profile page
    Actions.pop();
  };


  // When edit event button is clicked
  openModal = () => {
    // Navigate to edit event
    this.setState({visibleModal: true})
  };

  //Used when scrolling in the Modal
  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  //Handles the reference of the Modal goes to
  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  deleteEvent = () => {
    console.log("we are deleting event with id", this.state.eventId);
    this.props.deleteEvent(this.state.eventId);
  };

  // Set state
  onChange(name, value) {
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
      this.props.addAttendees(
        this.state.eventId,
        this.props.user.user.fullname,
        this.props.user.user.email
      );
      console.log("You joined!");
    } else {
      this.props.removeAttendees(
        this.state.eventId,
        this.props.user.user.email
      );
      console.log("You left!");
    }
  }

  getAttendees(){
    let attendee_list = [];
    this.state.attendees.map((a, index) => {
      attendee_list.unshift(
        <TouchableOpacity 
        key={index}
        disabled={!this.state.researcher}
         onPress={this.viewOtherProfile.bind(this, a.email)}>
        <UserCard
          key={a.email}
          email={a.email}
          fullname={a.fullname}
          researcher = {this.state.researcher}
        />
        </TouchableOpacity>
      );
    });
    return attendee_list;
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
            <TouchableOpacity onPress={this.openModal}>
              <Text style={ScreenStyleSheet.attending}>
                {this.state.attending} people
              </Text>
              </TouchableOpacity>
              <Text style={ScreenStyleSheet.attendingText}>
                are attending this event
              </Text>
            </View>
          </View>

          {/*Pop up modal that displays the users attending*/}
          <Modal
          isVisible={this.state.visibleModal == true}
          onBackdropPress={() => this.setState({ visibleModal: false })}
          swipeDirection="down"
          scrollTo={this.handleScrollTo}
          scrollOffset={this.state.scrollOffset}
          scrollOffsetMax={400 - 300} 
          style={styles.bottomModal}>
          <View style={styles.scrollableModal}>
            <View style={styles.modalTextView}>
            <Text style={styles.modalText}>Going </Text>
            </View>
            <ScrollView
              ref={ref => (this.scrollViewRef = ref)}
              onScroll={this.handleOnScroll}
              scrollEventThrottle={16}>
              {this.getAttendees()}
                    
            </ScrollView>
          </View>
        </Modal>

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
  { fetchEvents, deleteEvent, addAttendees, removeAttendees }
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
  },
  scrollableModal: {
    height: 300,
    backgroundColor:"white",
  },
  bottomModal: {
    display: "flex",
    justifyContent: "center",
    margin:"auto",
    margin: 0,
    marginRight: 20,
    marginLeft:20
  },
  modalTextView:{
    height: 50,
    backgroundColor: "#A680B8",
    alignItems:"center"
  },
  modalText: { 
    color:  "white", 
    borderBottomColor:"gray",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 15
  }
};
