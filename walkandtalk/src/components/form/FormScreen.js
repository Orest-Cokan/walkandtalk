import React, { Component } from "react";
import { View, Text } from "react-native";
import { fetchUncompletedRecords } from "../../actions/RecordActions";
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

/*
This is the forms screen. Users will see the two static questionnaires and event records to be completed.
*/
class FormScreen extends Component {
  constructor(props) {
    super(props);
    console.log("inside form constructor");
    console.log(this.props.user.user.email);
    this.props.fetchUncompletedRecords(this.props.user.user.email);
  }

  getRecords() {
    let records = [];
    this.props.records.map(record => {
      console.log(record);
      records.unshift(
        <BaseCard
          key={record.id}
          date={record.date}
          title={record.title}
          location={record.location}
          start_time={record.start_time}
        />
      );
    });
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
  return {
    records: state.record.records,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchUncompletedRecords }
)(FormScreen);
