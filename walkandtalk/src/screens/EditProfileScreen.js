import React, { Component } from 'react';
import {
 StyleSheet,
 Text,
 View,
 Image,
 TouchableOpacity,
 ScrollView,
 TextInput
} from 'react-native';
import startMainTabs from "../components/navigation/MainTabNavigator";
import { SegmentedControls } from 'react-native-radio-buttons'

class EditProfileScreen extends Component {

  // Constructor
  constructor(props) {

    super(props);
    
    // State
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
 
  // On save
  saveProfile = () => {
    // Navigate to homescreen
    startMainTabs();

  }

  render() {
    // All the options displayed in radio buttons
    const intensities = [
      'Slow',
      'Intermediate',
      'Brisk'
      ];
    const venues = [
      'Indoor',
      'Outdoor'
    ];
    const menoStages = [
      'Pre',
      'Peri',
      'Post'
    ];
    // Screen
    return (
      <ScrollView>
        {/* Main container */}
        <View style={styles.container}>
          {/* Header container */}
          <View style={styles.headerContent}>
            {/* Profile picture */}
            <Image style={styles.avatar} source={require('../assets/icons/profile.png')}/>
            {/* Add + for changing profile picture */}
          </View>
          {/* Name */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Full Name *</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput style={styles.textInputStyle}>Brittany Taylor</TextInput>
            </View>
          </View>
          {/* Email */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Email Address</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput style={styles.textInputStyle} editable={false}>btaylor@example.com</TextInput>
            </View>
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
              <TextInput style={styles.textInputStyle} editable={false}>January 1, 1955</TextInput>
            </View>
          </View>
          {/* Menopausal Stage */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Menopausal Stage *</Text>
            </View>
          </View>
          {/* React-Native radio button as multi option button */}
          <View style={styles.segmentedControls}>
            <SegmentedControls 
              tint={'#ab76ba'}
              backTint= {'#ffffff'}
              optionStyle={{fontFamily: 'AvenirNext-Medium',}}
              selectedOption={ this.state.menopausalStage }
              optionContainerStyle={{flex: 1, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 2}} 
              options={ menoStages } 
              />
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
              <Text style={styles.textInfoStyle}>Length of Walk (by distance)*</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInputNumber}>10</Text>
              <Text style={styles.textInput}>km</Text>
            </View>
          </View>
          {/* Duration */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Length of Walk (by duration)*</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInputNumber}>60</Text>
              <Text style={styles.textInput}>min</Text>
            </View>
          </View>
          {/* Intensity */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Intensity *</Text>
            </View>
          </View>
          {/* React-Native radio button as multi option button */}
          <View style={styles.segmentedControls}>
            <SegmentedControls 
              tint={'#ab76ba'}
              backTint= {'#ffffff'}
              optionStyle={{fontFamily: 'AvenirNext-Medium',}}
              selectedOption={ this.state.intensity }
              optionContainerStyle={{flex: 1, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 2}} 
              options={ intensities } 
              />
          </View>
          {/* Venue */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Type of Venue *</Text>
            </View>
          </View>
          {/* React-Native radio button as multi option button */}
          <View style={styles.segmentedControls}>
            <SegmentedControls 
              tint={'#ab76ba'}
              backTint= {'#ffffff'}
              optionStyle={{fontFamily: 'AvenirNext-Medium',}}
              selectedOption={ this.state.venue }
              optionContainerStyle={{flex: 1, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 2}} 
              options={ venues } 
              />
          </View>
          {/* Location */}
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Location *</Text>
            </View>
          </View>
          <View style={styles.textInfo}>
              <Text style={styles.textInputStyle}>Riverbend Area</Text>
          </View>
          {/* Options */}
          <View style={styles.row}>
            {/* Cancel button */}
            <TouchableOpacity style={[styles.buttonContainer, {borderWidth: 1, borderColor: 'black'}]}>
              <Text>Cancel</Text> 
            </TouchableOpacity>
            {/* Save button */}
            <TouchableOpacity style={[styles.buttonContainer,{backgroundColor: '#ab76ba'}]} onPress={this.saveProfile}>
              <Text style={{color: 'white'}}>Save Changes</Text>
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
  textInputContainer: {
    height: 40,
    marginTop: -15,
    marginBottom: 15
  },
  textInputStyle: {
    marginRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  textInputNumber:{
    marginRight: 45,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    textAlign: 'center',
    marginLeft: 65

  },
  segmentedControls: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  buttonContainer: {
    marginTop: 10,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 150,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 10,
  }
});

export default EditProfileScreen;
