import React, { Component } from "react";
import { Text, StyleSheet, TouchableHighlight, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { Container, Content } from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

/*
This is the search screen. Users can search for events in this screen.
*/
class SearchMapViewScreen extends Component {
  //text stores the input from user which is initalized to an empty string.
  //
  constructor(props) {
    super(props);
    this.state = {
      defaultCoords: {
        latitude: 53.5325,
        longitude: -113.4964,
        latitudeDelta: 0.252,
        longitudeDelta: 0.00421
      }
    };
  }
  //Function for navigating to view the selected event
  goToEvent = event => {
    let badge = null;
    if (this.props.user.user.email == event.email) {
      badge = "HOSTING";
    } else {
      for (let i = 0; i < event.attendees.length; i++) {
        if (event.attendees[i].email == this.props.user.user.email) {
          badge = "GOING";
          break;
        }
      }
    }
    Actions.viewEvent({
      event: event,
      badge: badge
    });
  };

  showMarkers() {
    if (this.props.results.length == 0) {
      markers = this.props.events;
    } else {
      markers = this.props.results;
    }
    return markers.map((event, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: event.location.lat,
          longitude: event.location.long
        }}
        pinColor={
          event.intensity == "Slow"
            ? "green"
            : event.intensity == "Intermediate"
            ? "yellow"
            : event.intensity == "Brisk"
            ? "red"
            : "purple"
        }
      >
        <Callout onPress={() => this.goToEvent(event)}>
          <TouchableHighlight underlayColor="transparent">
            <Text>{event.title + "\n" + "Date: " + event.date}</Text>
          </TouchableHighlight>
        </Callout>
      </Marker>
    ));
  }

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={[ScreenStyleSheet.content, { flex: 1 }]}
        >
          {/* Map View */}
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation={false}
            initialRegion={this.state.defaultCoords}
            onRegionChange={this.props.onRegionChange}
          >
            {this.showMarkers()}
          </MapView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: 40,
    width: Dimensions.get("screen").width - 70,
    borderWidth: 1,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    borderColor: "grey",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "flex-start",
    position: "absolute"
  },
  boxWithFilter: {
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10
  },
  placeHolder: {
    marginLeft: 3,
    height: 40,
    fontSize: 15,
    color: "grey",
    width: "75%"
  },
  filterIcon: {
    fontSize: 25,
    marginLeft: "auto",
    transform: [{ rotate: "90deg" }]
  },
  map: {
    height: "92%"
  },
  container: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    events: state.event.nonUserEvents,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(SearchMapViewScreen);
