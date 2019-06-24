// Consent Screen View
import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
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
import CheckBox from "react-native-check-box";

class ConsentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked1: false,
      checked2: false,
      checked3: false,
      colour1: "",
      colour2: "",
      colour3: ""
    };
  }

  onBack = () => {
    // Navigate back to profile page
    Actions.pop();
  };

  // When cancel button is tapped
  onCancel = () => {
    Actions.pop();
  };

  // When continue button is tapped
  onContinue = () => {
    if (!this.state.checked1) {
      this.setState({ colour1: "red" });
    }
    if (!this.state.checked2) {
      this.setState({ colour2: "red" });
    }
    if (!this.state.checked3) {
      this.setState({ colour3: "red" });
    }
    if (this.state.checked1 && this.state.checked2 && this.state.checked3) {
      Actions.signup();
    }
  };

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
            <Title style={ScreenStyleSheet.headerTitle}>Consent</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          <Text style={{ fontWeight: "bold" }}>
            {"\n"}Information about use of current app
          </Text>
          <Text>
            Before deciding to use this app, please take the time to read the
            following information. Do not hesitate to contact us by email if you
            need further clarification or if you have questions. The objective
            of this mobile application is to bring women, who are in a stage of
            menopause transition or postmenopausal, together for walks and talks
            in the hope to reduce their symptoms and to set the start for a
            healthy aging lifestyle.{"\n\n"}
            The current app version is a prototype that will be tested in a
            research study by the Mature Women’s Health Research group of the
            University of Alberta. The researchers will have access to the data
            you provide on the app, including the two questionnaires, in order
            to develop this prototypic app further.{"\n\n"}
            The use of this app is voluntary. No compensation will be provided.
            {"\n\n"}A potential risk concerns some form of a breach of
            confidentiality. We are minimizing this risk by using a secure
            survey platform and storing all extracted, electronic data on
            password-protected computers, but we cannot completely eliminate
            this risk.{"\n\n"}A potential benefit of using this app is sharing
            knowledge and concerns of menopause with like-minded women while
            being physically active.{"\n\n"}
            The information you share in completing the questionnaires will
            remain confidential. Your name and other identifying elements will
            not be included in any report of this study.{"\n\n"}
            As per University of Alberta requirements, research data will be
            retained for a period of five years.{"\n\n"}
          </Text>

          <Text style={{ fontWeight: "bold" }}>Contact information</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>
              If you have any questions or concerns about the study, you can
              email the Mature Women’s Health Research group investigators of
              this study at{" "}
              <Text
                style={[{ color: "blue", textDecorationLine: "underline" }]}
              >
                rs4women@ualberta.ca
              </Text>
              .{"\n\n"}
            </Text>
          </View>
          <Text style={{ fontWeight: "bold" }}>Consent</Text>
          <CheckBox
            onClick={() => {
              this.setState({
                checked1: !this.state.checked1
              });
            }}
            isChecked={this.state.checked1}
            uncheckedCheckBoxColor={this.state.colour1}
            rightText={
              "I have read this consent form and understand the study and its purpose, as well as the risks and benefits of participating. "
            }
            checkBoxColor="#A680B8"
          />
          <CheckBox
            onClick={() => {
              this.setState({
                checked2: !this.state.checked2
              });
            }}
            isChecked={this.state.checked2}
            uncheckedCheckBoxColor={this.state.colour2}
            rightText={"I understand who has access to my data."}
            checkBoxColor="#A680B8"
          />
          <CheckBox
            onClick={() => {
              this.setState({
                checked3: !this.state.checked3
              });
            }}
            isChecked={this.state.checked3}
            checkBoxColor="#A680B8"
            uncheckedCheckBoxColor={this.state.colour3}
            rightText={
              "In using this app I agree to participate in this study and that the researchers have access to my data."
            }
          />
          <View style={ScreenStyleSheet.rowContainer}>
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
              onPress={this.onContinue}
            >
              <Text style={{ color: "white" }}>Continue</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(ConsentScreen);

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
