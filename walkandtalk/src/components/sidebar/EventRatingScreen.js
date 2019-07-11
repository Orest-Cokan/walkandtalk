// View Past Event Record Screen
import React, { Component } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Accordion,
  Button
} from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { Actions } from "react-native-router-flux";
import { StyledText as Text } from "../../constants/StyledText";
import MapView from "react-native-maps";

class EventRatingScreen extends Component {
  constructor(props) {
    super(props);
    console.log(JSON.stringify(this.props.event.reviews) + "what is this");
    this.state = {
      organizer: this.props.event.organizer,
      title: this.props.event.title,
      date: this.props.event.date,
      startTime: this.props.event.start_time,
      endTime: this.props.event.end_time,
      location: this.props.event.location.streetName,
      long: this.props.event.location.long,
      lat: this.props.event.location.lat,
      numAttendees: this.props.event.total_attendees,
      completed: this.props.event.completed,
      venue: this.props.event.venue,
      distance: this.props.event.distance,
      duration: this.props.event.duration,
      intensity: this.props.event.intensity,
      walkRating: this.props.event.walk_rating,
      locationRating: this.props.event.location_rating,
      reviews: this.props.event.reviews
    };
  }

  onBack = () => {
    // Navigate back to Past Events List screen
    Actions.pop();
  };

  getArray = reviews => {
    var dataArray = [];
    let i = 1;
    reviews.forEach(review => {
      dataArray.push({
        title: "Anonymous User #" + i,
        content: review.location_comment
      });
      i++;
    });
    console.log(JSON.stringify(dataArray) + "this is our data array");
    return dataArray;
  };

  render() {
    console.log(this.state.long, this.state.lat);
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
            <Title style={ScreenStyleSheet.headerTitle}>
              {this.state.title}
            </Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Event info */}

          {/* Date and time */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.eventTimeInfo}>
                {this.state.date.toUpperCase()} {" AT "}
                {this.state.startTime.toUpperCase()} {" - "}
                {this.state.endTime.toUpperCase()}
              </Text>
            </View>
          </View>
          {/* Title */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.eventTitleInfo}>
                {this.state.title}
              </Text>
            </View>
          </View>
          {/* Location */}
          <View style={ScreenStyleSheet.rowContainer}>
            <Image
              style={ScreenStyleSheet.iconByInfo}
              source={require("../../assets/icons/pin.png")}
            />
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.infoByIcon}>
                {this.state.location}
              </Text>
            </View>
          </View>
          {/* Organizer */}
          <View style={ScreenStyleSheet.rowContainer}>
            <Image
              style={ScreenStyleSheet.iconByInfo}
              source={require("../../assets/icons/default-profile.png")}
            />
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.infoByIcon}>
                {this.state.organizer}
              </Text>
            </View>
          </View>
          {/* Number of attendees */}
          <View style={ScreenStyleSheet.rowContainer}>
            <Image
              style={ScreenStyleSheet.iconByInfo}
              source={require("../../assets/icons/user-group.png")}
            />
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.numAttendees}>
                {this.state.numAttendees} people
                <Text> attended this event.</Text>
              </Text>
            </View>
          </View>

          <MapView
            style={ScreenStyleSheet.map}
            initialRegion={{
              latitude: this.state.lat,
              longitude: this.state.long,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0421
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.lat,
                longitude: this.state.long
              }}
            >
              <View style={ScreenStyleSheet.radius}>
                <View style={ScreenStyleSheet.marker} />
              </View>
            </MapView.Marker>
          </MapView>

          {/* On screen separator */}
          <View style={ScreenStyleSheet.lineSeparator} />

          {/* Accordian View*/}
          <View>
            <Accordion
              dataArray={this.getArray(this.state.reviews)}
              icon="add"
              expandedIcon="remove"
              iconStyle={{ color: "green" }}
              expandedIconStyle={{ color: "red" }}
              contentStyle={{ backgroundColor: "white" }}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(EventRatingScreen);
