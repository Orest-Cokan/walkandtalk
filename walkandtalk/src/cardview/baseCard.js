import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class BaseCard extends Component {
    render() {
        return (
          <View style={styles.container}>
              <View style={styles.card}>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTime}>{this.props.time}</Text>
                  <Text style={styles.eventTitle}>{this.props.title}</Text>
                  <Text style={styles.eventLocation}>{this.props.location}</Text>
                </View>
              </View>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    card: {
      borderWidth: 1,
      borderRadius: 3,
      borderColor: 'grey',
      width: 380,
      height: 100,
      padding: 10,
      margin: 10
    },
    eventInfo:{
        justifyContent: 'center',
        top: 10
    },
    eventTime: {
      left:0,
      top:0,
      color: 'purple'
    },
    eventTitle: {
        left:0,
        top:0,
        fontWeight: 'bold'
    },
    eventLocation: {
    left:0,
    top:0
    }
});

export default BaseCard;