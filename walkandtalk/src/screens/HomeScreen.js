import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import BaseCard from "../cardview/baseCard";
import { connect } from "react-redux";

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}> Your Events </Text>
        </View>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}
        >
          <BaseCard
            time="WED, MAR 3 AT 10:00PM"
            title="Walk with me!"
            location="VVC University"
            badge="GOING"
          />
          <BaseCard
            time="SAT, MAR 17 AT 9:00AM"
            title="Morning Stroll"
            location="River Valley"
            badge="HOSTING"
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(HomeScreen);

const styles = StyleSheet.create({
  scroll: {
    width: "100%"
  },
  scrollContainer: {
    width: "100%"
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f3edfa"
  },
  header: {
    backgroundColor: "#c391d0",
    width: "100%",
    height: 50
  },
  headerText: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  }
});
