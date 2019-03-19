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
  Content,
  Button
} from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

// View Request screen
class ViewRequestScreen extends Component {
  constructor(props) {
    super(props);
    console.log("Props on view request", this.props);

    // Sample data
    this.state = {
      fullname: this.props.request.fullname,
      email: this.props.request.email,
      dob: this.props.request.dob,
      menopausal_stage: this.props.request.menopausal_stage,
      intensity: this.props.request.intensity,
      distance: this.props.request.distance,
      duration: this.props.request.duration,
      venue: this.props.request.venue,
      location: this.props.request.location,
    }
  }

  // Approves request to be a user
  approveRequest = () => {

  };

  // Declines request to be a user
  declineRequest = () => {
  };


  // Navigate back to Requests page
  onBack = () => {
    Actions.pop();
  };

  render() {
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor="white"
          androidStatusBarStyle="dark-content"
        >
          <Left style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.onBack}>
              <Image
                style={ScreenStyleSheet.backIcon}
                source={require("../../assets/icons/back-button.png")}
              />
            </Button>
          </Left>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>View Request</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Info Header */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileSectionTitle}>
                Basic Info
              </Text>
            </View>
          </View>
          {/* Full name */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Full name</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.state.fullname}
              </Text>
            </View>
          </View>
          {/* Email address */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Email address</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.state.email}
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
                {this.state.dob}
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
                    Date.parse(this.state.dob)) /
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
                {this.state.menopausal_stage}
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
                {this.state.distance} km
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
                {this.state.duration} min
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
                {this.state.intensity}
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
                {this.state.venue}
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
                {this.state.location}
              </Text>
            </View>
          </View>

          {/* Options */}
          <View style={ScreenStyleSheet.rowContainer}>
            {/* Decline button */}
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { borderWidth: 1 }
              ]}
              onPress={this.declineRequest}
            >
              <Text>Decline</Text>
            </TouchableOpacity>
            {/* Approve button */}
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#A680B8", borderColor: "#A680B8" }]}
              onPress={this.approveRequest}
            >
              <Text style={{ color: "white" }}>Approve</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("viewrequestscreen");
  return {
  };
};

export default connect(
  mapStateToProps,
  null
)(ViewRequestScreen);

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
    borderColor: "grey"
  }
});
