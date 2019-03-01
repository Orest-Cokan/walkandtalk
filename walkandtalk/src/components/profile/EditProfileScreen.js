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

class EditProfileScreen extends Component {
  // Constructor
  constructor(props) {
    super(props);

    // State
    this.state = {
      name: "Brittany Taylor",
      dob: "January 1, 1955",
      menopausalStage: "Peri",
      distance: 10,
      duration: 60,
      intensity: "Intermediate",
      venue: "Indoor",
      location: "Riverbend Area"
    };
  }

  // On save
  saveProfile = () => {
    // Navigate to homescreen
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
        <Header style={ScreenStyleSheet.header}>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title>Edit Profile</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          <View style={ScreenStyleSheet.profileHeader}>
            {/* Profile picture */}
            <Image
              style={ScreenStyleSheet.avatar}
              source={require("../../assets/icons/profile.png")}
            />
            {/* Add + for changing profile picture */}
          </View>
          {/* Name */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Full Name *</Text>
            </View>
            <View style={ScreenStyleSheet.profileInputContainer}>
              <TextInput style={ScreenStyleSheet.profileInputStyle}>
                Brittany Taylor
              </TextInput>
            </View>
          </View>
          {/* Email */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Email Address</Text>
            </View>
            <View style={ScreenStyleSheet.profileInputContainer}>
              <TextInput
                style={ScreenStyleSheet.profileInputStyle}
                editable={false}
              >
                btaylor@example.com
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
                style={ScreenStyleSheet.profileInputStyle}
                editable={false}
              >
                January 1, 1955
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
              selectedOption={this.state.menopausalStage}
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
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>
                Length of Walk (by distance)*
              </Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInputNumber}>10</Text>
              <Text style={ScreenStyleSheet.profileInput}>km</Text>
            </View>
          </View>
          {/* Duration */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>
                Length of Walk (by duration)*
              </Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInputNumber}>60</Text>
              <Text style={ScreenStyleSheet.profileInput}>min</Text>
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
            <Text style={ScreenStyleSheet.profileInputStyle}>
              Riverbend Area
            </Text>
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
  }
});

export default EditProfileScreen;
