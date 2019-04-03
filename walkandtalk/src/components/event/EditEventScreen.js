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
import { sendNotification } from "../../actions/NotificationActions";
import { Actions } from "react-native-router-flux";
import RNGooglePlaces from "react-native-google-places";

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
      notifType: 'updatedEvent'
    }
  }

  onChange(name, value) {
    this.setState({ [name] : value } )
  }
  
  // Has to be asynchronous in case edit finishes before 
  // fetching which will cause state not to be updated
  onFinish = async () => {
    await new Promise((resolve, reject) => {
        // Edit the event user clicks
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
        this.props.sendNotification(
          this.state.id,
          this.state.title,
          this.state.notifType
        )  
        resolve();
        Actions.homeTab();
    });
  }
  onCancel = () => {
    Actions.homeTab();
  };

  // Google places search with autocomplete
  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal(
      {
        // Restricting autofill results to alberta to limit requests
        locationRestriction: {
          latitudeSW: 48.9966667,
          longitudeSW: -120.0013835,
          latitudeNE: 60.0004216,
          longitudeNE: -110.0047639
        },
        // Renders search on current page rather than new page
        useOverlay: true,
        country: "CA"
        // limiting search results to coordinates and name
      },
      ["location", "address"]
    )
      .then(place => {
        console.log('PLACE',place);
        console.log(this.state.location);
        const updatedLocation = {
          streetName: place.address,
          lat: place.location.latitude,
          long: place.location.longitude
        }
        console.log(updatedLocation);
        onChange('location', updatedLocation);
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
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChange.bind(this, 'title')}
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
                onDateChange={this.onChange.bind(this, 'date')}
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
                onDateChange={this.onChange.bind(this, 'startTime')}
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
                onDateChange={this.onChange.bind(this, 'endTime')}
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
                onChangeText={this.onChange.bind(this, 'description')}
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
              <Text style={ScreenStyleSheet.formInfo}>Type of venue</Text>
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
              <Text style={ScreenStyleSheet.formInfo}>Location *</Text>
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
              >
                <Text>
                  {this.state.location.streetName}
                </Text>
              </TouchableOpacity>
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
      user: state.user
    };
  };

export default connect(
    mapStateToProps,
    { fetchEvents, editEvent, sendNotification }
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
