import React, { Component } from "react";
import { connect } from "react-redux";
import { passwordRequest } from "../../actions/UserActions";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
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
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { Actions } from "react-native-router-flux";
import {
  StyledText as Text,
  StyledTextInput as TextInput
} from "../../constants/StyledText";

class RequestScreen extends Component {
  state = {
    email: ""
  };

  onChangeEmail = text => {
    this.setState({
      email: text
    });
  };

  onPressSend = async () => {
    await new Promise((resolve, reject) => {
      // Edit the event user clicks
      this.props.passwordRequest(this.state.email);
      resolve();
    });
  };

  onBack = () => {
    // Navigate back to auth screen
    Actions.pop();
  };

  onPressCancel = () => {};
  //render the screen
  render() {
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Left style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.onBack}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/back-button.png")}
              />
            </Button>
          </Left>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Send Password</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          <Text style={styles.logo}>WALK AND TALK</Text>
          <View>
            <TextInput
              style={ScreenStyleSheet.formInputAuth}
              onChangeText={text => this.onChangeEmail(text)}
              value={this.state.text}
              placeholder={"Email"}
              placeholderColor={"grey"}
            />
          </View>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={this.onPressSend}
          >
            {/* Login Button - redirect user to home screen if successfull */}
            <Text style={styles.buttonText}> Send </Text>
          </TouchableOpacity>
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
  { passwordRequest }
)(RequestScreen);

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
  sendButton: {
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
