import React, { Component } from 'react';
import {
 StyleSheet,
 Text,
 View,
 Image,
 TouchableOpacity,
 TouchableHighlight,
 ScrollView
} from 'react-native';
import { goEditProfile } from '../components/navigation/InitialNavigator';

// Profile tab
class ProfileScreen extends Component {

  constructor(props) {
    super(props);

    // Set state on inital profile signup
    this.state = {
      name: 'Brittany Taylor',
      dob: 'January 1, 1955',
      menopausalStage: 'Peri',
      distance: 10,
      duration: 60,
      intensity: 'Intermediate',
      venue: 'Indoor',
      location: 'Riverbend Area'
    };
  }

  // When edit profile icon is clicked
  editProfile = () => {
    // Navigate to edit profile
    goEditProfile();
  }
  render() {

    return (
      <ScrollView>
        {/* Main container */}
        <View style={styles.container}>
          {/* Header container */}
          <View style={styles.headerContent}>
          {/* Edit profile icon  */}
          <View style={styles.edit}>
            <TouchableHighlight onPress={this.editProfile} underlayColor={'transparent'} activeOpacity={0}>
              <Image style={styles.editIcon} source={require('../assets/icons/edit.png')}/>
            </TouchableHighlight>
          </View>
          {/* Profile picture */}
          <Image style={styles.avatar} source={require('../assets/icons/profile.png')}/>
          {/* User's name */}
          <Text style={styles.name}>{this.state.name}</Text>
          </View>
          {/* On screen seperator */}
          <View style={styles.seperator}/>

          {/* Info Header */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textHeader}>Basic Info</Text>
            </View>
          </View>
          {/* Date of birth */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Date of Birth</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.dob}</Text>
            </View>
          </View>
          {/* Age */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Age</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>
              {/* Automatically calculates the age when given date of birth */}
              {Math.floor((new Date().getTime()-Date.parse(this.state['dob']))/31557600000)}</Text>
            </View>
          </View>
          {/* Menopausal Stage */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Menopausal Stage</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.menopausalStage}</Text>
            </View>
          </View>

          {/* On screen seperator */}
          <View style={styles.seperator}/>

          {/* Preferences header */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textHeader}>My Preferences</Text>
            </View>
          </View>
          {/* Distance */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Length of Walk (by distance)</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.distance} km</Text>
            </View>
          </View>
          {/* Duration */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Length of Walk (by duration)</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.duration} min</Text>
            </View>
          </View>
          {/* Intensity */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Intensity</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.intensity}</Text>
            </View>
          </View>
          {/* Venue */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Type of Venue</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.venue}</Text>
            </View>
          </View>
          {/* Location */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Location</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.location}</Text>
            </View>
          </View>
          {/* Options */} 
          <View style={styles.row}>
            {/* Button to help links */}
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Help Line Links</Text> 
            </TouchableOpacity>           
            {/* Button to past events */}
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Past Events</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  headerContent: {
    padding: 20,
    alignItems: 'center',
    marginTop: 40
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'black',
    marginBottom: 10,
  },
  edit: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 100,
  },
  editIcon:{
    height: 30,
    width: 30,
    marginRight: 20
  },
  seperator: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  textInfo: {
    flex: 1,
    marginLeft: 15,
    marginBottom: 5
  },
  name: {
    fontSize: 20,
    color: 'black',
    fontWeight:'500',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'gray',
  },
  textInfoStyle: {
    fontSize: 13,
    color: "gray",

  },
  textInput: {
    textAlign: 'right',
    marginRight: 15,
    color: 'black'

  },
  buttonContainer: {
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 15,
    marginRight: 10
  },

});

export default ProfileScreen;
