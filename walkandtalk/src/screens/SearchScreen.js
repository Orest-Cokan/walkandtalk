import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet,TouchableHighlight,Alert } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons"
import Entypo from "react-native-vector-icons/Entypo"
import BaseCard from "../cardview/baseCard";
import { connect } from "react-redux";

/* 
This is the search screen. Users can search for events in this screen. 
*/
class SearchScreen extends Component {
  //text stores the input from user which is initalized to an empty string.
  state = {
      text: '',
  };
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}> Search </Text>
        </View>
        
        {/* search bar */}
        <View style={styles.box}>
          <Ionicon name='ios-search' style={styles.searchIcon}/>
          <TextInput  
            value={this.state.text}
            placeholder="Search"
            style={styles.placeHolder}
            onChangeText={(text) => this.setState({text})}
          />
          <Entypo 
          name='sound-mix' 
          style={styles.filterIcon}
          />
        </View>

        <Text style={styles.eventNearYou}>Events near you</Text>

        <BaseCard
        time = "WED, MAR 3 AT 10:00PM"
        title = "walking with meeee"
        location = "VVC University"
        />

      </View>
  
      
    );
  }
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: '#c391d0',
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  headerText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  box: {
    height:40,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: "5%",
    paddingBottom:"5%",
    margin: "5%",
    flexDirection: 'row'
  },
  searchIcon: {
    fontSize: 30, 
  },
  placeHolder:{
    height: 80, 
    fontSize:15,
    color: 'grey',
  },
  filterIcon:{
    fontSize: 25, 
    marginLeft: 'auto',
    transform: [{ rotate: '90deg'}]
  },
  eventNearYou: {
    fontSize:20,
    top: 0,
    bottom: 0,
    marginLeft: 20
  }
});


const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(SearchScreen);
