import React, { Component } from "react";
import { Image } from "react-native";
import { WebView } from "react-native-webview";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Button,
  Alert
} from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import Loader from "../loader/loader";

/* This is the questionnaire screen, user will be taken to corresponding questionnaire link here.
 */
class QuestionnaireScreen extends Component {
  constructor(props) {
    //questionnaire cardview passes in the questionnaire card id on redcap as props
    super(props);
    this.state = {
      //gives warning when initial url is null
      source: {
        uri : null
      },
      instance: 1,
      header: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      },
      loading: true
    };
  }

  onBack = () => {
    // Navigate back to form page
    Actions.pop();
  };

  /*
    This fucntion gets the record from redcap first, check if the last instance if completed or not, 
    if not, set instance number to last instance number, else, increment the instance number.
    Then get the survey link by calling getSurveyLink
    */
  setSurveyLink = async () => {
    //get instance number
    const instanceData =
      "token=8038CE0F65642ECC477913BE85991380" +
      "&content=record" +
      "&format=json" +
      "&type=flat" +
      "&records[0]=" +
      this.props.user.user.redcap.id.toString() + //to be changed to user redcap id
      "&forms[0]=" +
      this.props.questionnaire +
      "&returnFormat=json";
    console.log(instanceData);
    await axios
      .post(
        "https://med-rcdev.med.ualberta.ca/api/",
        instanceData,
        this.state.header
      )
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(body => {
        var lastInstanceStatus;
        //checks if body is empty, empty body meaning questionnaire has not been created on redcap
        // if body is not empty, get the staus of the last instance
        if (body.length != 0) {
          if (this.props.questionnaire === "menqol") {
            lastInstanceStatus = body[body.length - 1].menqol_complete;
          } else {
            lastInstanceStatus =
              body[body.length - 1]
                .menopause_symptom_severity_questionnaire_complete;
          }
        } else {
          //if body is empty, assign with "3" which is not a status code on redcap
          lastInstanceStatus = "3";
        }

        //status code from redcap, 0: imcomplete, 1: unverified, 2: complete
        //status code defined here, 3: survey not created
        //if survey not created, get the first survey link
        if (lastInstanceStatus == "3") {
          this.getSurveyLink();
        }
        // if last survey is completed, get next survey link
        else if (lastInstanceStatus == "2") {
          //callback gets survey link after this.state.instance is updated
          this.setState({ instance: parseInt(body.length, 10) + 1 }, () => {
            this.getSurveyLink();
          });
        }
        // last survey is created but not completed, get the last survey link
        else {
          //callback gets survey link after this.state.instance is updated
          this.setState({ instance: parseInt(body.length, 10) }, () => {
            this.getSurveyLink();
          });
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert("Something went wrong, please try again later.")
      });
  };

  getSurveyLink = async () => {
    const linkData =
      "token=8038CE0F65642ECC477913BE85991380" +
      "&content=surveyLink" +
      "&format=json" +
      "&instrument=" +
      this.props.questionnaire +
      "&event=" +
      "&record=" +
      this.props.user.user.redcap.id.toString() + //to be changed to user redcap id
      "&repeat_instance=" +
      this.state.instance.toString() +
      "&returnFormat=json";
    await axios
      .post(
        "https://med-rcdev.med.ualberta.ca/api/",
        linkData,
        this.state.header
      )
      .then(res => {
        this.setState({ source: { uri: res.data } });
        this.setState({loading: false});
      })
      .catch(error => {
        console.log(error);
        Alert.alert("Something went wrong, please try again later.")
      });
  };

  componentWillMount() {
    this.setSurveyLink();
  }

  render() {
    return (
      <Container>
        {/* Header */}
        <Loader
          loading={this.state.loading} />
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
        <WebView source={this.state.source} />
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(QuestionnaireScreen);
