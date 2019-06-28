import React, { Component } from "react";
import { Image, Alert } from "react-native";
import { WebView } from "react-native-webview";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Button
} from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import Loader from "../../constants/loader";

/* This is the questionnaire screen, user will be taken to corresponding questionnaire link here.
 */
class QuestionnaireScreen extends Component {
  constructor(props) {
    //questionnaire cardview passes in the questionnaire card id on redcap as props
    super(props);
    this.state = {
      loading: false
    };
  }

  onBack = () => {
    // Navigate back to form page
    Actions.pop();
  };

  render() {
    return (
      <Container>
        {/* Header */}
        <Loader loading={this.state.loading} />
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
            <Title style={ScreenStyleSheet.headerTitle}>Questionnaire</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>
        <WebView
          source={{
            uri: "https://redcap.ualberta.ca/surveys/index.php?s=TF9RTY8P9C"
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(QuestionnaireScreen);
