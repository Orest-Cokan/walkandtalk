import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

/*
This is the view for the requests.
Parameters: Name of the requester.
Returns: Card view containing the name.
*/

class RequestCard extends Component {
    render() {
        return (
            <View style={styles.requests}>
                <Text style={styles.cardText}>{this.props.requester}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    requests: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'grey',
        height: 40,
        marginBottom: 10,
        paddingLeft: "5%",
        justifyContent: 'center',

      },
      cardText: {
        fontSize:15,
      }
});

export default RequestCard;