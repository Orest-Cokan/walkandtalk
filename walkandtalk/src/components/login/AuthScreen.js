import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/UserActions";
import { Actions } from "react-native-router-flux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import GenerateForm from "react-native-form-builder";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

class AuthScreen extends Component {
  state = {
    email: "",
    password: ""
  };

  onChangeUser = text => {
    this.setState({
      email: text
    });
  };

  onChangePassword = text => {
    this.setState({
      password: text
    });
  };

  onPressLogin = () => {
    const formValues = this.refs.formGenerator.getValues();
    console.log(formValues.email, formValues.password);
    this.props.loginUser(
      this.refs.formGenerator.getValues().email,
      this.refs.formGenerator.getValues().password
    );
  };

  onPressSignUp = () => {
    Actions.signup();
  };

  onPressCancel = () => {};
  //render the screen
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { loginUser }
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
    fontSize: 40,
    color: "#A680B8",
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
    backgroundColor: "#A680B8",
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  },
  signUp: {
    fontSize: 15,
    color: "black",
    textAlign: "center"
  },
  here: {
    fontSize: 15,
    color: "#A680B8",
    textDecorationLine: "underline",
    textAlign: "right"
  },
  nestedButtonView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
