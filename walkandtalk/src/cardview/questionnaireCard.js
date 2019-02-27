import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class QuestionnaireCard extends Component {
    render() {
        return (
            <View style={styles.quesContainer}>
                <View style={styles.questionnaires}>
                    <Text style={styles.quesText}>{this.props.quesOne}</Text>
                </View>
                <View style={styles.questionnaires}>
                    <Text style={styles.quesText}>{this.props.quesTwo}</Text>
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    quesContainer: {
        width:"100%",
        height: "30%",
        marginTop: "5%",
        alignItems: 'center',
        justifyContent: 'center',
      },
    questionnaires: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'grey',
        height: "40%",
        width :"90%",
        marginBottom: "5%",
        marginLeft: "5%",
        marginRight: "5%",
        paddingLeft: "5%",
        justifyContent: 'center',

      },
      quesText: {
        fontWeight: 'bold',
        fontSize:20,
        justifyContent: 'center',
      }
});

export default QuestionnaireCard;