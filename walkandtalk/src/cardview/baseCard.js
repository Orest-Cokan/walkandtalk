import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class BaseCard extends Component {
    render() {
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
}

const styles = StyleSheet.create({
    card: {
      borderWidth: 1,
      borderRadius: 3,
      borderColor: 'grey',
      width: "90%",
      height: 100,
      paddingLeft: "5%",
      margin:"5%",
      justifyContent: 'center',
    },
    eventInfo:{
      justifyContent: 'center',
    },
    eventTime: {
      fontSize:20,
      left:0,
      top:0,
      color: 'purple'
    },
    eventTitle: {
      fontSize:20,
      left:0,
      top:0,
      fontWeight: 'bold'
    },
    eventLocation: {
      fontSize:20,
      left:0,
      top:0
    }
});

export default BaseCard;