import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Actions } from "react-native-router-flux";

/*
This is the view for event card.
Parameters: Time, title, locaiton and badge(optional) of the event.
Returns: The list view that contains information about the event.
*/

class BaseCard extends Component {

  goToEvent = () => {
    // Navigate to view this event
    Actions.viewEvent({eventId:this.props});
  };
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
            <Text style={styles.eventTime}>{this.props.date.toUpperCase()} AT {this.props.start_time.toUpperCase()}</Text>
            <Text style={styles.eventTitle}>{this.props.title}</Text>
            <Text>{this.props.location}</Text>
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
        <TouchableOpacity
        onPress={this.goToEvent}>
        <View style={styles.card}>
            <View style={styles.withBadge}>
              <Text style={styles.eventTime}>{this.props.date.toUpperCase()} AT {this.props.start_time.toUpperCase()}</Text>
              <Text style={[styles.going, styles.Badge]}>{this.props.badge}</Text>
            </View>
            <Text style={styles.eventTitle}>{this.props.title}</Text>
            <Text>{this.props.location}</Text>

        </View>
        </TouchableOpacity>
      );

    }
    else if (this.props.badge.toUpperCase()=="HOSTING"){
      return (
        <TouchableOpacity
        onPress={this.goToEvent}>
        <View style={styles.card}>
            <View style={styles.withBadge}>
              <Text style={styles.eventTime}>{this.props.date.toUpperCase()} AT {this.props.start_time.toUpperCase()}</Text>
              <Text style={[styles.hosting, styles.Badge]}>{this.props.badge}</Text>
            </View>
            <Text style={styles.eventTitle}>{this.props.title}</Text>
            <Text>{this.props.location}</Text>

        </View>
        </TouchableOpacity>
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
      paddingHorizontal: "5%",
      marginBottom:10,
      height: 85,
      justifyContent: "center",
    },

    eventTime: {
      color: '#A680B8',
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
