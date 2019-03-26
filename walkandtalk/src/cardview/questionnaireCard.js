import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";

/*
This is the view for the two questionnaires.
Parameters: The titles of the questionnaires.
Returns: The list view that contains the questionnaires.
*/

class QuestionnaireCard extends Component {
  goToMenqol = () => {
    Actions.questionnaire({ questionnaire: "menqol" });
  };

  goToSymptomSeverity = () => {
    Actions.questionnaire({
      questionnaire: "menopause_symptom_severity_questionnaire"
    });
  };
  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.questionnaires}
          onPress={this.goToMenqol}
        >
          <Text style={styles.quesText}>{this.props.quesOne}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.questionnaires}
          onPress={this.goToSymptomSeverity}
        >
          <Text style={styles.quesText}>{this.props.quesTwo}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  questionnaires: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "grey",
    height: 40,
    marginBottom: 10,
    paddingLeft: "5%",
    justifyContent: "center"
  },
  quesText: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default QuestionnaireCard;
