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
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      checked9: false,
      colour1: "",
      colour2: "",
      colour3: "",
      colour4: "",
      colour5: "",
      colour6: "",
      colour7: "",
      colour8: "",
      colour9: ""
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
    if (!this.state.checked4) {
      this.setState({ colour4: "red" });
    }
    if (!this.state.checked5) {
      this.setState({ colour5: "red" });
    }
    if (!this.state.checked6) {
      this.setState({ colour6: "red" });
    }
    if (!this.state.checked7) {
      this.setState({ colour7: "red" });
    }
    if (!this.state.checked8) {
      this.setState({ colour8: "red" });
    }
    if (!this.state.checked9) {
      this.setState({ colour9: "red" });
    }

    if (
      this.state.checked1 &&
      this.state.checked2 &&
      this.state.checked3 &&
      this.state.checked4 &&
      this.state.checked5 &&
      this.state.checked6 &&
      this.state.checked7 &&
      this.state.checked8 &&
      this.state.checked9
    ) {
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
            healthy aging lifestyle.
            {"\n\n"}
            <Text style={{ fontWeight: "bold" }}>
              {"\n"}Why am I being asked to take part in this research study?
            </Text>
            {"\n"}
            For our study we are looking for women that are in menopause
            transition or post-menopausal and who are interested in (a) meeting
            with other menopausal women for walks and talks, (b) testing this
            mobile application for scheduling walks, and (c) completing the
            associated menopause questionnaires. You are being asked to be in
            this study because you have expressed interest in testing the “walk
            and talk” app.
            {"\n\n"}
            <Text style={{ fontWeight: "bold" }}>
              {"\n"}What is the reason for doing the study?
            </Text>
            {"\n"}
            Walking is a simple, low cost activity with proven physical and
            mental health benefits; however, its impact on menopause symptoms
            and quality of life is not known. We have learned from menopausal
            women like you that scheduling walks can be challenging. Therefore,
            we have designed an app that should facilitate walk scheduling and
            will monitor the impact of your walks on menopause symptoms and
            quality of life. The current app version is a prototype that will be
            tested in a research study by the Mature Women’s Health Research
            group of the University of Alberta. The researchers will have access
            to the data you provide on the app, including the questionnaires, in
            order to develop this prototypic app further.
            {"\n\n"}
            <Text style={{ fontWeight: "bold" }}>
              {"\n"}What will I be asked to do?
            </Text>
            {"\n"}
            If you consent to be in this study we will provide you with a login
            code and guidelines on how to use this app for scheduling and
            participating in walks. You are then free to use the app to connect
            with like-minded women for walks and talks. You will also be asked
            to complete the attached questionnaires in monthly intervals. We
            would also like you to record your walks and opinion of he walks on
            the app.
            {"\n\n"}
            <Text style={{ fontWeight: "bold" }}>
              {"\n"}What are the risks and discomforts?
            </Text>
            {"\n"}A potential risk concerns some form of a breach of
            confidentiality. We are minimizing this risk by using a secure
            encrypted survey platform and storing all extracted, electronic data
            on encrypted databases on password-protected computers, but we
            cannot completely eliminate this risk.
            {"\n\n"}
            <Text style={{ fontWeight: "bold" }}>
              {"\n"}What are the benefits to me?
            </Text>
            {"\n"}
            You may not benefit directly from using the app but it will help us
            to study the effectiveness of the app. A potential benefit of using
            this app is sharing knowledge and concerns of menopause with
            like-minded women while being physically active.
            {"\n\n"}
            <Text style={{ fontWeight: "bold" }}>
              {"\n"}Will I be paid for this study?
            </Text>
            {"\n"}
            The use of this app is voluntary. No compensation will be provided.
            {"\n\n"}
            <Text style={{ fontWeight: "bold" }}>
              {"\n"}Do I have to take part in the study?
            </Text>
            {"\n"}
            Participating in this study and using the app is your choice. You do
            not have to answer any questions or provide any opinion you are not
            comfortable with. If you change your mind and want to stop being
            involved you can log out at any time. You do not have to give a
            reason for stopping. Your participation in this study, use of the
            app, or withdrawal from the study will not impact your current or
            future health care at the menopause clinic or any other clinic.
            {"\n\n"}
            <Text style={{ fontWeight: "bold" }}>
              {"\n"}Will my information be kept private?
            </Text>
            {"\n"}
            The information you share for proof of login eligibility such as age
            and menopause stage and all data you provide in completing the
            questionnaires will remain confidential and will only accessible to
            the researchers. Your name and other identifying data will not be
            included in any report or publication that may come out of this
            study. After the study is done, we will still need to securely store
            your data that was collected as part of the study. At the University
            of Alberta, we keep data stored for a minimum of 5 years after the
            end of the study. Data collect on paper will be kept inside locked
            cabinets inside a locked office. All electronic files will be kept
            on a password protected computer. However, part of the website as
            with all social networks will be visible to all women that have
            access to the app. This includes: your name, scheduling and/or
            participating in walks, preferred level of walking intensity, and
            any walk-related descriptive information you wish to disclose on the
            app.
            {"\n\n"}
          </Text>

          <Text style={{ fontWeight: "bold" }}>What if I have questions?</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>
              If you have any questions or concerns about the study, you can
              email the Mature Women’s Health Research group investigators of
              this study at rs4women@ualberta.ca{" "}
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
              "Do you understand that you have been asked to be in a research study? "
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
            rightText={"Have you read the attached Information sheet? "}
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
              "Do you understand the benefits and risks involved in taking part in this research study? "
            }
          />
          <CheckBox
            onClick={() => {
              this.setState({
                checked4: !this.state.checked4
              });
            }}
            isChecked={this.state.checked4}
            checkBoxColor="#A680B8"
            uncheckedCheckBoxColor={this.state.colour4}
            rightText={
              "Have you had an opportunity to ask questions or receive further information? "
            }
          />
          <CheckBox
            onClick={() => {
              this.setState({
                checked5: !this.state.checked5
              });
            }}
            isChecked={this.state.checked5}
            checkBoxColor="#A680B8"
            uncheckedCheckBoxColor={this.state.colour5}
            rightText={
              "Do you understand that your participation is voluntary and that you are free to log out and leave the study at any time, without having to give a reason and without affecting your future medical care?"
            }
          />
          <CheckBox
            onClick={() => {
              this.setState({
                checked6: !this.state.checked6
              });
            }}
            isChecked={this.state.checked6}
            checkBoxColor="#A680B8"
            uncheckedCheckBoxColor={this.state.colour6}
            rightText={
              "Do you understand that the answers and information you provide in the online questionnaires will be kept confidential? "
            }
          />
          <CheckBox
            onClick={() => {
              this.setState({
                checked7: !this.state.checked7
              });
            }}
            isChecked={this.state.checked7}
            checkBoxColor="#A680B8"
            uncheckedCheckBoxColor={this.state.colour7}
            rightText={"Do you understand who will have access to the data? "}
          />
          <CheckBox
            onClick={() => {
              this.setState({
                checked8: !this.state.checked8
              });
            }}
            isChecked={this.state.checked8}
            checkBoxColor="#A680B8"
            uncheckedCheckBoxColor={this.state.colour8}
            rightText={
              "Would you be willing to be contacted about participating in related studies in the future? "
            }
          />
          <CheckBox
            onClick={() => {
              this.setState({
                checked9: !this.state.checked9
              });
            }}
            isChecked={this.state.checked9}
            checkBoxColor="#A680B8"
            uncheckedCheckBoxColor={this.state.colour9}
            rightText={"I agree to take part in this study "}
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
