import React, { Component } from "react";
import {
  StyleSheet,
  Text,
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

// Profile tab
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    console.log("Props on profile", this.props);
  }

  // When edit profile icon is clicked
  goToEditProfile = () => {
    // Navigate to edit profile
    Actions.editProfile();
  };

  goToPastEvents = () => {
    // Navigate to Past Events
    Actions.pastEvents();
  };

  goToHelplineLinks = () => {
    // Navigate to Past Events
    Actions.helplines();
  };

  render() {
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Profile</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Profile header container */}
          <View style={ScreenStyleSheet.profileHeader}>
            {/* Edit profile icon  */}
            <View style={ScreenStyleSheet.editProfile}>
              <TouchableHighlight
                onPress={this.goToEditProfile}
                activeOpacity={0}
              >
                <Image
                  style={ScreenStyleSheet.editIcon}
                  source={require("../../assets/icons/edit.png")}
                />
              </TouchableHighlight>
            </View>
            {/* Profile picture */}
            <Image
              style={ScreenStyleSheet.avatar}
              source={require("../../assets/icons/default-profile.png")}
            />
            <Text style={ScreenStyleSheet.profileName}>
              {this.props.user.user.fullname}
            </Text>
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
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.props.user.user.dob}
              </Text>
            </View>
          </View>
          {/* Age */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Age</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {/* Automatically calculates the age when given date of birth */}
                {Math.floor(
                  (new Date().getTime() -
                    Date.parse(this.props.user.user.dob)) /
                    31557600000
                )}
              </Text>
            </View>
          </View>
          {/* Menopausal Stage */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Menopausal Stage</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.props.user.user.menopausal_stage}
              </Text>
            </View>
          </View>

          {/* On screen separator */}
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
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>
                Length of Walk (by distance)
              </Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.props.user.user.distance} km
              </Text>
            </View>
          </View>
          {/* Duration */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>
                Length of Walk (by duration)
              </Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.props.user.user.duration} min
              </Text>
            </View>
          </View>
          {/* Intensity */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Intensity</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.props.user.user.intensity}
              </Text>
            </View>
          </View>
          {/* Venue */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Type of Venue</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.props.user.user.venue}
              </Text>
            </View>
          </View>
          {/* Location */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Location</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.props.user.user.location}
              </Text>
            </View>
          </View>

          {/* Options */}
          <View style={ScreenStyleSheet.rowContainer}>
            {/* Button to help links */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.goToHelplineLinks}
            >
              <Text>Helpline Links</Text>
            </TouchableOpacity>
            {/* Button to past events */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.goToPastEvents}
            >
              <Text>Past Events</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("profilescreen");
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(ProfileScreen);

// Styles
const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black"
  }
});
