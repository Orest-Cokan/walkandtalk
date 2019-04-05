// Create Event Screen View
import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { Container, Header, Body, Title, Content } from "native-base";
import SwitchSelector from "react-native-switch-selector";
import DatePicker from "react-native-datepicker";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { createEvent } from "../../actions/EventActions";
import { Actions } from "react-native-router-flux";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import {
  StyledText as Text,
  StyledTextInput as TextInput
} from "../../constants/StyledText";

class AddEventScreen extends Component {
  constructor(props) {
    super(props);
    // State
    this.state = {
      organizer: this.props.user.user.fullname,
      email: this.props.user.user.email,

      // Editable fields
      title: null,
      description: "", // initialized as an empty string for now, as it is optional and should be allowed to be null
      date: null,
      startTime: null,
      endTime: null,
      intensity: "Slow",
      venue: "Indoor",
      location: null,
      lat: null,
      long: null,

      // Error messages
      errorTitle: null,
      errorDate: null,
      errorStartTime: null,
      errorEndTime: null,
      errorLocation: null
    };

    // Component refs
    this.title = React.createRef();
    this.date = React.createRef();
    this.startTime = React.createRef();
    this.endTime = React.createRef();
    this.location = React.createRef();
  }

  // Set state
  onChange(name, value) {
    this.setState({ [name]: value });
    // For datetime pickers
    if (name == "date") {
      this.showError(this.state.date, this.date, "errorDate");
    }
    if (name == "startTime") {
      this.showError(this.state.startTime, this.startTime, "errorStartTime");
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
          });
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

  // When finish button is clicked
  onFinish = async () => {
    if (this.inputCheck()) {
      await this.props.createEvent(
        this.props.user.token,
        this.state.organizer,
        this.state.email,
        this.state.title,
        this.state.date,
        this.state.startTime,
        this.state.endTime,
        this.state.description,
        this.state.intensity,
        this.state.venue,
        this.state.location,
        this.state.lat,
        this.state.long
      );
    } else {
      Alert.alert("You must fill in all required fields.");
    }
  };

  // When cancel button is clicked
  onCancel = () => {
    Actions.home();
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

    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Create Event</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Event name */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Event name
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View ref={this.title} style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChange.bind(this, "title")}
                onEndEditing={this.showError.bind(
                  this,
                  this.state.title,
                  this.title,
                  "errorTitle"
                )}
                accessibilityLabel="createEventName"
              />
            </View>
          </View>
          {this.state.errorTitle}

          {/* Date */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Date
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
            <View ref={this.date} style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                style={{ width: "100%" }}
                date={this.state.date}
                mode="date"
                showIcon={false}
                placeholder="Select date"
                format="ddd, MMM D"
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{}}
                onDateChange={this.onChange.bind(this, "date")}
                accessibilityLabel="createEventDatePicker"
              />
            </View>
          </View>
          {this.state.errorDate}

          {/* Start time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Start time
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
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
                onDateChange={this.onChange.bind(this, "startTime")}
                accessibilityLabel="createEventStartTimePicker"
              />
            </View>
          </View>
          {this.state.errorStartTime}

          {/* End time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                End time
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
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
                onDateChange={this.onChange.bind(this, "endTime")}
                accessibilityLabel="createEventEndTimePicker"
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
                onChangeText={this.onChange.bind(this, "description")}
                accessibilityLabel="createEventDescription"
              />
            </View>
          </View>

          {/* Intensity */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Intensity
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <SwitchSelector
              options={intensities}
              initial={0}
              onPress={this.onChange.bind(this, "intensity")}
              textColor={"#A680B8"}
              selectedColor={"#ffffff"}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              hasPadding
              accessibilityLabel="createEventIntensity"
            />
          </View>

          {/* Venue */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Type of venue
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <SwitchSelector
              options={venues}
              initial={0}
              onPress={this.onChange.bind(this, "venue")}
              textColor={"#A680B8"}
              selectedColor={"#ffffff"}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              hasPadding
              accessibilityLabel="createEventVenue"
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
            placeholder='Add a Location'
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
                location: details.name,
                lat: details.geometry.location.lat,
                long: details.geometry.location.lng
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
                { borderWidth: 1, borderColor: "#A680B8" }
              ]}
              onPress={this.onCancel}
              accessibilityLabel="createEventCancel"
            >
              <Text style={{ color: "#A680B8" }}>Cancel</Text>
            </TouchableOpacity>

            {/* Finish button */}
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#A680B8" }]}
              onPress={this.onFinish}
              accessibilityLabel="createEventFinish"
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
  { createEvent }
)(AddEventScreen);

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
  locationButton: {
    marginBottom: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderColor: "#AAA",
    borderWidth: 1
  }
});
