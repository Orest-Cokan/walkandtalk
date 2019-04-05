import React, { Component } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, Alert } from "react-native";
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
import AwesomeAlert from 'react-native-awesome-alerts';
import UserCard from "../../cardview/userCard";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";
import { deleteEvent } from "../../actions/EventActions";
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
      attendees: this.props.event.attendees,
      badge: this.props.badge,
      goingAlert: false,
      notGoingAlert: false,
      alreadyGoingAlert: false,
      alreadyGoingText: "",
      refresh: false
    }
  }

  shouldComponentUpdate(){
    this.resetButton()
  }
  // Navigate back to previous screen
  onBack = () => {
    Actions.pop();
  };

  hideAlert(name) {
    this.setState( { [name] : false })
  };

  //Used to update the Going/Not going buttons after cancel is pressed
  hideAlertNoChange(name) {

    this.setState( { [name] : false  })
  };

  resetButton(){
    let currRef = this.state.refresh;
    this.setState( { refresh: !currRef})
    console.log("reset here")
  }

  showAlert(value) {
    if(this.state.badge == value){
      if(this.state.badge == "GOING"){
        this.setState({
          alreadyGoingAlert: true,
          alreadyGoingText : "You are already going to this event!"
        })
      }else{
        this.setState({
          alreadyGoingAlert: true,
          alreadyGoingText : "You are not going to this event!"
        })
      }
    }else{
    if (value == "GOING") {
      this.setState( { goingAlert : true })
    } else {
      this.setState( { notGoingAlert : true })
    }
  }
  };

  // Deletes the event
  deleteEvent = () => {
    this.props.deleteEvent(this.props.user.token, this.state.id);
    this.props.sendNotification(
      this.props.user.token,
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

  viewOtherProfile = email => {
    // Navigate to view this event
    this.setState({visibleModal:false})
   console.log("we are going to view other profile")
   Actions.otherProfile({email:email})
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
    console.log("we are deleting event with id", this.state.id);
    this.props.deleteEvent(this.props.user.token, this.state.id);
  };

  confirm() {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
  // Set state
  onChangeStatus(value) {
    this.setState({ badge: value }, function() {
      this.updateAttendees();
    });
  }

  updateAttendees = async() => {
    await new Promise((resolve, reject) => {
      if (this.state.badge == "GOING"){
        this.props.addAttendees(
          this.props.user.token,
          this.state.id,
          this.props.user.user.fullname,
          this.props.user.user.email
        );
      } else {
        this.props.removeAttendees(
          this.props.user.token,
          this.state.id,
          this.props.user.user.email
        );
      }
      resolve();
      Actions.homeTab();
    });
  }

  getAttendees(){
    let attendee_list = [];
    this.state.attendees.map((a, index) => {
      attendee_list.unshift(
        <TouchableOpacity 
        key={index}
        disabled={!this.props.user.user.researcher}
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
      console.log(default_status, "default")
      });

      return (
        <View style={styles.segmentedControls}>
          <SwitchSelector
            options={attendingStatuses}
            initial={default_status}
            onPress={this.showAlert.bind(this)}
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
        <AwesomeAlert
          show={this.state.notGoingAlert}
          showProgress={false}
          message="Are you sure you don't want to go to this event?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="Yes"
          confirmButtonColor= {"#A680B8"}
          showCancelButton={true}
          cancelText="No"
          cancelButtonColor= {"grey"}
          onConfirmPressed={() => {
            this.onChangeStatus(null);
            this.hideAlert('notGoingAlert');
          }}
          onCancelPressed={() => {
            this.hideAlertNoChange('notGoingAlert');
          }}
        />
        <AwesomeAlert
          show={this.state.goingAlert}
          showProgress={false}
          message="Are you sure you want to go to this event?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="Yes"
          confirmButtonColor= {"#A680B8"}
          showCancelButton={true}
          cancelText="No"
          cancelButtonColor= {"grey"}
          onConfirmPressed={() => {
            this.onChangeStatus("GOING");
            this.hideAlert('goingAlert');
          }}
          onCancelPressed={() => {
            this.hideAlertNoChange('goingAlert');
          }}
        />
         <AwesomeAlert
          show={this.state.alreadyGoingAlert}
          showProgress={false}
          message={this.state.alreadyGoingText}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor= {"#A680B8"}
          onConfirmPressed={() => {
            this.hideAlert('alreadyGoingAlert');
          }}
          
        />
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
  { deleteEvent, 
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
