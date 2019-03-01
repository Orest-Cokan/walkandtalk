// Create Event Screen View
import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Text, Button, StatusBar } from "react-native";
import { connect } from "react-redux";
import { Container, Header, Left, Body, Title, Right, Content } from "native-base";
import GenerateForm from "react-native-form-builder";
import startMainTabs from "../components/navigation/MainTabNavigator";
import ScreenStyleSheet from "../constants/ScreenStyleSheet";

class AddEventScreen extends Component {

  // Screen switches to Home page while saving form values
  finish() {
    const formValues = this.formGenerator.getValues();
    console.log("FORM VALUES", formValues);
    startMainTabs();
  }

  // Screen switches to Home page without saving form values
  cancel() {
    startMainTabs();
  }

  render() {
    return (
      <Container>
        {/* Header */}
        <Header style={ScreenStyleSheet.header}>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title>Create Event</Title>
          </Body>
        </Header>

        <Content>
          {/* Generates the form */}
          <GenerateForm
            ref={c => {
              this.formGenerator = c;
            }}
            fields={fields}
          />
          {/* Finish and cancel buttons */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.leftRightButton}>
              <Button
                onPress={() => this.cancel()}
                title="Cancel"
                color="#9B9B9B"
              />
            </View>
            <View style={ScreenStyleSheet.leftRightButton}>
              <Button
                onPress={() => this.finish()}
                title="Finish"
                color='#A680B8'
              />
            </View>
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

// Fields for the form
const fields = [
  {
    type: "text",
    name: "event_name",
    required: true,
    label: "Event name",
    props: {
      style: {
        height: 40
      }
    }
  },
  {
    type: "date",
    mode: "date",
    name: "Date",
    required: true,
    minDate: new Date(),
    label: "Date",
    placeholder: "Select date"
  },
  {
    type: "date",
    mode: "time",
    name: "Start time",
    required: true,
    label: "Start time"
  },
  {
    type: "date",
    mode: "time",
    name: "End time",
    required: true,
    label: "End time"
  },
  {
    type: "text",
    name: "description",
    label: "Description",
    required: false,
    props: {
      multiline: true,
      numberOfLines: 5,
      maxLength: 140,
      style: {
        borderWidth: 1,
        textAlignVertical: "top",
        borderColor: "#D9D5DC",
        marginTop: 20
      }
    }
  },

  {
    type: "picker",
    name: "intensity",
    mode: "dropdown",
    label: "Intensity",
    defaultValue: "Slow",
    required: true,
    options: ["Slow", "Intermediate", "Brisk"],
    props: {
      style: {
        width: 160
      }
    }
  },
  {
    type: "picker",
    name: "type_of_venue",
    required: false,
    mode: "dropdown",
    label: "Type of venue",
    defaultValue: "Indoor",
    options: ["Indoor", "Outdoor"]
  },
  {
    type: "text",
    name: "location",
    required: true,
    label: "Location"
  }
];

AppRegistry.registerComponent("FormGenerator", () => FormGenerator);
