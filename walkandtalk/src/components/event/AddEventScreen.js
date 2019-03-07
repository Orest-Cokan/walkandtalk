// Create Event Screen View
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { connect } from "react-redux";
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

class AddEventScreen extends Component {
  // Screen switches to Home page while saving form values

  // Screen switches to Home page without saving form values
  constructor(props) {
    super(props);

    // State
    this.state = {
      date: null,
      startTime: null,
      endTime: null
    }

  }

  render() {
    // All the options displayed in radio buttons
    const intensities = ["Slow", "Intermediate", "Brisk"];
    const venues = ["Indoor", "Outdoor"];

    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor="#A680B8"
          androidStatusBarStyle="light-content"
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title>Create Event</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Event name */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Event name *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput style={ScreenStyleSheet.formInput}/>
            </View>
          </View>
          {/* Date */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Date *</Text>
            </View>
            <View style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                style={{width: "100%"}}
                date={this.state.date}
                mode="date"
                showIcon={false}
                placeholder="Select date"
                format="ddd, MMM D"
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                }}
                onDateChange={(date) => {this.setState({date: date})}}
              />
            </View>
          </View>
          {/* Start time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Start time *</Text>
            </View>
            <View style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                style={{width: "100%"}}
                date={this.state.startTime}
                mode="time"
                showIcon={false}
                placeholder="Select start time"
                format="h:mm a"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  placeholderText: {
                     alignItems: "center",
                  }
                }}
                onDateChange={(date) => {this.setState({startTime: date})}}
              />
            </View>
          </View>
          {/* End time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>End time *</Text>
            </View>
            <View style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                style={{width: "100%"}}
                date={this.state.endTime}
                mode="time"
                showIcon={false}
                placeholder="Select end time"
                format="h:mm a"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  placeholderText: {
                     alignItems: "center",
                  }
                }}
                onDateChange={(date) => {this.setState({endTime: date})}}
              />
            </View>
          </View>
          {/* Description */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Description</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formDescriptionInput}
                multiline = {true}
                numberOfLines = {4}
                maxLength = {140}
              />
            </View>
          </View>
          {/* Intensity */}
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
          {/* Location */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>Location *</Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <TextInput style={ScreenStyleSheet.formInput}/>
            </View>
          </View>
          {/* Options */}
          <View style={ScreenStyleSheet.rowContainer}>
            {/* Cancel button */}
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { borderWidth: 1, borderColor: "black" }
              ]}
              //onPress={}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            {/* Finish button */}
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#A680B8" }]}
              //onPress={}
            >
              <Text style={{ color: "white" }}>Finish</Text>
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
)(AddEventScreen);

// Styles
const styles = StyleSheet.create({
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
});