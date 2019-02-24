import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import BaseCard from "../cardview/baseCard";

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
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
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f3edfa"
  }
});

export default HomeScreen;
