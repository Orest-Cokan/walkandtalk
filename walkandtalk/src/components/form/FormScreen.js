import React, { Component } from "react";
import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
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
import Loader from "../../constants/loader";

/*
This is the forms screen. Users will see the two static questionnaires and event records to be completed.
*/
class FormScreen extends Component {
  constructor(props) {
    super(props);
    this.numRenders = 0;
    this.state = {
      refreshing: false,
      records: [],
      loading: false
    };
    this.props.getUncompletedRecords(
      this.props.user.token,
      this.props.user.user.email
    );
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        await this.setState({ loading: true });
        await this.props.getUncompletedRecords(
          this.props.user.token,
          this.props.user.user.email
        );
        this.setState({ loading: false });
      }
    );
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  submitRecord(index) {
    Actions.submitRecord({
      record: this.props.uncompleted_records[index]
    });
  }

  getRecords() {
    let records = [];
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
    return records;
  }

  render() {
    return (
      <Container>
        <Loader loading={this.state.loading} />
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Forms</Title>
          </Body>
        </Header>
        {!this.state.loading && (
          <Content contentContainerStyle={ScreenStyleSheet.content}>
            <Text style={ScreenStyleSheet.sectionTitle}>Questionnaires</Text>
            <QuestionnaireCard quesOne="MENQOL" />
            <View style={ScreenStyleSheet.lineSeparator} />
            <Text style={ScreenStyleSheet.sectionTitle}>Walking Logs</Text>
            {this.getRecords()}
          </Content>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    uncompleted_records: state.record.uncompleted_records,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUncompletedRecords }
)(FormScreen);
