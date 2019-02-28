import React, { Component } from "react";
import {View,Text,TouchableOpacity,ScrollView,Alert,Picker} from "react-native";
import {} from "react-native-form-builder";
import GenerateForm from "react-native-form-builder";
import { goLogin } from "../components/navigation/InitialNavigator";
import startMainTabs from "../components/navigation/MainTabNavigator";
import { connect } from "react-redux";

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: ""
    };
  }

  //Direct user to home screen
  loginHandler() {
    startMainTabs();
  }

  //Direct user to login screen
  authHandler = () => {
    goLogin();
  };

  //Update selected stage of Menopause
  updateStage = stage => {
    this.setState({ stage: stage });
  };

//render the screen
  render() {
    const { selectedIndex } = this.state;

    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}> Sign Up </Text>
        </View>
        <View>
          <GenerateForm
            ref={c => {
              this.formGenerator = c;
            }}
            fields={fields}
          />
        </View>
        <View>
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
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={this.authHandler}
          >
            <Text style={styles.buttonText}> CANCEL </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() =>
              Alert.alert(
                "Success!",
                "Thank you for signing up!\nYour information has been forwarded to our researchers for evaluation.\nExpect to recieve an email within 7 days.",
                [{ text: "OK", onPress: this.authHandler }],
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

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
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
