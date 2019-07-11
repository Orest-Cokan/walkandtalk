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
  Button
} from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { Actions } from "react-native-router-flux";
import BaseCard from "../../cardview/baseCard";
import { fetchAllEvents } from "../../actions/EventActions";
import Loader from "../../constants/loader";

class EventRatingList extends Component {
  constructor(props) {
    super(props);
    this.props.getEvents = this.props.fetchAllEvents(this.props.token);
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    await this.props.fetchAllEvents;
    this.setState({ loading: false });
  }

  eventRatingScreen(index) {
    Actions.eventRatingScreen({
      event: this.props.events[index]
    });
  }

  getPastEvents() {
    let past_events = [];
    this.props.events.map((past_event, index) => {
      past_events.unshift(
        <TouchableOpacity
          key={index}
          onPress={this.eventRatingScreen.bind(this, index)}
        >
          <BaseCard
            key={past_event.id}
            date={past_event.date}
            start_time={past_event.start_time}
            title={past_event.title}
            location={past_event.location.streetName}
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
            <Title style={ScreenStyleSheet.headerTitle}>Ratings/Comments</Title>
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
    events: state.event.all_events,
    user: state.user,
    token: state.token.token
  };
};

export default connect(
  mapStateToProps,
  { fetchAllEvents }
)(EventRatingList);
