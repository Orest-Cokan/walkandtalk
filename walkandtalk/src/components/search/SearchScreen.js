import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import BaseCard from "../../cardview/baseCard";
import { connect } from "react-redux";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content
} from "native-base";

/*
This is the search screen. Users can search for events in this screen.
*/
class SearchScreen extends Component {
  //text stores the input from user which is initalized to an empty string.
  state = {
    text: ""
  };

  render() {
    return (
      <Container>
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor="#A680B8"
          androidStatusBarStyle="light-content"
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title>Search</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Search bar */}
          <View style={styles.box}>
            <Ionicon name="ios-search" style={styles.searchIcon} />
            <TextInput
              value={this.state.text}
              placeholder="Search"
              style={styles.placeHolder}
              onChangeText={text => this.setState({ text })}
            />
            <Entypo name="sound-mix" style={styles.filterIcon} />
          </View>
          <View style={ScreenStyleSheet.lineSeparator} />
          <Text style={ScreenStyleSheet.sectionTitle}>Events near you</Text>
          <BaseCard
            time="WED, MAR 3 AT 10:00PM"
            title="Weekly Walk"
            location="Van Vliet Centre"
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "grey",
    justifyContent: "center",
    paddingHorizontal: 15,
    flexDirection: "row",
    marginBottom: 10
  },
  searchIcon: {
    fontSize: 25
  },
  placeHolder: {
    height: 40,
    fontSize: 15,
    color: "grey"
  },
  filterIcon: {
    fontSize: 25,
    marginLeft: "auto",
    transform: [{ rotate: "90deg" }]
  }
});

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(SearchScreen);
