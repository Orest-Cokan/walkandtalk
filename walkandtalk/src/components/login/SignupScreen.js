import React, { Component } from "react";
import {
  StyleSheet,
  View,
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
import SwitchSelector from "react-native-switch-selector";
import NumericInput from "react-native-numeric-input";
import { width, height, totalSize } from "react-native-dimension";
import DatePicker from "react-native-datepicker";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import {
  StyledText as Text,
  StyledTextInput as TextInput
} from "../../constants/StyledText";

class SignupScreen extends Component {

  constructor(props) {
    super(props);
      this.state = {
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
        duration: 0,
        distance: 0
      }
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

  setIntensity(value) {
    this.setState({
      intensity: value
    });
  };
  setMenopauseStage(value) {
    this.setState({
      menopausal_stage: value
    });
  };

  setVenue(value) {
    this.setState({
      venue: value
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
      { label: "Indoor", value: "Indoor" },
      { label: "Outdoor", value: "Outdoor" }
    ];
    const menopausal_stage = [
      { label: "Pre", value: "Pre" },
      { label: "Peri", value: "Peri" },
      { label: "Post", value: "Post" }
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
            <Title style={ScreenStyleSheet.headerTitle}>Sign Up</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={ScreenStyleSheet.content}>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={styles.subHeader}>Basic Information</Text>
            </View>
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
              />
            </View>
          </View>

          {/* Email Address */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Email Address
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
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

          {/* Confirm Email Address */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Confirm Email Address
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
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

          {/* Password */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Password
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
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

          {/* Confirm Password */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Confirm Password
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
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

          {/* Date of Birth */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Date of Birth
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
            <View style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                style={{ width: "100%" }}
                date={this.state.dob}
                mode="date"
                showIcon={false}
                placeholder="Select date of birth"
                maxValue={new Date()}
                format="MMM DD, YYYY"
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
              initial={0}
              onPress={value => this.setMenopauseStage(value)}
              textColor={"#A680B8"} //'#7a44cf'
              selectedColor={"#ffffff"}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              hasPadding
            />
          </View>

          {/* Line separator */}
          <View style={ScreenStyleSheet.lineSeparator} />

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
              </Text>
            </View>
          </View>
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

            {/* Finish button */}
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#A680B8" }]}
              onPress={(this.onPressSignUp)}
            >
              <Text style={{ color: "white" }}>Sign Up</Text>
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
};
