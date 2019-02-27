import React, { Component } from "react";
import { connect } from "react-redux";
import { setProfile } from "../store/actions/user";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import GenerateForm from "react-native-form-builder";
import { goSignup } from "../components/navigation/InitialNavigator";
import startMainTabs from "../components/navigation/MainTabNavigator";
import { firebaseService } from "../../firebase/controllers/user/login";

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
  }

  loginHandler() {
    const formValues = this.refs.formGenerator.getValues();
    firebaseService
      .load(formValues.email, formValues.password)
      .then(data => {
        this.props.dispatch(setProfile(data));
        startMainTabs();
      })
      .catch(error => console.log("API call error"));
  }

  signupHandler = () => {
    goSignup();
  };

  render() {
    return (
      <View>
        <Text style={styles.logo}>WALK AND TALK</Text>
        <View>
          <GenerateForm ref="formGenerator" fields={fields} />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.loginHandler}
        >
          <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableOpacity>

        <Text style={styles.signUp}>New to Walk and Talk?</Text>

        <View style={styles.nestedButtonView}>
          <Text style={styles.signUp}>Sign up</Text>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={this.signupHandler}
          >
            <Text style={styles.here}> Here </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  null
)(AuthScreen);

const fields = [
  {
    type: "text",
    name: "email",
    required: true,
    label: "Email"
  },
  {
    type: "password",
    name: "password",
    required: true,
    label: "Password"
  }
];

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 150
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#c391d0",
    textAlign: "center",
    marginBottom: 60,
    marginTop: 80
  },
  inputBox: {
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "grey",
    height: 40,
    padding: 10,
    width: 360,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 15,
    fontSize: 18
  },
  loginButton: {
    marginTop: 30,
    marginBottom: 80,
    marginRight: 50,
    marginLeft: 50,
    padding: 10,
    backgroundColor: "#c391d0",
    borderRadius: 8
  },
  signupButton: {},
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  signUp: {
    fontSize: 18,
    color: "black",
    textAlign: "center"
  },
  here: {
    fontSize: 18,
    color: "#c391d0",
    textDecorationLine: "underline",
    textAlign: "right"
  },
  nestedButtonView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  }
});
