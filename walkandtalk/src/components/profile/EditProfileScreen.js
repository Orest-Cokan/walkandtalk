import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView
} from "react-native";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content
} from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { editUser } from "../../actions/UserActions";
import DatePicker from "react-native-datepicker";
import SwitchSelector from "react-native-switch-selector";
import NumericInput from "react-native-numeric-input";
import ImagePicker from 'react-native-image-picker';
import { width, height, totalSize } from "react-native-dimension";
import {
  StyledText as Text,
  StyledTextInput as TextInput
} from "../../constants/StyledText";

class EditProfileScreen extends Component {
  // Constructor
  constructor(props) {
    super(props);

    console.log('editprofile props', this.props);
    this.state = {
      fullname: this.props.user.user.fullname,
      email: this.props.user.user.email,
      picture: this.props.user.user.picture,
      dob: this.props.user.user.dob,
      menopausal_stage: this.props.user.user.menopausal_stage,
      intensity: this.props.user.user.preference.intensity,
      distance: this.props.user.user.preference.distance,
      duration: this.props.user.user.preference.duration,
      venue: this.props.user.user.preference.venue,
      location: this.props.user.user.preference.location
    };
  }
  onChangeFullName = text => {
    this.setState({
      fullname: text
    });
  };

  onChangeDuration(value) {
    this.setState({
      duration: value
    });
  }

  onChangeDistance(value) {
    this.setState({
      distance: value
    });
  }

  setIntensity(value) {
    this.setState({
      intensity: value
    });
  }
  setMenopauseStage(value) {
    this.setState({
      menopausal_stage: value
    });
  }

  setVenue(value) {
    this.setState({
      venue: value
    });
  }

  onChangeLocation = text => {
    this.setState({
      location: text
    });
  };

  onCancel() {
    Actions.pop();
  }

  saveProfile = () => {
    console.log("state on save", this.state);
    this.props.editUser(
      this.state.fullname,
      this.state.email,
      this.state.picture,
      this.state.dob,
      this.state.menopausal_stage,
      this.state.intensity,
      this.state.distance,
      this.state.duration,
      this.state.venue,
      this.state.location
    );
    console.log("after save profile?");
    Actions.mainProfile();
  };

  addPicture = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = 'data:image/jpeg;base64,' + response.data;
        this.setState({
          picture: uri,
        });
      }
    });
  };

  render() {
    console.log('editrender',this.state)
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
    const menopausal_stage = [
      { label: "Pre", value: "Pre" },
      { label: "Peri", value: "Peri" },
      { label: "Post", value: "Post" }
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
    let default_menopausal_stage = null;
    menopausal_stage.map((stage, index) => {
      if (this.state.menopausal_stage == stage.value) {
        default_menopausal_stage = index;
        return default_menopausal_stage;
      }
    });

    // Screen
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Edit Profile</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          <View style={ScreenStyleSheet.profileHeader}>
            {/* Profile picture */}
            <TouchableHighlight onPress={this.addPicture} activeOpacity={0} underlayColor={'transparent'}>
              <Image
                style={ScreenStyleSheet.avatar}
                // source={this.state.picture ? {uri: this.state.picture} : require("../../assets/icons/default-profile.png")}
                source={require("../../assets/icons/default-profile.png")}
              />
            </TouchableHighlight>
          </View>

          {/* Full Name */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Full Name
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChangeFullName}
              >
                {this.state.fullname}
              </TextInput>
            </View>
          </View>

          {/* Email Address */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Email Address</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInputUneditable}
                editable={false}
              >
                {this.state.email}
              </TextInput>
            </View>
          </View>

          {/* On screen separator */}
          <View style={ScreenStyleSheet.lineSeparator} />

          {/* Info Header */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={styles.subHeader}>Basic Info</Text>
            </View>
          </View>

          {/* Date of Birth */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Date of Birth</Text>
            </View>
            <View style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                disabled={true}
                style={{ width: "100%" }}
                date={this.state.dob}
                mode="date"
                showIcon={false}
                placeholder={this.state.dob}
                format="MMM DD, YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  placeholderText: {
                    alignItems: "center",
                    color: "grey"
                  }
                }}
              />
            </View>
          </View>

          {/* Menopause Stage */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Menopause Stage
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <SwitchSelector
              options={menopausal_stage}
              initial={default_menopausal_stage}
              onPress={value => this.setMenopauseStage(value)}
              textColor={"#A680B8"} //'#7a44cf'
              selectedColor={"#ffffff"}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              hasPadding
            />
          </View>

          {/* On screen seperator */}
          <View style={ScreenStyleSheet.lineSeparator} />

          {/* Preferences header */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={styles.subHeader}>My Preferences</Text>
            </View>
          </View>

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
              <Text style={ScreenStyleSheet.formInfo}>Type of Venue</Text>
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
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChangeLocation}
              >
                {this.state.location}
              </TextInput>
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

            {/* Save button */}
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#A680B8" }]}
              onPress={this.saveProfile}
            >
              <Text style={{ color: "white" }}>Save changes</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("EditProfilescreen");
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { editUser }
)(EditProfileScreen);

// Styles
const styles = StyleSheet.create({
  subHeader: {
    fontSize: 18,
    color: "black",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "left"
  },
  controls: {
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  buttonContainer: {
    marginVertical: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 10
  }
});
