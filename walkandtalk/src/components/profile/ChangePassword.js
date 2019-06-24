// Past Event List Screen View
import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Button
} from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { Actions } from "react-native-router-flux";
import BaseCard from "../../cardview/baseCard";
import { getRecords } from "../../actions/RecordActions";
import Loader from "../../constants/loader";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    await this.props.getRecords;
    this.setState({ loading: false });
  }

  onBack = () => {
    Actions.pop();
  };
  render() {
    return (
      <Container>
        <Loader loading={this.state.loading} />
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Left style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.onBack}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/back-button.png")}
              />
            </Button>
          </Left>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Past Events</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>
        {!this.state.loading && (
          <Content contentContainerStyle={ScreenStyleSheet.content}>
            {this.getPastEvents()}
          </Content>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getRecords }
)(ChangePassword);
