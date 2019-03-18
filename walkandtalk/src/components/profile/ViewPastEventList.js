// Past Event List Screen View
import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
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
import { fetchCompletedRecords } from "../../actions/RecordActions";

class PastEventListScreen extends Component {
  constructor(props) {
    super(props);
    console.log("inside constructor");
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
  }

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
          {/* Card List View */}
          {this.getRecords()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    records: state.record.records,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchCompletedRecords }
)(PastEventListScreen);
