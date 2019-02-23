import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import BaseCard from "../cardview/baseCard";

class HomeScreen extends Component {
  render() {
    return (
      <BaseCard
        time = "WED, MAR 3 AT 10:00PM"
        title = "walking with meeee"
        location = "VVC University"
      >
      </BaseCard>

    );
  }
}

export default HomeScreen;
