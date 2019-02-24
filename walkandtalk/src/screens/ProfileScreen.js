import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

class ProfileScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar} source={require('../assets/icons/profile.png')}/>
              <Text style={styles.name}>Brittany Taylor</Text>
          </View>
          <View style={styles.seperator}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.textInfo}>
                <Text style={styles.textHeader}>Basic Info{"\n"}{"\n"}</Text>
                <Text>Date of Birth{"\n"}{"\n"}</Text>
                <Text>Age{"\n"}{"\n"}</Text>
                <Text>Menopausal Stage{"\n"}</Text>
              </Text>
            </View>
            <View style={styles.seperator}/>
            <View style={styles.bodyContent}>
            <Text style={styles.textInfo}>
                <Text style={styles.textHeader}>My Preferences{"\n"}{"\n"}</Text>
                <Text>Length of Walk (by distance){"\n"}{"\n"}</Text>
                <Text>Length of Walk (by duration){"\n"}{"\n"}</Text>
                <Text>Intensity{"\n"}{"\n"}</Text>
                <Text>Type of Venue{"\n"}{"\n"}</Text>
                <Text>Location{"\n"}</Text>
              </Text>
            </View>
          </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Help Line Links</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Past Events</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerContent: {
    padding:20,
    alignItems: 'center',
    marginTop: 40
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "black",
    marginBottom: 10,
  },
  seperator: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginLeft: 10,
    marginRight: 10
  },
  name: {
    fontSize: 20,
    color: 'black',
    fontWeight:'500',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  textHeader: {
    fontWeight: 'bold'
  },
  textInfo: {
    fontSize: 13,
    color: "gray",
  },
  bodyContent: {
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 15
  },
  buttonContainer: {
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width:150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    marginLeft: 15,
    marginRight: 10
  },
});
  

export default ProfileScreen;