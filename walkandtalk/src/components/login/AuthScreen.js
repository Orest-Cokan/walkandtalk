import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/UserActions";
import { Actions } from "react-native-router-flux";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Container, Header, Content } from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import {
  StyledText as Text,
  StyledTextInput as TextInput
} from "../../constants/StyledText";
//import Socket from "../../constants/Socket";

class AuthScreen extends Component {
  state = {
    email: "",
    password: ""
  };

  onChangeUser = text => {
    //lowerText = text.toLowerCase()
    this.setState({
      email: text
    });
  };

  onChangePassword = text => {
    this.setState({
      password: text
    });
  };

  onPressLogin = async () => {
    await new Promise((resolve, reject) => {
      // Edit the event user clicks
      this.props.loginUser(this.state.email, this.state.password);
      resolve();
    });

    /* Socket.emit('login', {
      email: this.refs.formGenerator.getValues().email,
      password: this.refs.formGenerator.getValues().password
    }); */
  };

  onPressSignUp = () => {
    Actions.consent();
  };

  onPressPassword = () => {
    Actions.password();
  };

  onPressCancel = () => {};
  //render the screen
  render() {
    return (
      <Container>
        {/* Header */}
        <Header
          style={{ height: 0 }}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        />
        <Content contentContainerStyle={ScreenStyleSheet.content}>
          <Text style={styles.logo}>WALK AND TALK</Text>
          <View>
            <TextInput
              style={ScreenStyleSheet.formInputAuth}
              onChangeText={text => this.onChangeUser(text)}
              value={this.state.text}
              placeholder={"Email"}
              placeholderColor={"grey"}
            />
            <TextInput
              style={ScreenStyleSheet.formInputAuth}
              onChangeText={text => this.onChangePassword(text)}
              value={this.state.text}
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderColor={"grey"}
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.onPressLogin}
          >
            {/* Login Button - redirect user to home screen if successfull */}
            <Text style={styles.buttonText}> LOGIN </Text>
          </TouchableOpacity>
          <Text style={styles.signUp}>New to Walk and Talk?</Text>
          <View style={styles.nestedButtonView}>
            {/* Signup Button - redirect user to signup screen if successfull */}
            <Text style={styles.signUp}>Sign up </Text>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={this.onPressSignUp}
            >
              <Text style={styles.here}>here</Text>
            </TouchableOpacity>
            <Text style={styles.signUp}>.</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  picture: state.picture
});

export default connect(
  mapStateToProps,
  { loginUser }
)(AuthScreen);

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
    marginBottom: 125,
    marginTop: 80
  },
  inputBox: {
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "grey",
    height: 30,
    padding: 10,
    width: 360,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 20,
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
  forgot: {
    fontSize: 15,
    color: "#A680B8",
    textDecorationLine: "underline",
    textAlign: "center"
  },
  nestedButtonView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  }
});
