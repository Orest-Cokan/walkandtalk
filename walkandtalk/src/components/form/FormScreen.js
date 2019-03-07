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
          androidStatusBarColor="#A680B8"
          androidStatusBarStyle="light-content"
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title>Forms</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          <Text style={ScreenStyleSheet.sectionTitle}>Questionnaires</Text>
          <QuestionnaireCard quesOne="MENQOL" quesTwo="Symptom Severity" />
          <View style={ScreenStyleSheet.lineSeparator} />
          <Text style={ScreenStyleSheet.sectionTitle}>Records</Text>
          <BaseCard
            time="THU, FEB 28 AT 10:00PM"
            title="Monthly Walk"
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
