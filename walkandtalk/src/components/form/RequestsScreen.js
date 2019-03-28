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
    this.props.getUnregisteredUsers();
    
    // Sample data
    this.state = {
      requests: [{
        email:'1',
        redcapID: 1,
        fullname: '1',
        registered: 0,
      }],
      users : null
    };
  }

  componentWillMount() {
    this.props.getUnregisteredUsers;
  }

  // The following code is to be used when real data is to be integrated
  // componentDidMount() {
  //   this.props.getUnregisteredUsers;
  //   console.log("THIS IS DID MOUNT")
  //   console.log(this.props.users);

  // }



  
  // Switch request view
  viewRequest(index) {
    Actions.viewRequest({ request: this.state.requests[index] });
  }

  setUsers(){
    console.log(this.props.users);
    this.setState({
      users: this.props.users
    });
    console.log(this.state.users);
  }

  //
  getRequests() {
    let requests = [];
    var users = [];
    let unregisteredUsers = this.props.users;
    console.log(this.props.users);
    console.log("UNREGIESTERED USERS", unregisteredUsers);
    this.setState({
      users: unregisteredUsers
    });

    //console.log("THIS IS IN GETREQUEST" , this.state.users);
    this.state.requests.map((request, index) => {

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
    users: state.user.users
  };
};

export default connect(
  mapStateToProps,
  {getUnregisteredUsers}
)(RequestsScreen);
