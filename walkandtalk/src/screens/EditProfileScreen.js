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

class EditProfileScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar} source={require('../assets/icons/profile.png')}/>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Full Name *</Text>
            </View>
            <View style={styles.textInfo}>
              <TextInput style={styles.textInputStyle}>Brittany Taylor</TextInput>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Email Address</Text>
            </View>
            <View style={styles.textInfo}>
              <TextInput style={styles.textInputStyle} editable={false}>btaylor@example.com</TextInput>
            </View>
          </View>

          <View style={styles.seperator}/>

          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textHeader}>Basic Info</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Date of Birth</Text>
            </View>
            <View style={styles.textInfo}>
              <TextInput style={styles.textInputStyle} editable={false}>January 1, 1955</TextInput>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Menopausal Stage *</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInputStyle}>Import react-native-radio-buttons</Text>
            </View>
          </View>

          <View style={styles.seperator}/>

          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textHeader}>My Preferences</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Length of Walk (by distance)</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInputNumber}>10</Text>
              <Text style={styles.textInput}>km</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Length of Walk (by duration)</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInputNumber}>60</Text>
              <Text style={styles.textInput}>min</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Intensity</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInputStyle}>import react-native-radio-buttons</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Type of Venue</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>Indoor</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Location</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInputStyle}>Riverbend Area</Text>
            </View>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Cancel</Text>  
            </TouchableOpacity>              
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Save</Text> 
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

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
  buttonContainer: {
    marginTop: 10,
    height: 30,
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

export default EditProfileScreen;