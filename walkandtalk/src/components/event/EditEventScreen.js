// Edit Event Screen View
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
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
import { editEvent, fetchEvents } from "../../actions/EventActions";
import { Actions } from "react-native-router-flux";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class EditEventScreen extends Component {
  constructor(props) {
    super(props);
    // Find event data for clicked event
    let event = this.props.events.find(e => e.id === this.props.data);
    console.log('THE PASSED EVENT',event)
    this.state = {
      title: event.title,
      id: event.id,
      description: event.description,
      date: event.date,
      startTime: event.start_time,
      endTime: event.end_time,
      intensity: event.intensity,
      venue: event.venue,
      location: event.location,
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
  
  // Has to be asynchronous in case edit finishes before 
  // fetching which will cause state not to be updated
  onFinish = async () => {
    await new Promise((resolve, reject) => {
          // Edit the event user clicks
          console.log("EVENT TO BE EDITED", this.state.location)
          this.props.editEvent(
            this.state.title, 
            this.state.id, 
            this.state.date, 
            this.state.startTime, 
            this.state.endTime, 
            this.state.description, 
            this.state.intensity, 
            this.state.venue, 
            this.state.location);
          resolve();
      });
      // fetch updated event(s) to pass to homescreen
      this.props.fetchEvents();
      Actions.home();
  }
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
    // Setting default values for slide bars
    let default_intensity = null;
    intensities.map((intensity, index) => {
      if (this.state.intensity == intensity.value) {
        default_intensity = index;
        return default_intensity;
      }
    });
    let default_venue = null;
    venues.map((venue, index) => {
      if (this.state.venue == venue.value) {
        default_venue = index;
        return default_venue;
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
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChangeTitle}
              >
              {this.state.title}
              </TextInput>
            </View>
          </View>
          {/* Date */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Date *</Text>
            </View>
            <View style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                style={{ width: "100%" }}
                date={this.state.date}
                mode="date"
                showIcon={false}
                placeholder="Select date"
                format="ddd, MMM D"
                minDate={new Date()} // why was this commented out????? @eivenlour
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{}}
                onDateChange={date => {
                  this.setState({ date: date });
                }}
              />
            </View>
          </View>
          {/* Start time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Start time *</Text>
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
              />
            </View>
          </View>
          {/* End time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>End time *</Text>
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
              />
            </View>
          </View>

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
                onChangeText={this.onChangeDescription}
              >
              {this.state.description}
              </TextInput>
            </View>
          </View>

          {/* Intensity */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Intensity</Text>
            </View>
          </View>
          <View style={styles.controls}>
            <SwitchSelector
              options={intensities}
              initial={default_intensity}
              onPress={value => this.setIntensity(value)}
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
              <Text style={ScreenStyleSheet.formInfo}>Type of venue</Text>
            </View>
          </View>
          <View style={styles.controls}>
            <SwitchSelector
              options={venues}
              initial={default_venue}
              onPress={value => this.setVenue(value)}
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
      events: state.event.events,
      user: state.user
    };
  };

export default connect(
    mapStateToProps,
    { fetchEvents, editEvent }
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
