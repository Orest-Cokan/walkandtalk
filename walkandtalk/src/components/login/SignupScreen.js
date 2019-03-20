import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { createUser } from "../../actions/UserActions";
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
import DatePicker from "react-native-datepicker";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";

class SignupScreen extends Component {
  state = {
    fullname: null,
    password: null,
    confirmPassword: null,
    email: null,
    confirmEmail: null,
    dob: null,
    emailCheck: false,
    passwordCheck: false,
    menopausal_stage: "Pre",
    intensity: "Slow",
    venue: "Indoor",
    location: null,
    duration: null,
    distance: null
  };

  onChangeEmail = text => {
    this.setState({
      email: text
    });
  };

  onConfirmEmail = text => {
    this.setState({
      confirmEmail: text
    });
  };

  onChangePassword = text => {
    this.setState({
      password: text
    });
  };

  onConfirmPassword = text => {
    this.setState({
      confirmPassword: text
    });
  };

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

  onChangeIntensity = text => {
    this.setState({
      intensity: text
    });
  };
  onChangeMenopause = text => {
    this.setState({
      menopausal_stage: text
    });
  };

  onChangeVenue = text => {
    this.setState({
      venue: text
    });
  };

  checkPassword = () => {
    if (this.state.password != this.state.confirmPassword) {
      Alert.alert("Passwords don't match, please check again.");
      this.setState({ passwordCheck: false });
    } else {
      this.setState({ passwordCheck: true });
    }
  };
  checkEmail = () => {
    if (this.state.email != this.state.confirmEmail) {
      Alert.alert("Emails don't match, please check again.");
      this.setState({ emailCheck: false });
    } else {
      this.setState({ emailCheck: true });
    }
  };

  onPressSignUp = () => {
    console.log("we are here!!!!");
    if (this.state.emailCheck && this.state.passwordCheck) {
      this.props.createUser(
        this.state.email,
        this.state.password,
        this.state.confirmPassword,
        this.state.fullname,
        this.state.menopausal_stage,
        this.state.dob,
        this.state.venue,
        this.state.location,
        this.state.intensity,
        this.state.duration,
        this.state.distance
      );
      Alert.alert("sent to server");
    } else {
      if (this.state.emailCheck == false) {
        this.checkEmail();
      }
      if (this.state.passwordCheck == false) {
        this.checkPassword();
      }
    }
  };

  onGoBack = () => {
    Actions.pop();
  };

  updateStage = stage => {
    this.setState({ menopausal_stage: stage });
  };

  render() {
    // All the options displayed in radio buttons
    const intensities = ["Slow", "Intermediate", "Brisk"];
    const venues = ["Indoor", "Outdoor"];
    const menopausal_stage = ["Pre", "Peri", "Post"];

    return (
      <Container>
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Sign Up</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={ScreenStyleSheet.content}>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={styles.subHeader}>Basic Information</Text>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Full Name *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChangeFullName}
              />
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Email Address *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChangeEmail}
              />
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Confirm Email Address *
              </Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onConfirmEmail}
                onEndEditing={this.checkEmail}
              />
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Password *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChangePassword}
              />
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Confirm Password *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onConfirmPassword}
                onEndEditing={this.checkPassword}
              />
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Date of Birth *</Text>
            </View>
            <View style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                style={{ width: "100%" }}
                date={this.state.dob}
                mode="date"
                showIcon={false}
                placeholder="Select date of birth"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  placeholderText: {
                    alignItems: "center"
                  }
                }}
                onDateChange={date => {
                  this.setState({ dob: date });
                }}
              />
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Menopause Stage *</Text>
            </View>
          </View>
          {/* React-Native radio button as multi option button */}
          <View style={styles.segmentedControls}>
            <SegmentedControls
              tint={"#A680B8"}
              backTint={"#ffffff"}
              optionStyle={{ fontFamily: "AvenirNext-Medium" }}
              selectedOption={this.state.menopausal_stage}
              optionContainerStyle={{
                flex: 1,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2
              }}
              options={menopausal_stage}
              onSelection={this.onChangeMenopause.bind(this)}
            />
          </View>

          <View style={ScreenStyleSheet.lineSeparator} />

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={styles.subHeader}>My Preferences</Text>
            </View>
          </View>

          <View style={styles.nestedButtonView}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Length of distance(km) *
              </Text>
            </View>
            <View>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChangeDistance}
              />
            </View>
          </View>

          <View style={styles.nestedButtonView}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Length of distance(min) *
              </Text>
            </View>
            <View>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChangeDuration}
              />
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Intensity</Text>
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
              onSelection={this.onChangeIntensity.bind(this)}
            />
          </View>
          {/* Venue */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Type of Venue</Text>
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
              onSelection={this.onChangeVenue.bind(this)}
            />
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            {/* Cancel button */}
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { borderWidth: 1, borderColor: "black" }
              ]}
              onPress={this.onGoBack}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            {/* Finish button */}
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#A680B8" }]}
              onPress={this.onPressSignUp}
            >
              <Text style={{ color: "white" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { createUser }
)(SignupScreen);

//Styles
const styles = {
  wrapper: {
    flex: 1,
    marginTop: 100
  },
  header: {
    backgroundColor: "#c391d0",
    width: "100%",
    height: 40
  },
  headerText: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20
  },
  subHeader: {
    fontSize: 18,
    color: "black",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "left"
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 30,
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#c391d0",
    borderRadius: 8
  },
  cancelButton: {
    marginTop: 30,
    marginBottom: 30,
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    backgroundColor: "grey",
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 25,
    paddingRight: 25
  },
  nestedButtonView: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 5
  },
  picker: {
    marginTop: 15,
    marginRight: 5,
    marginLeft: 5
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
};
