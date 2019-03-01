import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Picker
} from "react-native";
import {} from "react-native-form-builder";
import GenerateForm from "react-native-form-builder";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { createUser } from "../../actions/AuthActions";
import dateFormat from "dateformat";

class SignupScreen extends Component {
  state = {
    user: "",
    password: ""
  };

  onChangeUser = text => {
    this.setState({
      user: text
    });
  };

  onChangePassword = text => {
    this.setState({
      password: text
    });
  };

  onPressSignUp = () => {
    this.props.createUser(this.state.user, this.state.password);
  };

  onGoBack = () => {
    Actions.pop();
  };

  //Update selected stage of Menopause
  updateStage = stage => {
    this.setState({ stage: stage });
  };

  //render the screen
  render() {
    return (
      <ScrollView>
        <View style={styles.header}>
          {/*Header */}
          <Text style={styles.headerText}> Sign Up </Text>
        </View>
        <View>
          <GenerateForm ref="formGenerator" fields={fields} />
        </View>
        <View>
          {/*Picker for Menopause stage */}
          <Picker
            style={styles.picker}
            selectedValue={this.state.stage}
            onValueChange={this.updateStage}
          >
            <Picker.Item label="Menopause Stage - Pre" value="pre" />
            <Picker.Item label="Menopause Stage - Peri" value="peri" />
            <Picker.Item label="Menopause Stage - Post" value="post" />
          </Picker>
        </View>
        <View style={styles.nestedButtonView}>
          {/*Cancel Button - redirects user to Login Screen on press */}
          {/*Login Button - redirects user to Login Screen on press */}
          <TouchableOpacity style={styles.cancelButton} onPress={this.onGoBack}>
            <Text style={styles.buttonText}> CANCEL </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() =>
              Alert.alert(
                "Success!",
                "Thank you for signing up!\nYour information has been forwarded to our researchers for evaluation.\nExpect to recieve an email within 7 days.",
                [{ text: "OK", onPress: this.onPressSignUp }],
                { cancelable: false }
              )
            }
          >
            <Text style={styles.buttonText}> SUBMIT </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
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
    alignItems: "center",
    alignSelf: "center"
  },
  picker: {
    marginTop: 15,
    marginRight: 5,
    marginLeft: 5
  }
};
// These Fields will create a login form
const fields = [
  {
    type: "text",
    name: "full_name",
    required: true,
    label: "Full Name"
  },
  {
    type: "text",
    name: "email",
    required: true,
    label: "Email Address"
  },
  {
    type: "text",
    name: "ConfirmEmail",
    required: true,
    label: "Confirm Email"
  },
  {
    type: "password",
    name: "password",
    required: true,
    label: "Password"
  },
  {
    type: "password",
    name: "confirmPass",
    required: true,
    label: "Confirm Password"
  },
  {
    type: "date",
    name: "birthday",
    required: true,
    mode: "date",
    label: "Date of Birth"
  }
];
