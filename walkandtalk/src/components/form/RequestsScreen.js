import React, { Component } from "react";
import { TouchableOpacity, Alert } from "react-native";
import RequestCard from "../../cardview/requestCard";
import { getUnregisteredUsers } from "../../actions/UserActions";
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

/*
This is the requests screen. Researchers will see the users that have signed up waiting to be approved or declined.
*/

class RequestsScreen extends Component {
  constructor(props) {
    super(props);
    console.log("inside constructor");
    this.props.unregisteredUsers = this.props.getUnregisteredUsers();
    // Sample data
  }

  componentDidMount() {
    this.props.getUnregisteredUsers;
  }

  
  // Switch request view
  viewRequest(index) {
    Actions.viewRequest({ request: this.props.unregisteredUsers[index] });
  }
  //
  getRequests() {
    let requests = [];
    //console.log("THIS IS IN GETREQUEST" , this.state.users);
    this.props.unregisteredUsers.map((request, index) => {
      requests.unshift(
        <TouchableOpacity
          key={index}
          onPress={this.viewRequest.bind(this, index)}
        >
          <RequestCard requester={request.fullname} />
        </TouchableOpacity>
      );
    });
    //console.log(this.props);
    return requests;
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
            <Title style={ScreenStyleSheet.headerTitle}>Requests</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {this.getRequests()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log("THIS IS IN MAP", state)
  return {
    unregisteredUsers: state.user.unregisteredUsers
  };
};

export default connect(
  mapStateToProps,
  { getUnregisteredUsers }
)(RequestsScreen);
