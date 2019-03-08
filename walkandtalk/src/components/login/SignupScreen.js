import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { createUser } from "../../actions/AuthActions";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  StatusBar
} from "native-base";
import { SegmentedControls } from "react-native-radio-buttons";
import DatePicker from 'react-native-datepicker'
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";



class SignupScreen extends Component {
  state = {
    user: "",
    password: "",
    dob: null
  };

  onChangeUser = text => {
    this.setState({
      user: text
    });
  };

  onChangePassword = text => {
    this.setState({
      password: text
    });
  };

  onPressSignUp = () => {
    this.props.createUser(this.state.user, this.state.password);
  };

  onGoBack = () => {
    Actions.pop();
  };

  //Update selected stage of Menopause
  updateStage = stage => {
    this.setState({ stage: stage });
  };

  //render the screen
  render() {

    // All the options displayed in radio buttons
    const intensities = ["Slow", "Intermediate", "Brisk"];
    const venues = ["Indoor", "Outdoor"];
    const menopausal_stage = ["Pre", "Peri", "Post"];


    return (
      <Container>
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor="#A680B8"
          androidStatusBarStyle="light-content"
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title>Sign Up</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={ScreenStyleSheet.content}>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={styles.subHeader}>Basic Information</Text>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>First Name *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput style={ScreenStyleSheet.formInput}/>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Email Address *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput style={ScreenStyleSheet.formInput}/>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Confirm Email Address *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput style={ScreenStyleSheet.formInput}/>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Password *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput style={ScreenStyleSheet.formInput}/>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Confirm Password *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput style={ScreenStyleSheet.formInput}/>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Date of Birth *</Text>
            </View>
            <View style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                style={{width: "100%"}}
                date={this.state.dob}
                mode="date"
                showIcon={false}
                placeholder="Select date of birth"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  placeholderText: {
                     alignItems: "center",
                  }
                }}
                onDateChange={(date) => {this.setState({dob: date})}}
              />
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Menopause Stage *</Text>
            </View>
          </View>
          {/* React-Native radio button as multi option button */}
          <View style={styles.segmentedControls}>
            <SegmentedControls
              tint={"#A680B8"}
              backTint={"#ffffff"}
              optionStyle={{ fontFamily: "AvenirNext-Medium" }}
              selectedOption={menopausal_stage[0]}
              optionContainerStyle={{
                flex: 1,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2
              }}
              options={menopausal_stage}
            />
          </View>

          <View style={ScreenStyleSheet.lineSeparator} />

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={styles.subHeader}>My Preferences</Text>
            </View>
          </View>

          <View style={styles.nestedButtonView}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Length of distance(km) *</Text>
            </View>
            <View>
            <TextInput style={ScreenStyleSheet.formInput}/>
            </View>
          </View>

          <View style={styles.nestedButtonView}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Length of distance(min) *</Text>
            </View>
            <View>
            <TextInput style={ScreenStyleSheet.formInput}/>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Intensity</Text>
            </View>
          </View>
          {/* React-Native radio button as multi option button */}
          <View style={styles.segmentedControls}>
            <SegmentedControls
              tint={"#A680B8"}
              backTint={"#ffffff"}
              optionStyle={{ fontFamily: "AvenirNext-Medium" }}
              selectedOption={intensities[0]}
              optionContainerStyle={{
                flex: 1,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2
              }}
              options={intensities}
            />
          </View>
          {/* Venue */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Type of Venue</Text>
            </View>
          </View>
          {/* React-Native radio button as multi option button */}
          <View style={styles.segmentedControls}>
            <SegmentedControls
              tint={"#A680B8"}
              backTint={"#ffffff"}
              optionStyle={{ fontFamily: "AvenirNext-Medium" }}
              selectedOption={venues[0]}
              optionContainerStyle={{
                flex: 1,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2
              }}
              options={venues}
            />
          </View>

          <View style={ScreenStyleSheet.rowContainer}>
            {/* Cancel button */}
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { borderWidth: 1, borderColor: "black" }
              ]}
              onPress={this.onGoBack}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            {/* Finish button */}
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#A680B8" }]}
              onPress={this.onPressSignUp}
            >
              <Text style={{ color: "white" }}>Submit</Text>
            </TouchableOpacity>
          </View>

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createUser }
)(SignupScreen);

//Styles
const styles = {
  wrapper: {
    flex: 1,
    marginTop: 100
  },
  header: {
    backgroundColor: "#c391d0",
    width: "100%",
    height: 40
  },
  headerText: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20
  },
  subHeader:{
    fontSize:18,
    color: "black",
    marginTop: 5,
    marginBottom:10,
    textAlign: "left"
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 30,
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#c391d0",
    borderRadius: 8
  },
  cancelButton: {
    marginTop: 30,
    marginBottom: 30,
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    backgroundColor: "grey",
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 25,
    paddingRight: 25
  },
  nestedButtonView: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 5
  },
  picker: {
    marginTop: 15,
    marginRight: 5,
    marginLeft: 5
  },

  segmentedControls: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
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
