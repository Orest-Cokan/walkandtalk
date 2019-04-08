import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import Loader from "../../constants/loader";
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
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import axios from "axios";
import { approveUser, declineUser } from "../../actions/UserActions";

// View Request screen
class ViewRequestScreen extends Component {
  constructor(props) {
    super(props);
    // Setting infomation of the user to state
    this.state = {
      fullname: this.props.request.fullname,
      email: this.props.request.email,
      dob: this.props.request.dob,
      menopausal_stage: this.props.request.menopausal_stage,
      intensity: this.props.request.preference.intensity,
      distance: this.props.request.preference.distance,
      duration: this.props.request.preference.duration,
      venue: this.props.request.preference.venue,
      location: this.props.request.preference.location,
      redcapID: null,
      //HTTP header to REDCap calls
      header: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      },
      //responseStatus is the flag for HTTP request status code
      responseStatus: false,
      //show approve or decline button, hide after approving or declining
      showButtons: true,
      //flag for loading screen
      loading: false
    };
    console.log(this.props.user.user.email);
  }

  /* Get the next available record ID from REDCap */
  getNextRecordID = () => {
    const data =
      "token=8038CE0F65642ECC477913BE85991380" +
      "&content=generateNextRecordName";
    return axios
      .post("https://med-rcdev.med.ualberta.ca/api/", data, this.state.header)
      .then(res => {
        this.setState({ responseStatus: true });
        return res.data;
      })
      .catch(error => {
        console.log(error);
        this.setState({ responseStatus: false });
      });
  };

  //Register user on REDCap with basic fields: fullname, email, dob, meno_stage
  importToRedcap = () => {
    var userData =
      "token=8038CE0F65642ECC477913BE85991380" +
      "&content=record" +
      "&format=json" +
      "&type=flat;" +
      "&overwriteBehavior=normal" +
      "&forceAutoNumber=false" +
      '&data=[{"record_id":' +
      this.state.redcapID +
      ', "full_name": "' +
      this.state.fullname +
      '"' +
      ', "email": "' +
      this.state.email +
      '"' +
      ', "dob": "' +
      this.state.dob +
      '"' +
      ', "meno_stage": "' +
      this.state.menopausal_stage +
      '"' +
      ', "profile_complete": ' +
      2 +
      "}]" +
      "&returnContent=count" +
      "&returnFormat=json";
    return axios
      .post(
        "https://med-rcdev.med.ualberta.ca/api/",
        userData,
        this.state.header
      )
      .then(res => {
        //returning so await works
        return res.data;
      })
      .catch(error => {
        console.log(error);
        this.setState({ responseStatus: false });
      });
  };

  showErroMessage = () => {
    Alert.alert("Something went wrong, please try again later.");
  };

  //Thhis function assigns redcap ID to state and upload user information onto REDCap
  approveRequest = async () => {
    if (Platform.OS === "android") {
      this.setState({ loading: true });
    }
    //await for getNextRecordID to return
    this.setState({ redcapID: await this.getNextRecordID() });
    if (this.state.responseStatus) {
      //import New user into REDCap
      await this.importToRedcap();
      this.props.approveUser(
        this.props.user.token, 
        this.state.email, 
        this.state.redcapID, 
        this.props.user.user.email
      );
      if (this.state.responseStatus) {
        this.setState({ showButtons: false });
        this.setState({ loading: false });
        Alert.alert(
          "The request from " + this.state.fullname + " has been approved."
        );
        return;
      }
    }
    //if there's an error and breaks out of the if statments
    this.setState({ loading: false });
    this.showErroMessage();
  };

  // Declines request to be a user
  declineRequest = () => {
    if (Platform.OS === "android") {
      this.setState({ loading: true });
    }
    this.props.declineUser(
      this.props.user.token, 
      this.state.email, 
      this.props.user.user.email
    );
    this.setState({ showButtons: false });
    this.setState({ loading: false });
    Alert.alert(
      "The request from " + this.state.fullname + " has been declined."
    );
  };

  // Navigate back to Requests page
  onBack = () => {
    Actions.pop();
  };

  render() {
    return (
      <Container>
        <Loader loading={this.state.loading} />
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor="white"
          androidStatusBarStyle="dark-content"
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
            <Title style={ScreenStyleSheet.headerTitle}>View Request</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Info Header */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileSectionTitle}>
                Basic Info
              </Text>
            </View>
          </View>
          {/* Full name */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Full name</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.state.fullname}
              </Text>
            </View>
          </View>
          {/* Email address */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Email address</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.state.email}
              </Text>
            </View>
          </View>
          {/* Date of birth */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Date of Birth</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.state.dob}
              </Text>
            </View>
          </View>
          {/* Age */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Age</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {/* Automatically calculates the age when given date of birth */}
                {Math.floor(
                  (new Date().getTime() - Date.parse(this.state.dob)) /
                    31557600000
                )}
              </Text>
            </View>
          </View>
          {/* Menopausal Stage */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Menopausal Stage</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.state.menopausal_stage}
              </Text>
            </View>
          </View>

          {/* On screen separator */}
          <View style={ScreenStyleSheet.lineSeparator} />

          {/* Preferences header */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileSectionTitle}>
                My Preferences
              </Text>
            </View>
          </View>
          {/* Distance */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>
                Length of Walk (by distance)
              </Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.state.distance} km
              </Text>
            </View>
          </View>
          {/* Duration */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>
                Length of Walk (by duration)
              </Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.state.duration} min
              </Text>
            </View>
          </View>
          {/* Intensity */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Intensity</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.state.intensity}
              </Text>
            </View>
          </View>
          {/* Venue */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Type of Venue</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.state.venue}
              </Text>
            </View>
          </View>
          {/* Location */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfo}>Location</Text>
            </View>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.profileInfoInput}>
                {this.state.location}
              </Text>
            </View>
          </View>

          {this.state.showButtons && (
            <View style={ScreenStyleSheet.rowContainer}>
              {/* Decline button */}
              <TouchableOpacity
                style={[styles.buttonContainer, { borderWidth: 1 }]}
                onPress={this.declineRequest}
              >
                <Text>Decline</Text>
              </TouchableOpacity>
              {/* Approve button */}
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { backgroundColor: "#A680B8", borderColor: "#A680B8" }
                ]}
                onPress={this.approveRequest}
              >
                <Text style={{ color: "white" }}>Approve</Text>
              </TouchableOpacity>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { approveUser, declineUser }
)(ViewRequestScreen);

// Styles
const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey"
  }
});
