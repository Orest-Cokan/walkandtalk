import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

/* 
This is the view for event card.
Parameters: Time, title, locaiton and badge(optional) of the event. 
Returns: The list view that contains information about the event.
*/

class BaseCard extends Component {
  /* 
  This is funtion checks if badge is null. 
  Parameters: Time, title, locaiton and badge of the event. 
  Returns: if badge is null, returns the card view without the badge. 
  Else, calls change badge colour to determine the colour of the badge. 
  */
  checkIfBadge=()=>{
    if (!this.props.badge){
      return (
        <View style={styles.card}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTime}>{this.props.time}</Text>
            <Text style={styles.eventTitle}>{this.props.title}</Text>
            <Text style={styles.eventLocation}>{this.props.location}</Text>
          </View>
        </View>
      );
    }
    else{
      return this.changeBadgeColour();
    }
  }
  /* 
  This is funtion determines the colour of the badge and returns a card view with the badge. 
  Parameters: Time, title, locaiton and badge of the event. 
  Returns: if badge is 'going', returns the card view with a green badge. 
  if the badge is 'hosting', returns the card view with a blue badge. 
  */
  changeBadgeColour=()=>{
    if (this.props.badge.toUpperCase()=="GOING"){
      return (
        <View style={styles.card}>
          <View style={styles.eventInfo}>
            <View style={styles.withBadge}>
              <Text style={styles.eventTime}>{this.props.time}</Text>
              <Text style={[styles.going, styles.Badge]}>{this.props.badge}</Text>
            </View>
            <Text style={styles.eventTitle}>{this.props.title}</Text>
            <Text style={styles.eventLocation}>{this.props.location}</Text>
            
          </View>
        </View>
      );

    }
    else if (this.props.badge.toUpperCase()=="HOSTING"){
      return (
        <View style={styles.card}>
          <View style={styles.eventInfo}>
            <View style={styles.withBadge}>
              <Text style={[styles.eventTime, styles.cardText]}>{this.props.time}</Text>
              <Text style={[styles.hosting, styles.Badge, styles.cardText]}>{this.props.badge}</Text>
            </View>
            <Text style={[styles.cardText, styles.eventTitle]}>{this.props.title}</Text>
            <Text style={styles.cardText}>{this.props.location}</Text>
            
          </View>
        </View>
      );
    }
  }

    render() {
        return this.checkIfBadge();
      }
}

const styles = StyleSheet.create({

    card: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: 'grey',
      width: "90%",
      height: 80,
      paddingHorizontal: "5%",
      marginHorizontal:"5%",
      marginTop:"5%",
      justifyContent: 'center',
    },
    eventInfo:{
      justifyContent: 'center',
    },
    cardText:{
      fontSize:15,
      left:0,
      top:0,
    },
    eventTime: {
      color: '#A680B8'
    },
    eventTitle: {
      fontWeight: 'bold'
    },
    withBadge:{
      width: "100%",
      margin: 0,
      padding: 0,
      flexDirection: 'row',
      
    },
    Badge: {
      marginLeft: "auto",
      width: "25%",
      color:"white",
      fontWeight: 'bold',
      borderRadius: 4,
      textAlign: 'center',
    },
    going: {
      backgroundColor: "#6dbf1a",
    },
    hosting: {
      backgroundColor: "#3399FF",
    }
});

export default BaseCard;