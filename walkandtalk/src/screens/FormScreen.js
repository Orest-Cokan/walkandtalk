import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import BaseCard from "../cardview/baseCard";
import { connect } from "react-redux";

class FormScreen extends Component {
  render() {
    return (
      <View>
        <Text style={styles.heading}>Questionnaires</Text>
        <View style={styles.questionnaires}>
          <Text style={styles.quesText}>Questionnaire A</Text>
        </View>
        <View style={styles.questionnaires}>
          <Text style={styles.quesText}>Questionnaire B</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.heading}>Records</Text>
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
  line: {
    borderWidth: 0.5,
    borderColor: "grey",
    width: 380,
    height: 0,
    margin: 10
  },
  heading: {
    fontSize: 25,
    top: 0,
    bottom: 0,
    marginLeft: 20
  },
  questionnaires: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "grey",
    width: 380,
    height: 50,
    padding: 10,
    margin: 10
  },
  quesText: {
    fontWeight: "bold",
    fontSize: 20,
    margin: "auto"
  }
});

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(FormScreen);
