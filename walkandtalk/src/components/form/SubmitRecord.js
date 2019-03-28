// Submit Event Record Screen View

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Alert,
  Image,
  Dimensions
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
import { updateRecord } from "../../actions/RecordActions";
import NumericInput from "react-native-numeric-input";
import { Actions } from "react-native-router-flux";
import { width, height, totalSize } from "react-native-dimension";
import {
  StyledText as Text,
  StyledTextInput as TextInput
} from "../../constants/StyledText";

class SubmitRecordScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    console.log(this.props.record);

    this.state = {
      // Event default details
      numAttendees: 3,

      // Event record uneditable details
      id: this.props.record.id,
      organizer: this.props.record.organizer,
      fullname: this.props.record.fullname,
      title: this.props.record.title,
      email: this.props.record.email,
      date: this.props.record.date,
      startTime: this.props.record.start_time,
      endTime: this.props.record.end_time,
      location: this.props.record.location,
      numAttendees: this.props.record.total_attendees,
      completed: this.props.record.completed,

      // User input needed
      duration: 0,
      distance: 0,
      intensity: "Slow",
      venue: "Indoor",
      walkRating: "1",
      locationRating: "1",
      walkRatingComment: null,
      locationRatingComment: null
    };
  }
  onChangeDistance(value) {
    this.setState({
      distance: value
    });
  }

  onChangeDuration(value) {
    this.setState({
      duration: value
    });
  }

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

  setWalkRating(selectedOption) {
    this.setState({
      walkRating: selectedOption
    });
  }

  setLocationRating(selectedOption) {
    this.setState({
      locationRating: selectedOption
    });
  }

  onChangeWalkRatingComment = text => {
    this.setState({
      walkRatingComment: text
    });
  };

  onChangeLocationRatingComment = text => {
    this.setState({
      locationRatingComment: text
    });
  };

  changeHandler(value) {
      this.setState({ completed: value}, () =>
      console.log(this.state.completed));
   }

  onSubmit = () => {
    console.log("state", this.state);
    console.log("props", this.props);
    this.props.updateRecord(
      this.state.id,
      this.state.email,
      this.state.venue,
      this.state.distance,
      this.state.duration,
      this.state.intensity,
      this.state.walkRating,
      this.state.walkRatingComment,
      this.state.locationRating,
      this.state.locationRatingComment,
      1
      //this.state.completed, tried everything, will fix later
    );
    console.log("update", this.props);
    Actions.mainFormPage();
  };

  onCancel = () => {
    Actions.pop();
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
    const walkRatings = [
      { value: "1", imageIcon: require("../../assets/icons/dislike.png") },
      { value: "2", imageIcon: require("../../assets/icons/indifferent.png") },
      { value: "3", imageIcon: require("../../assets/icons/like.png") }
    ];
    const locationRatings = [
      { value: "1", imageIcon: require("../../assets/icons/dislike.png") },
      { value: "2", imageIcon: require("../../assets/icons/indifferent.png") },
      { value: "3", imageIcon: require("../../assets/icons/like.png") }
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
            <Title style={ScreenStyleSheet.headerTitle}>
              {this.state.title}
            </Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Event info */}
          <Text>
            {this.state.date.toUpperCase()} AT{" "}
            {this.state.startTime.toUpperCase()}
          </Text>
          <Text>{this.state.title}</Text>
          <Text>{this.state.location}</Text>
          <Text>{this.state.organizer}</Text>
          <Text>{this.state.numAttendees} people attended this event.</Text>

          {/* On screen separator */}
          <View style={ScreenStyleSheet.lineSeparator} />

          {/* Distance */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Length of walk (in kilometres)
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <NumericInput
              initValue={this.state.distance}
              value={this.state.distance}
              minValue={0}
              onChange={value => this.onChangeDistance(value)}
              totalWidth={width(94)}
              totalHeight={40}
              valueType="real"
              rounded
              borderColor="#A680B8"
              textColor="#A680B8"
              inputStyle={{ borderRadius: 3, borderColor: "transparent" }}
              iconStyle={{ color: "#A680B8" }}
              rightButtonBackgroundColor="white"
              leftButtonBackgroundColor="white"
            />
          </View>

          {/* Duration */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Length of walk (in minutes)
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <NumericInput
              initValue={this.state.duration}
              value={this.state.duration}
              minValue={0}
              onChange={value => this.onChangeDuration(value)}
              totalWidth={width(94)}
              totalHeight={40}
              valueType="real"
              rounded
              borderColor="#A680B8"
              textColor="#A680B8"
              inputStyle={{ borderRadius: 3, borderColor: "transparent" }}
              iconStyle={{ color: "#A680B8" }}
              rightButtonBackgroundColor="white"
              leftButtonBackgroundColor="white"
            />
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
            />
          </View>

          {/* Rate the walk */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                How did you like the walk?
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <SwitchSelector
              options={walkRatings}
              initial={0}
              onPress={value => this.setWalkRating(value)}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              height={70}
              imageStyle={{ tintColor: null, height: 40, width: 40 }}
              hasPadding
            />
          </View>

          {/* Comments about the walk */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Comments about the walk:
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
                onChangeText={this.onChangeWalkRatingComment}
              />
            </View>
          </View>

          {/* Rate the location */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                How did you like the location?
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <SwitchSelector
              options={locationRatings}
              initial={0}
              onPress={value => this.setLocationRating(value)}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              height={70}
              imageStyle={{ tintColor: null, height: 40, width: 40 }}
              hasPadding
            />
          </View>

          {/* Comments about the location */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Comments about the location:
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
                onChangeText={this.onChangeLocationRatingComment}
              />
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
            >
              <Text style={{ color: "#A680B8" }}>Cancel</Text>
            </TouchableOpacity>

            {/* Finish button */}
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#A680B8" }]}
              onPress={(this.onSubmit)}
            >
              <Text style={{ color: "white" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}
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

  nestedButtonView: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 5
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { updateRecord }
)(SubmitRecordScreen);
