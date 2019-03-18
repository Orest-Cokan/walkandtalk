// Past Event List Screen View
import React, { Component } from "react";
<<<<<<< HEAD
import { StyleSheet, View, Image } from "react-native";
=======
import { Image, TouchableOpacity } from "react-native";
>>>>>>> 5cd899262b1636db64d0e2f5ac7c3f2b7a836c46
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Button,
  StatusBar
} from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { Actions } from "react-native-router-flux";
import BaseCard from "../../cardview/baseCard";
<<<<<<< HEAD
import { fetchCompletedRecords } from "../../actions/RecordActions";
=======
import { getCompletedRecords } from "../../actions/RecordActions";
>>>>>>> 5cd899262b1636db64d0e2f5ac7c3f2b7a836c46

class PastEventListScreen extends Component {
  constructor(props) {
    super(props);
    console.log("inside constructor");
<<<<<<< HEAD
    this.props.fetchCompletedRecords(this.props.user.user.email);
  }

  onBack = () => {
    Actions.pop();
  };

  getRecords() {
    let records = [];
    this.props.records.map(record => {
      console.log(record);
      records.unshift(
        <BaseCard
          key={record.id}
          date={record.date}
          title={record.title}
          location={record.location}
          start_time={record.start_time}
        />
      );
    });
    return records;
=======
    console.log("before", this.props);
    this.props.getCompletedRecords = this.props.getCompletedRecords(
      this.props.user.user.email
    );
    console.log("after", this.props);
  }

  componentDidMount() {
    this.props.getCompletedRecords;
    console.log("componentmount", this.props);
>>>>>>> 5cd899262b1636db64d0e2f5ac7c3f2b7a836c46
  }

  getEvents() {
    let records = [];
    this.props.records.map(record => {
      records.unshift(
        <BaseCard
          key={record.id}
          date={record.date}
          start_time={record.start_time}
          title={record.title}
          location={record.location}
        />
      );
    });
    console.log("end", this.props);
    return records;
  }

  onBack = () => {
    Actions.pop();
  };
  render() {
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor="white"
          androidStatusBarStyle="dark-content"
        >
          <Left style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.onBack}>
              <Image
                style={ScreenStyleSheet.backIcon}
                source={require("../../assets/icons/back-button.png")}
              />
            </Button>
          </Left>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Past Events</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
<<<<<<< HEAD
          {/* Card List View */}
          {this.getRecords()}
=======
          {this.getEvents()}
>>>>>>> 5cd899262b1636db64d0e2f5ac7c3f2b7a836c46
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
<<<<<<< HEAD
  return {
    records: state.record.records,
=======
  console.log("pastrecordlistscreen");
  return {
    records: state.record.completed_records,
>>>>>>> 5cd899262b1636db64d0e2f5ac7c3f2b7a836c46
    user: state.user
  };
};

export default connect(
  mapStateToProps,
<<<<<<< HEAD
  { fetchCompletedRecords }
=======
  { getCompletedRecords }
>>>>>>> 5cd899262b1636db64d0e2f5ac7c3f2b7a836c46
)(PastEventListScreen);
