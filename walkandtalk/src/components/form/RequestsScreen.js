import React, { Component } from "react";
import { TouchableOpacity, Alert } from "react-native";
import RequestCard from "../../cardview/requestCard";
import { getUnregisteredUsers } from "../../actions/UserActions";
import { connect } from "react-redux";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import Loader from "../../constants/loader";
import { Container, Header, Body, Title, Content } from "native-base";
import { Actions } from "react-native-router-flux";

/*
This is the requests screen. Researchers will see the users that have signed up waiting to be approved or declined.
*/

class RequestsScreen extends Component {
  constructor(props) {
    super(props);
    this.props.unregisteredUsers = this.props.getUnregisteredUsers(this.props.user.user.email);
    this.state = {
      loading: false
    };
  }

  /* Listener that updates the list view of the unregiesterd users  */
  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        await this.setState({loading: true})
        await this.props.getUnregisteredUsers(this.props.user.user.email);
        this.setState({loading: false})
      }
    );
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  // Switch request view
  viewRequest(index) {
    Actions.viewRequest({ request: this.props.unregisteredUsers[index] });
  }
  //
  getRequests() {
    let requests = [];
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
    return requests;
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
            <Title style={ScreenStyleSheet.headerTitle}>Requests</Title>
          </Body>
        </Header>
        {!this.state.loading && (
        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {this.getRequests()}
        </Content>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    unregisteredUsers: state.user.unregisteredUsers,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUnregisteredUsers }
)(RequestsScreen);
