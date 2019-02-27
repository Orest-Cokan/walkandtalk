import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

class SearchScreen extends Component {
  render() {
    return (
      <View>
        <Text>On Search Screen!</Text>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(SearchScreen);
