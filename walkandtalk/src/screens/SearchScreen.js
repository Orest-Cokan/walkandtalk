import React, { Component } from "react";
<<<<<<< HEAD
import { View, Text, TextInput, StyleSheet,TouchableHighlight,Alert } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons"
import Entypo from "react-native-vector-icons/Entypo"
import BaseCard from "../cardview/baseCard";
=======
import { View, Text } from "react-native";
import { connect } from "react-redux";
>>>>>>> firebase

class SearchScreen extends Component {
  state = {
      text: '',
      modalVisible: false
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

<<<<<<< HEAD

const styles = StyleSheet.create({
  modalView: {
    height: "50%",
    width: "60%",
  },
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
    height:50,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'grey',
    alignItems: 'center',
    padding: 10,
    margin: 20,
    flexDirection: 'row'
  },
  searchIcon: {
    fontSize: 40, 
  },
  placeHolder:{
    height: 80, 
    fontSize:25,
    color: 'grey'
  },
  filterIcon:{
    fontSize: 30, 
    marginLeft: 'auto',
    transform: [{ rotate: '90deg'}]
  },
  popUp:{
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'grey',
    width: 380,
    height: 500,
    padding: 10,
    margin: 100
  },
  eventNearYou: {
    fontSize:25,
    top: 0,
    bottom: 0,
    marginLeft: 20
  }
});


export default SearchScreen;
=======
const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(SearchScreen);
>>>>>>> firebase
