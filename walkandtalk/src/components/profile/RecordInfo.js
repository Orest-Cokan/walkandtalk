import React from "react";
import { View } from "react-native";
import { StyledText as Text } from "../../constants/StyledText";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { width } from "react-native-dimension";
import NumericInput from "react-native-numeric-input";
import SwitchSelector from "react-native-switch-selector";


class RecordInfo extends React.Component {

  // For numeric input fields
  requiredFunc() {
    console.log();
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

    // Setting default values for slide bars
    let default_intensity = null;
    intensities.map((intensity, index) => {
      if (this.props.intensity == intensity.value) {
        default_intensity = index;
      }
    });
    let default_venue = null;
    venues.map((venue, index) => {
      if (this.props.venue == venue.value) {
        default_venue = index;
      }
    });
    let default_walkRating = null;
    walkRatings.map((walkRating, index) => {
      if (this.props.walkRating == walkRating.value) {
        default_walkRating = index;
      }
    });
    let default_locationRating = null;
    locationRatings.map((locationRating, index) => {
      if (this.props.locationRating == locationRating.value) {
        default_locationRating = index;
      }
    });

    
    if (this.props.isComplete == 1) {
      return ( 
        <View>
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
              initValue={this.props.distance}
              value={this.props.distance}
              onChange={this.requiredFunc.bind(this)}
              editable={false}
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
              initValue={this.props.duration}
              value={this.props.duration}
              onChange={this.requiredFunc.bind(this)}
              editable={false}
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
              disabled={true}
              initial={default_intensity}
              textColor={"#A680B8"}
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
              disabled={true}
              initial={default_venue}
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
              disabled={true}
              initial={default_walkRating}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              height={70}
              imageStyle={{ tintColor: null, height: 40, width: 40 }}
              hasPadding
            />
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
              disabled={true}
              initial={default_locationRating}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              height={70}
              imageStyle={{ tintColor: null, height: 40, width: 40 }}
              hasPadding
            />
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

export { RecordInfo };