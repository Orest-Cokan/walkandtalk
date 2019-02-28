import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import BaseCard from "../cardview/baseCard";
import QuestionnaireCard from "../cardview/questionnaireCard";
import { connect } from "react-redux";

/* 
This is the forms screen. Users will see the two static questionnaires and event records to be completed. 
*/
class FormScreen extends Component {
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}> Your Forms </Text>
        </View>
        <Text style={styles.title}>Questionnaires</Text>
        <QuestionnaireCard quesOne="MENQOL" quesTwo="Symptom Severity" />
        <View style={styles.seperator} />
        <Text style={styles.title}>Records</Text>
        <BaseCard
          time="WED, MAR 3 AT 10:00PM"
          title="walking with meeee"
          location="VVC University"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#c391d0",
    width: "100%",
    height: 50,
    justifyContent: "center"
  },
  headerText: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  seperator: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5
  },
  title: {
    fontSize: 20,
    marginTop: "3%",
    marginLeft: "5%"
  }
});

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(FormScreen);
