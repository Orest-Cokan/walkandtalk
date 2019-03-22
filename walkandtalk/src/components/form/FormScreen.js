import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BaseCard from "../../cardview/baseCard";
import QuestionnaireCard from "../../cardview/questionnaireCard";
import { connect } from "react-redux";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content
} from "native-base";
import { Actions } from "react-native-router-flux";
import { getUncompletedRecords } from "../../actions/RecordActions";

/*
This is the forms screen. Users will see the two static questionnaires and event records to be completed.
*/
class FormScreen extends Component {
  constructor(props) {
    super(props);
    console.log("inside constructor");
    this.props.getUncompletedRecords = this.props.getUncompletedRecords(
      this.props.user.user.email
    );
  }

  componentDidMount() {
    this.props.getUncompletedRecords;
  }

  submitRecord(index) {
    Actions.submitRecord({
      record: this.props.uncompleted_records[index]
    });
  }

  getRecords() {
    let records = [];
    console.log(this.props);
    this.props.uncompleted_records.map((record, index) => {
      records.unshift(
        <TouchableOpacity
          key={index}
          onPress={this.submitRecord.bind(this, index)}
        >
          <BaseCard
            key={record.id}
            date={record.date}
            start_time={record.start_time}
            title={record.title}
            location={record.location}
          />
        </TouchableOpacity>
      );
    });
    console.log(this.props);
    return records;
  }

  render() {
    return (
      <Container>
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Forms</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          <Text style={ScreenStyleSheet.sectionTitle}>Questionnaires</Text>
          <QuestionnaireCard quesOne="MENQOL" quesTwo="Symptom Severity" />
          <View style={ScreenStyleSheet.lineSeparator} />
          <Text style={ScreenStyleSheet.sectionTitle}>Records</Text>
          {this.getRecords()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("formscreen");
  return {
    uncompleted_records: state.record.uncompleted_records,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUncompletedRecords }
)(FormScreen);
