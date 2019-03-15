import React, { Component } from "react";
import { View, Text } from "react-native";
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
          <BaseCard
            title="Monthly Walk"
            date="THU, FEB 28"
            start_time="10:00 PM"
            location="Terwillegar Centre"
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(FormScreen);
