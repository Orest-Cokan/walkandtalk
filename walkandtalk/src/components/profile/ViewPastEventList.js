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
} from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { Actions } from "react-native-router-flux";
import BaseCard from "../../cardview/baseCard";
import { getRecords } from "../../actions/RecordActions";

class PastEventListScreen extends Component {
  constructor(props) {
    super(props);
    this.props.getRecords = this.props.getRecords(
      this.props.user.user.email
    );
  }

  componentDidMount() {
    this.props.getRecords;
  }

  viewPastEvent(index) {
    Actions.viewPastEvent({
      record: this.props.records[index]
    });
  }

  getPastEvents() {
    let past_events = [];
    this.props.records.map((past_event, index) => {
      past_events.unshift(
        <TouchableOpacity
          key={index}
          onPress={this.viewPastEvent.bind(this, index)}
        >
          <BaseCard
            key={past_event.id}
            date={past_event.date}
            start_time={past_event.start_time}
            title={past_event.title}
            location={past_event.location}
          />
        </TouchableOpacity>
      );
    });
    console.log(this.props);
    return past_events;
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
        androidStatusBarColor={"white"}
        iosBarStyle={"dark-content"}
      >
          <Left style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.onBack}>
              <Image
                style={ScreenStyleSheet.headerIcon}
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
          {this.getPastEvents()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("pastrecordlistscreen");
  return {
    records: state.record.records,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getRecords }
)(PastEventListScreen);