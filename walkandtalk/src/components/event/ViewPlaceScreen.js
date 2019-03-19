import React, { Component } from 'react';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

class ViewPlaceScreen extends Component {
  openSearchModal() {
    console.log(RNGooglePlaces)
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
		console.log(place);
		// place represents user's selection from the
		// suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}
        >
          <Text>Search address</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(ViewPlaceScreen);

const styles = StyleSheet.create({
button: {
  width: 50,
  height:50,
  marginTop: 200,
  marginLeft: 100
},
container: {
  flex: 1,
}
});