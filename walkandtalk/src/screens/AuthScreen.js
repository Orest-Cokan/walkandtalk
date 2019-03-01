import React, { Component } from "react";
import { connect } from "react-redux";
import { setProfile } from "../store/actions/actions";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import GenerateForm from "react-native-form-builder";
import { goSignup } from "../components/navigation/InitialNavigator";
import startMainTabs from "../components/navigation/MainTabNavigator";
import { firebaseService } from "../../firebase/controllers/user/login";
import {ToastAndroid} from 'react-native';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
  }

//Determines if valid user
  loginHandler() {
    const formValues = this.refs.formGenerator.getValues();
    console.log(formValues.email, formValues.password);
    firebaseService
      .load(formValues.email, formValues.password)
      .then(data => {
        if (data != null) {
          this.props.dispatch(setProfile(data));
          startMainTabs();
        }
      })
      .catch(error => console.log("API call error"));
      /*ToastAndroid.showWithGravity('Incorrect email and/or password',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        */
  };

  //Directs user to the signup screen
  signupHandler = () => {
    goSignup();
  };

//render the screen
  render() {
    return (
      <View>
      {/*Header Text*/}
        <Text style={styles.logo}>WALK AND TALK</Text>
        <View>
          <GenerateForm ref="formGenerator" fields={fields} />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.loginHandler}
        >
        {/*Login Button - redirect user to home screen if successfull*/}
          <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableOpacity>
        <Text style={styles.signUp}>New to Walk and Talk?</Text>
        <View style={styles.nestedButtonView}>
        {/*Signup Button - redirect user to signup screen if successfull*/}
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

//Fields the form builder takes in
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

//Style Sheet
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
