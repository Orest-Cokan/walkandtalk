// Edit Event Screen View
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  StatusBar
} from "native-base";
import SwitchSelector from "react-native-switch-selector";
import DatePicker from "react-native-datepicker";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { editEvent } from "../../actions/EventActions";
import { sendNotification } from "../../actions/NotificationActions";
import { Actions } from "react-native-router-flux";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class EditEventScreen extends Component {
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
      location: this.props.event.location,
      organizer: this.props.event.organizer,
      intensity: this.props.event.intensity,
      venue: this.props.event.venue,
      description: this.props.event.description,
      notifType: 'updatedEvent',

       // Error messages
       errorTitle: null,
       errorDate: null,
       errorStartTime: null,
       errorEndTime: null,
       errorLocation: null
    }

    // Component refs
    this.title = React.createRef();
    this.date = React.createRef();
    this.startTime = React.createRef();
    this.endTime = React.createRef();
    this.location = React.createRef();


  }

  onChange(name, value) {
    this.setState({ [name] : value } )
    // For datetime pickers
    if (name == "date") {
      this.showError(this.state.date, this.date, "errorDate");
    }
    if (name == "startTime") {
      this.showError(this.state.startTime, this.startTime, "errorStartTime");
    }
    if (name == "endTime") {
      this.showError(this.state.endTime, this.endTime, "errorEndTime");
    }
  }

  // Checks if start and end times work
  isValidTime = () => {
    if (this.state.startTime > this.state.endTime) {
      return false;
    } else {
      return true;
    }
  };

  // Checks if input is null or empty
  isValid(input) {
    if (input == null || input == "") {
      return false;
    } else {
      return true;
    }
  }

  //Check end date
  checkEndDate(err, input){
    this.setState({endTime: input})
    if (this.state.startTime > this.state.endTime) {
      this.startTime.current.setNativeProps(
        ScreenStyleSheet.formInputValid
      );
      this.endTime.current.setNativeProps(ScreenStyleSheet.formInputError);
      this.setState({ errorStartTime: null });
      this.setState({
        errorEndTime: this.errorMessageDate(
          "The end time must be later than the start time."
        )
      }, console.log("set error text for end TIME"))
    } else {
        this.startTime.current.setNativeProps(
          ScreenStyleSheet.formInputValid
        );
        this.endTime.current.setNativeProps(ScreenStyleSheet.formInputValid);
        this.setState({ errorStartTime: null });
        this.setState({ errorEndTime: null });
    }
  }

  // Shows error message
  showError(input, ref, error) {
    // If input is valid
    if (this.isValid(input)) {
      // Checks if startTime < endTime
      if (this.startTime == ref || this.endTime == ref) {
        if (this.isValidTime()) {
          this.startTime.current.setNativeProps(
            ScreenStyleSheet.formInputValid
          );
          this.endTime.current.setNativeProps(ScreenStyleSheet.formInputValid);
          this.setState({ errorStartTime: null });
          this.setState({ errorEndTime: null });
        } else {
          this.startTime.current.setNativeProps(
            ScreenStyleSheet.formInputValid
          );
          this.endTime.current.setNativeProps(ScreenStyleSheet.formInputError);
          this.setState({ errorStartTime: null });
          this.setState({
            errorEndTime: this.errorMessageDate(
              "The end time must be later than the start time."
            )
          }, console.log("set error text for end TIME"));
        }
      }
      // Otherwise, keep or set back to default
      else {
        ref.current.setNativeProps(ScreenStyleSheet.formInputValid);
        this.setState({ [error]: null });
      }
    }
    // If input is invalid, show errors
    else {
      console.log(input, error);
      ref.current.setNativeProps(ScreenStyleSheet.formInputError);
      if (this.date == ref || this.startTime == ref || this.endTime == ref) {
        this.setState({
          [error]: this.errorMessageDate("This is a required field.")
        });
      } else {
        this.setState({
          [error]: this.errorMessage("This is a required field.")
        });
      }
    }
  }

  // Error message for text input fields
  errorMessage(message) {
    return (
      <View style={ScreenStyleSheet.rowContainer}>
        <View style={ScreenStyleSheet.formRowInfo}>
          <Text style={ScreenStyleSheet.formErrorMessage}>{message}</Text>
        </View>
      </View>
    );
  }

  // Error message for datetime pickers
  errorMessageDate(message) {
    return (
      <View style={ScreenStyleSheet.rowContainer}>
        <View style={ScreenStyleSheet.formRowInfo}>
          <Text
            style={[ScreenStyleSheet.formErrorMessage, { textAlign: "right" }]}
          >
            {message}
          </Text>
        </View>
      </View>
    );
  }

  // Checks if all input fields are valid
  inputCheck = () => {
    if (
      this.isValid(this.state.title) &&
      this.isValid(this.state.date) &&
      this.isValid(this.state.startTime) &&
      this.isValid(this.state.endTime) &&
      this.isValidTime() &&
      this.isValid(this.state.location)
    ) {
      return true;
    } else {
      this.showError(this.state.title, this.title, "errorTitle");
      this.showError(this.state.date, this.date, "errorDate");
      this.showError(this.state.startTime, this.startTime, "errorStartTime");
      this.showError(this.state.endTime, this.endTime, "errorEndTime");
      this.showError(this.state.location, this.location, "errorLocation");
      return false;
    }
  };
  
  // Has to be asynchronous in case edit finishes before 
  // fetching which will cause state not to be updated
  onFinish = async () => {
    if (this.inputCheck()){
    await new Promise((resolve, reject) => {
        // Edit the event user clicks
        this.props.editEvent(
          this.props.user.token,
          this.state.title, 
          this.state.id, 
          this.state.date, 
          this.state.startTime, 
          this.state.endTime, 
          this.state.description, 
          this.state.intensity, 
          this.state.venue, 
          this.state.location
        );
        this.props.sendNotification(
          this.props.user.token,
          this.state.id,
          this.state.title,
          this.state.notifType
        )
        resolve();
        Actions.homeTab();
    });
  }else {
    Alert.alert("You must fill in all required fields.");
  }
  }
  
  onCancel = () => {
    Actions.homeTab();
  };

  render() {
    // All the options displayed in radio buttons
    const intensities = [
        { label: "Slow", value: "Slow" },
        { label: "Intermediate", value: "Intermediate" },
        { label: "Brisk", value: "Brisk" }
      ];
      const venues = [
        { label: "Indoor", value: "Indoor" },
        { label: "Outdoor", value: "Outdoor" }
      ];
    // Setting default values for slide bars
    let default_intensity = null;
    intensities.map((intensity, index) => {
      if (this.state.intensity == intensity.value) {
        default_intensity = index;
      }
    });
    let default_venue = null;
    venues.map((venue, index) => {
      if (this.state.venue == venue.value) {
        default_venue = index;
      }
    });
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Edit Event</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Event name */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Event name *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View ref={this.title} style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChange.bind(this, 'title')}
                onEndEditing={this.showError.bind(
                  this,
                  this.state.title,
                  this.title,
                  "errorTitle"
                )}
              >
              {this.state.title}
              </TextInput>
            </View>
          </View>
          {this.state.errorTitle}

          {/* Date */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Date *</Text>
            </View>
            <View ref={this.date} style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                style={{ width: "100%" }}
                mode="date"
                showIcon={false}
                date={this.state.date}
                
                format="ddd, MMM D"
                minDate={new Date()} // why was this commented out????? @eivenlour
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{}}
                onDateChange={this.onChange.bind(this, 'date')}
              />
            </View>
          </View>
          {this.state.errorDate}

          {/* Start time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Start time *</Text>
            </View>
            <View ref={this.startTime} style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                style={{ width: "100%" }}
                date={this.state.startTime}
                mode="time"
                showIcon={false}
                placeholder="Select start time"
                format="hh:mma"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  placeholderText: {
                    alignItems: "center"
                  }
                }}
                onDateChange={this.onChange.bind(this, 'startTime')}
              />
            </View>
          </View>
          {this.state.errorStartTime}

          {/* End time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>End time *</Text>
            </View>
            <View ref={this.endTime} style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                style={{ width: "100%" }}
                date={this.state.endTime}
                mode="time"
                showIcon={false}
                placeholder="Select end time"
                format="hh:mma"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  placeholderText: {
                    alignItems: "center"
                  }
                }}
                onDateChange={this.checkEndDate.bind(this, 'endTime')}
              />
            </View>
          </View>
          {this.state.errorEndTime}


          {/* Description */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Description *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formDescriptionInput}
                multiline={true}
                numberOfLines={4}
                maxLength={140}
                onChangeText={this.onChange.bind(this, 'description')}
              >
              {this.state.description}
              </TextInput>
            </View>
          </View>

          {/* Intensity */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Intensity *</Text>
            </View>
          </View>
          <View style={styles.controls}>
            <SwitchSelector
              options={intensities}
              initial={default_intensity}
              onPress={this.onChange.bind(this, 'intensity')}
              textColor={"#A680B8"} //'#7a44cf'
              selectedColor={"#ffffff"}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              hasPadding
            />
          </View>

          {/* Venue */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Type of venue *</Text>
            </View>
          </View>
          <View style={styles.controls}>
            <SwitchSelector
              options={venues}
              initial={default_venue}
              onPress={this.onChange.bind(this, 'venue')}
              textColor={"#A680B8"} //'#7a44cf'
              selectedColor={"#ffffff"}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              hasPadding
            />
          </View>

          {/* Location */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Location
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View ref={this.location} style={ScreenStyleSheet.formRowInfo}>
            <GooglePlacesAutocomplete
            placeholder={this.state.location.streetName ? this.state.location.streetName : 'Add a Location'}
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'}
            keyboardAppearance={'light'}
            // Exit search dropdown results when result selected
            listViewDisplayed={false}
            fetchDetails={true}
            renderDescription={row => row.description}
            onPress={(data, details = null) => {
              this.setState({
                location: {
                  streetName: details.name,
                  lat: details.geometry.location.lat,
                  long: details.geometry.location.lng
                }
              });
            }}
            getDefaultValue={() => ''}
            query={{
              key: 'AIzaSyDvhU6eGVtP6KZX90_CNSiaO5gQG7gRRw0',
              language: 'en',
              types: 'geocode',
              // Unique token for a session of searching
              sessionToken: Math.random().toString(36).substr(2, 5)
            }}
            styles={{
              textInputContainer: {
                width: '100%'
              },
              description: {
                fontWeight: 'bold'
              }
            }}
            // Time in ms of when to issue a request after the user stops typing
            debounce={800}
            /> 
            </View>
          </View>
          {this.state.errorLocation}

          {/* Options */}
          <View style={ScreenStyleSheet.rowContainer}>
            {/* Cancel button */}
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { borderWidth: 1, borderColor: "black" }
              ]}
              onPress={this.onCancel}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            {/* Finish button */}
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#A680B8" }]}
              onPress={this.onFinish}
            >
              <Text style={{ color: "white" }}>Finish</Text>
            </TouchableOpacity>
          </View>
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
    { editEvent, sendNotification }
)(EditEventScreen);

// Styles
const styles = StyleSheet.create({
  controls: {
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  buttonContainer: {
    marginVertical: 10,
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 10
  },
  searchButton: {
    marginVertical: 10,
    marginBottom: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 10
  }
});
