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
import Loader from "../../constants/loader";

class PastEventListScreen extends Component {
  constructor(props) {
    super(props);
    this.props.getRecords = this.props.getRecords(
      this.props.user.token,
      this.props.user.user.email
    );
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    await this.props.getRecords;
    this.setState({loading: false})
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
    return past_events;
  }

  onBack = () => {
    Actions.pop();
  };
  render() {
    return (
      <Container>
        <Loader loading={this.state.loading} />
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
        {!this.state.loading && (
        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {this.getPastEvents()}
        </Content>
        )}
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
  { getRecords }
)(PastEventListScreen);