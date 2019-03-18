// Past Event List Screen View
import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
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
import { getCompletedRecords } from "../../actions/RecordActions";

class PastEventListScreen extends Component {
  constructor(props) {
    super(props);
    console.log("inside constructor");
    console.log("before", this.props);
    this.props.getCompletedRecords = this.props.getCompletedRecords(
      this.props.user.user.email
    );
    console.log("after", this.props);
  }

  componentDidMount() {
    this.props.getCompletedRecords;
    console.log("componentmount", this.props);
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
          {this.getEvents()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("pastrecordlistscreen");
  return {
    records: state.record.completed_records,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getCompletedRecords }
)(PastEventListScreen);
