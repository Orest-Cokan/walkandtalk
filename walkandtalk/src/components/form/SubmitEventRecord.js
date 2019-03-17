// Submit Event Record Screen View
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
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
import { SegmentedControls } from "react-native-radio-buttons";
import SwitchSelector from "react-native-switch-selector";
import DatePicker from "react-native-datepicker";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { createEvent } from "../../actions/EventActions";
import NumericInput from 'react-native-numeric-input';
import { Actions } from "react-native-router-flux";
import { width, height, totalSize } from 'react-native-dimension';


class SubmitEventRecordScreen extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      organizer: this.props.user.user.fullname,
      title: null,
      description: null,
      date: null,
      startTime: null,
      endTime: null,
      location: null,
      numAttendees: null,
      //user input needed
      duration: 0,
      distance: 0,
      intensity: "Slow",
      venue: "Indoor",
      walkRating: "1",
      locationRating: "1",
      walkRatingComment: null,
      locationRatingComment: null,
    };
  }

  onChangeDuration(value) {
    this.setState({
      duration: value
    });
  };

  onChangeDistance(value) {
    this.setState({
      distance: value
    });
  };

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

  onSubmit = () => {
    console.log(this.state.duration);
    console.log(this.state.intensity);
    console.log(this.state.venue);
    console.log(this.state.walkRating);
    console.log(this.state.locationRating);
  }

  onFinish = () => {
    console.log("we are here!");
    this.props.createEvent(
      this.state.organizer,
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
      { label: "Indoor", value: "Indoor"},
      { label: "Outdoor", value: "Outdoor" },
    ];
    const walkRatings = [
      { label: "", value: "1", imageIcon: require("../../assets/icons/dislike.png")  },
      { label: "", value: "2", imageIcon: require("../../assets/icons/indifferent.png")  },
      { label: "", value: "3", imageIcon: require("../../assets/icons/like.png")  },
    ];

    const locationRatings = [
      { value: "1", imageIcon: require("../../assets/icons/dislike.png")  },
      { value: "2", imageIcon: require("../../assets/icons/indifferent.png")  },
      { value: "3", imageIcon: require("../../assets/icons/like.png")  },
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
            <Title style={ScreenStyleSheet.headerTitle}>Event Name</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
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
              onChange={(value) => this.onChangeDistance(value)}
              totalWidth={width(94)}
              totalHeight={40}
              valueType='real'
              rounded
              borderColor="#A680B8"
              textColor="#A680B8"
              inputStyle={{borderRadius: 3, borderColor: "transparent"}}
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
              onChange={(value) => this.onChangeDuration(value)}
              totalWidth={width(94)}
              totalHeight={40}
              valueType='real'
              rounded
              borderColor="#A680B8"
              textColor="#A680B8"
              inputStyle={{borderRadius: 3, borderColor: "transparent"}}
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
          {/* React-Native radio button as multi option button */}
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
                Type of Venue
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          {/* React-Native radio button as multi option button */}
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
             imageStyle={{tintColor:null, height: 40, width: 40}}
             hasPadding
           />
          </View>
          {/* Comments about the walk */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Comments about the walk:</Text>
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
             imageStyle={{tintColor:null, height: 40, width: 40}}
             hasPadding
           />
          </View>
          {/* Comments about the location */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Comments about the location:</Text>
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
                { borderWidth: 1, borderColor: "black" }
              ]}
              onPress={this.onCancel}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            {/* Finish button */}
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#A680B8" }]}
              onPress={this.onSubmit}
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
  //{ createEvent }
)(SubmitEventRecordScreen);

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
  },
});
