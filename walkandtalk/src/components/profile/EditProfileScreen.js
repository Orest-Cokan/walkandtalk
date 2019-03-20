import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
import { SegmentedControls } from "react-native-radio-buttons";
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

class EditProfileScreen extends Component {
  // Constructor
  constructor(props) {
    super(props);

    console.log(this.props);
    this.state = {
      fullname: this.props.user.user.fullname,
      email: this.props.user.user.email,
      dob: this.props.user.user.dob,
      menopausal_stage: this.props.user.user.menopausal_stage,
      intensity: this.props.user.user.intensity,
      distance: this.props.user.user.distance,
      duration: this.props.user.user.duration,
      venue: this.props.user.user.venue,
      location: this.props.user.user.location
    };
  }

  onChangeFullName = text => {
    this.setState({
      fullname: text
    });
  };

  onChangeDuration = text => {
    this.setState({
      duration: text
    });
  };

  onChangeDistance = text => {
    this.setState({
      distance: text
    });
  };

  onChangeLocation = text => {
    this.setState({
      location: text
    });
  };

  setMenopausalStage(selectedOption) {
    this.setState({
      menopausal_stage: selectedOption
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

  cancelEdit() {
    Actions.pop();
  }

  saveProfile = () => {
    console.log("state on save", this.state);
    this.props.editUser(
      this.state.fullname,
      this.state.email,
      this.state.dob,
      this.state.menopausal_stage,
      this.state.intensity,
      this.state.distance,
      this.state.duration,
      this.state.venue,
      this.state.location
    );
    console.log("props on save", this.props);
    Actions.Profile();
  };

  render() {
    // All the options displayed in radio buttons
    const intensities = ["Slow", "Intermediate", "Brisk"];
    const venues = ["Indoor", "Outdoor"];
    const menoStages = ["Pre", "Peri", "Post"];

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
            <Image
              style={ScreenStyleSheet.avatar}
              source={require("../../assets/icons/default-profile.png")}
            />
            {/* Add + for changing profile picture */}
          </View>
          {/* Name */}
          <View style={styles.nestedButtonView}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Fullname *</Text>
            </View>
            <View>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChangeFullName}
              >
                {this.state.fullname}
              </TextInput>
            </View>
          </View>

          {/* Email */}
          <View style={styles.nestedButtonView}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Email address</Text>
            </View>
            <View>
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
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileSectionTitle}>
                Basic Info
              </Text>
            </View>
          </View>
          {/* Date of birth */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Date of Birth</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <TextInput
                style={ScreenStyleSheet.profileInputUneditable}
                editable={false}
              >
                {this.state.dob}
              </TextInput>
            </View>
          </View>
          {/* Menopausal Stage */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>
                Menopausal Stage *
              </Text>
            </View>
          </View>
          {/* React-Native radio button as multi option button */}
          <View style={styles.segmentedControls}>
            <SegmentedControls
              tint={"#A680B8"}
              backTint={"#ffffff"}
              optionStyle={{ fontFamily: "AvenirNext-Medium" }}
              selectedOption={this.state.menopausal_stage}
              onSelection={this.setMenopausalStage.bind(this)}
              optionContainerStyle={{
                flex: 1,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2
              }}
              options={menoStages}
            />
          </View>

          {/* On screen seperator */}
          <View style={ScreenStyleSheet.lineSeparator} />

          {/* Preferences header */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileSectionTitle}>
                My Preferences
              </Text>
            </View>
          </View>

          {/* Distance */}
          <View style={styles.nestedButtonView}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Length of distance (in km) *
              </Text>
            </View>
            <View>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChangeDistance}
              >
                {this.state.distance}
              </TextInput>
            </View>
          </View>
          {/* Duration */}
          <View style={styles.nestedButtonView}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Length of distance (in min) *
              </Text>
            </View>
            <View>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChangeDuration}
              >
                {this.state.duration}
              </TextInput>
            </View>
          </View>

          {/* Intensity */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Intensity *</Text>
            </View>
          </View>
          {/* React-Native radio button as multi option button */}
          <View style={styles.segmentedControls}>
            <SegmentedControls
              tint={"#A680B8"}
              backTint={"#ffffff"}
              optionStyle={{ fontFamily: "AvenirNext-Medium" }}
              selectedOption={this.state.intensity}
              onSelection={this.setIntensity.bind(this)}
              optionContainerStyle={{
                flex: 1,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2
              }}
              options={intensities}
            />
          </View>
          {/* Venue */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Type of Venue *</Text>
            </View>
          </View>
          {/* React-Native radio button as multi option button */}
          <View style={styles.segmentedControls}>
            <SegmentedControls
              tint={"#A680B8"}
              backTint={"#ffffff"}
              optionStyle={{ fontFamily: "AvenirNext-Medium" }}
              selectedOption={this.state.venue}
              onSelection={this.setVenue.bind(this)}
              optionContainerStyle={{
                flex: 1,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2
              }}
              options={venues}
            />
          </View>
          {/* Location */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Location *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.profileRowInfo}>
            <TextInput
              style={ScreenStyleSheet.textInputStyle}
              onChangeText={this.onChangLocation}
            >
              {this.state.location}
            </TextInput>
          </View>
          {/* Options */}
          <View style={ScreenStyleSheet.rowContainer}>
            {/* Cancel button */}
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { borderWidth: 1, borderColor: "black" }
              ]}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            {/* Save button */}
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#ab76ba" }]}
              onPress={this.saveProfile}
            >
              <Text style={{ color: "white" }}>Save Changes</Text>
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
  textInputContainer: {
    height: 40,
    marginTop: -15,
    marginBottom: 15
  },
  textInputStyle: {
    marginRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: "gray"
  },
  textInputNumber: {
    marginRight: 45,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    textAlign: "center",
    marginLeft: 65
  },
  segmentedControls: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  buttonContainer: {
    marginVertical: 10,
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
