// Submit Event Record Screen View

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Image
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
} from "native-base";
import SwitchSelector from "react-native-switch-selector";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { updateRecord } from "../../actions/RecordActions";
import NumericInput from "react-native-numeric-input";
import { Actions } from "react-native-router-flux";
import { width } from "react-native-dimension";
import {
  StyledText as Text,
  StyledTextInput as TextInput
} from "../../constants/StyledText";

class SubmitRecordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Event record uneditable details
      id: this.props.record.id,
      organizer: this.props.record.organizer,
      fullname: this.props.record.fullname,
      title: this.props.record.title,
      email: this.props.record.email,
      date: this.props.record.date,
      startTime: this.props.record.start_time,
      initialIntensity: this.props.record.intensity,
      endTime: this.props.record.end_time,
      location: this.props.record.location,
      numAttendees: this.props.record.total_attendees,
      completed: 1,

      // Editable fields
      duration: 0,
      distance: 0,
      intensity: "Slow",
      venue: "Indoor",
      walkRating: "1",
      locationRating: "1",
      walkRatingComment: '',
      locationRatingComment: ''
    };
  }

  // Set state
  onChange(name, value) {
    this.setState({ [name] : value });
  };

  // When submit button is tapped
  onSubmit = () => {
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
      this.state.completed,
    );
    Actions.mainFormPage();
  };

  // When cancel button is tapped
  onCancel = () => {
    Actions.mainFormPage();
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

          {/* Date and time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.eventTimeInfo}>
                {this.state.date.toUpperCase()} {" AT "}
                {this.state.startTime.toUpperCase()} {" - "}
                {this.state.endTime.toUpperCase()}
              </Text>
            </View>
          </View>
          {/* Title */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.eventTitleInfo}>
                {this.state.title}
              </Text>
            </View>
          </View>
          {/* Intensity */}
          <View style={ScreenStyleSheet.rowContainer}>
            <Image
              style={ScreenStyleSheet.iconByInfo}
              source={require("../../assets/icons/walk.png")}
            />
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.infoByIcon}>
                {this.state.initialIntensity}
              </Text>
            </View>
          </View>
          {/* Location */}
          <View style={ScreenStyleSheet.rowContainer}>
            <Image
              style={ScreenStyleSheet.iconByInfo}
              source={require("../../assets/icons/pin.png")}
            />
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.infoByIcon}>
                {this.state.location}
              </Text>
            </View>
          </View>
          {/* Organizer */}
          <View style={ScreenStyleSheet.rowContainer}>
            <Image
              style={ScreenStyleSheet.iconByInfo}
              source={require("../../assets/icons/default-profile.png")}
            />
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.infoByIcon}>
                {this.state.organizer}
              </Text>
            </View>
          </View>
          {/* Number of attendees */}
          <View style={ScreenStyleSheet.rowContainer}>
            <Image
              style={ScreenStyleSheet.iconByInfo}
              source={require("../../assets/icons/user-group.png")}
            />
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.numAttendees}>
                {this.state.numAttendees} people
                <Text> attended this event.</Text>
              </Text>
            </View>
          </View>
          
          
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
          <View style={ScreenStyleSheet.slideBar}>
            <NumericInput
              initValue={this.state.distance}
              value={this.state.distance}
              minValue={0}
              onChange={this.onChange.bind(this, 'distance')}
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
          <View style={ScreenStyleSheet.slideBar}>
            <NumericInput
              initValue={this.state.duration}
              value={this.state.duration}
              minValue={0}
              onChange={this.onChange.bind(this, 'duration')}
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
          <View style={ScreenStyleSheet.slideBar}>
            <SwitchSelector
              options={intensities}
              initial={0}
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
              <Text style={ScreenStyleSheet.formInfo}>
                Type of venue
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.slideBar}>
            <SwitchSelector
              options={venues}
              initial={0}
              onPress={this.onChange.bind(this, 'venue')}
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
          <View style={ScreenStyleSheet.slideBar}>
            <SwitchSelector
              options={walkRatings}
              initial={0}
              onPress={this.onChange.bind(this, 'walkRating')}
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
                onChangeText={this.onChange.bind(this, 'walkRatingComment')}
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
          <View style={ScreenStyleSheet.slideBar}>
            <SwitchSelector
              options={locationRatings}
              initial={0}
              onPress={this.onChange.bind(this, 'locationRating')}
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
                onChangeText={this.onChange.bind(this, 'locationRatingComment')}
              />
            </View>
          </View>

          {/* Options */}
          <View style={ScreenStyleSheet.rowContainer}>
            {/* Cancel button */}
            <TouchableOpacity
              style={[
                ScreenStyleSheet.button,
                { borderWidth: 1, borderColor: "#A680B8" }
              ]}
              onPress={this.onCancel}
            >
              <Text style={{ color: "#A680B8" }}>Cancel</Text>
            </TouchableOpacity>

            {/* Finish button */}
            <TouchableOpacity
              style={[ScreenStyleSheet.button, { backgroundColor: "#A680B8" }]}
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { updateRecord }
)(SubmitRecordScreen);
