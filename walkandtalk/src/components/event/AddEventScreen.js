// Create Event Screen View
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Body,
  Title,
  Content,
} from "native-base";
import SwitchSelector from "react-native-switch-selector";
import DatePicker from "react-native-datepicker";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { createEvent } from "../../actions/EventActions";
import { Actions } from "react-native-router-flux";
import RNGooglePlaces from 'react-native-google-places';
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
      title: null,
      description: null,
      date: null,
      startTime: null,
      endTime: null,
      //default values for intensity and venue
      intensity: "Slow",
      venue: "Indoor",
      location: null,
      lat: null,
      long: null
    };
  }

  onChangeTitle = text => {
    this.setState({
      title: text
    });
  };

  onChangeDescription = text => {
    this.setState({
      description: text
    });
  };

  setIntensity(selectedOption) {
    this.setState({
      intensity: selectedOption
    });
  }

  setVenue(selectedOption) {
    this.setState({
      venue: selectedOption
    });
  }


  onFinish = () => {
    console.log("we are here!");
    console.log("event: ", this.state)
    this.props.createEvent(
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
  };

  onCancel = () => {
    Actions.home();
  };

  // Google places search with autocomplete

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal({ 
      // Restricting autofill results to alberta to limit requests
      locationRestriction: {
        latitudeSW: 48.9966667, 
        longitudeSW: -120.0013835, 
        latitudeNE: 60.0004216, 
        longitudeNE: -110.0047639
      },
      // Renders search on current page rather than new page
      useOverlay: true,
      country: 'CA',
      // limiting search results to coordinates and name
      }, ['location', 'address']
    )
    .then((place) => {
      this.setState({
        location: place.address,
        lat: place.location.latitude,
        long: place.location.longitude
      });
    })
    .catch(error => console.log(error.message));
  }

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
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChangeTitle}
                accessibilityLabel="createEventName"
              />
            </View>
          </View>

          {/* Date */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Date
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
            <View style={ScreenStyleSheet.formRowInfo}>
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
                onDateChange={date => {
                  this.setState({ date: date });
                }}
                accessibilityLabel="createEventDatePicker"
              />
            </View>
          </View>

          {/* Start time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Start time
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
            <View style={ScreenStyleSheet.formRowInfo}>
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
                onDateChange={date => {
                  this.setState({ startTime: date });
                }}
                accessibilityLabel="createEventStartTimePicker"
              />
            </View>
          </View>

          {/* End time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                End time
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
            <View style={ScreenStyleSheet.formRowInfo}>
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
                onDateChange={date => {
                  this.setState({ endTime: date });
                }}
                accessibilityLabel="createEventEndTimePicker"
              />
            </View>
          </View>

          {/* Description */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Description
              </Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formDescriptionInput}
                multiline={true}
                numberOfLines={4}
                maxLength={140}
                onChangeText={this.onChangeDescription}
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
              onPress={value => this.setIntensity(value)}
              textColor={"#A680B8"} //'#7a44cf'
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
              onPress={value => this.setVenue(value)}
              textColor={"#A680B8"} //'#7a44cf'
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
            <View style={ScreenStyleSheet.formRowInfo}>
              <TouchableOpacity
                style={[
                  styles.searchButton,
                  { borderWidth: 1, borderColor: "black" }
                ]}
                onPress={() => this.openSearchModal()}
                accessibilityLabel="createEventLocation"
              >
              <Text>{this.state.location ? this.state.location : "Add a Location"}</Text>
              </TouchableOpacity>
            </View>
          </View>

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
              onPress={(this.onFinish)}
              accessibilityLabel="createEventFinish"
            >
              <Text style={{ color: "white" }}>Submit</Text>
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
