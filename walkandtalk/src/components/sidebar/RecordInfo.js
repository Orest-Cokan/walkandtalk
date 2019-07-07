import React from "react";
import { View, TouchableOpacity } from "react-native";
import { StyledText as Text } from "../../constants/StyledText";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import SwitchSelector from "react-native-switch-selector";
import { Actions } from "react-native-router-flux";

class RecordInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  // For numeric input fields
  requiredFunc() {
    console.log();
  }

  onFill() {
    Actions.submitRecord({ record: this.props.record });
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
      if (this.props.record.intensity == intensity.value) {
        default_intensity = index;
      }
    });
    let default_venue = null;
    venues.map((venue, index) => {
      if (this.props.record.venue == venue.value) {
        default_venue = index;
      }
    });
    let default_walkRating = null;
    walkRatings.map((walkRating, index) => {
      if (this.props.record.walkRating == walkRating.value) {
        default_walkRating = index;
      }
    });
    let default_locationRating = null;
    locationRatings.map((locationRating, index) => {
      if (this.props.record.locationRating == locationRating.value) {
        default_locationRating = index;
      }
    });

    if (this.props.record.completed == 1) {
      return (
        <View>
          {/* Distance */}
          <View style={[ScreenStyleSheet.rowContainer, { marginBottom: 10 }]}>
            <Text style={ScreenStyleSheet.profileInfo}>
              Length of Walk (by distance)
              <Text style={ScreenStyleSheet.asterisk}> *</Text>
            </Text>
            <Text>{this.props.record.distance} km</Text>
          </View>
          {/* Duration */}
          <View style={[ScreenStyleSheet.rowContainer, { marginBottom: 10 }]}>
            <Text style={ScreenStyleSheet.profileInfo}>
              Length of Walk (by duration)
              <Text style={ScreenStyleSheet.asterisk}> *</Text>
            </Text>
            <Text>{this.props.record.duration} min</Text>
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
              textColor={"#CDCDCD"}
              selectedColor={"#ffffff"}
              buttonColor={"#CDCDCD"}
              borderColor={"#CDCDCD"}
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
              textColor={"#CDCDCD"} //'#7a44cf'
              selectedColor={"#ffffff"}
              buttonColor={"#CDCDCD"}
              borderColor={"#CDCDCD"}
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
              buttonColor={"#CDCDCD"}
              borderColor={"#CDCDCD"}
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
              buttonColor={"#CDCDCD"}
              borderColor={"#CDCDCD"}
              borderRadius={8}
              height={70}
              imageStyle={{ tintColor: null, height: 40, width: 40 }}
              hasPadding
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={ScreenStyleSheet.formRowInfo}>
          <TouchableOpacity
            style={[
              ScreenStyleSheet.button,
              { backgroundColor: "#A680B8", width: "100%" }
            ]}
            onPress={this.onFill.bind(this)}
          >
            <Text style={{ color: "white" }}>FILL IN RECORD</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

export { RecordInfo };
