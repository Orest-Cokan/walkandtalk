import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

import MapView, { PROVIDER_GOOGLE, Marker} from "react-native-maps";

// defaults to San Francisco on simulators
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position =>
      resolve(position),
      e => reject(e));
  });
};

class ViewMapScreen extends Component {

  constructor(props) {
    super(props);
    this.mapRef = null
    this.state = {
      currentLatitude: 0,
      currentLongitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
      markers: [
        {
          key: 1,
          title: 'University of Alberta Walk',
          description: 'Walking around university',
          coordinates: {
            latitude: 37.784724,
            longitude: -122.404327,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
        },
        {
          key: 2,
          title: 'Hawrelak Park Walk',
          description: 'Walking around the park',
          coordinates: {
            latitude: 37.786944,
            longitude: -122.406307,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
        },
      ]
    };
  }

  componentDidMount() {
    this.mapRef.fitToSuppliedMarkers(
      this.state.markers,
      false,
    );
  }

  async componentWillMount() {
    const position = await getCurrentLocation();
    if (position) {
      this.setState({
        currentLatitude: position.coords.latitude,
        currentLongitude: position.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      });
    }
  }


  onEventClick = () => {
    // Navigate to edit profile
    Actions.signup();
  };



  fitToMarkersToMap() {
    const markers = this.state.markers;
    this.mapRef.fitToSuppliedMarkers(markers.map(marker => marker.key), true);
  } 

  render() {
    return(
      <View style={styles.container}>
          <MapView
              ref={(ref) => { this.mapRef = ref }}
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              showsUserLocation={true}
              onLayout = {() => this.fitToMarkersToMap()}
              region={{
                  latitude: this.state.currentLatitude,
                  longitude: this.state.currentLongitude,
                  latitudeDelta: this.state.latitudeDelta,
                  longitudeDelta: this.state.longitudeDelta
              }}>
            {this.state.markers.map((marker) => (
              <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinates}
              ref={marker => {
                this.marker = marker;
              }}
              // onPress={() => {console.log("Marker/onPress");}}
              >
              <MapView.Callout onPress={() => this.onEventClick()}>
                <TouchableHighlight
                  underlayColor="transparent"
                >
                  <Text>{marker.title}{"\n"}{marker.description}</Text>
                </TouchableHighlight>
              </MapView.Callout>
            </MapView.Marker>
            ))}
          </MapView>
      </View>
    );
  }
}

  const mapStateToProps = state => state;

  export default connect(
    mapStateToProps,
    null
  )(ViewMapScreen);

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1,
  }
});