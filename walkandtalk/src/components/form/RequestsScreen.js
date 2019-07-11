import React, { Component } from "react";
import { TouchableOpacity, Alert, StyleSheet } from "react-native";
import RequestCard from "../../cardview/requestCard";
import { getUnregisteredUsers, getExcelData } from "../../actions/UserActions";
import { connect } from "react-redux";
import {
  StyledText as Text,
  StyledTextInput as TextInput
} from "../../constants/StyledText";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import Loader from "../../constants/loader";
import { Container, Header, Body, Title, Content, View } from "native-base";
import { Actions } from "react-native-router-flux";

/*
This is the requests screen. Researchers will see the users that have signed up waiting to be approved or declined.
*/

class RequestsScreen extends Component {
  constructor(props) {
    super(props);
    this.props.getUnregisteredUsers(
      this.props.token,
      this.props.user.user.email
    );
    this.state = {
      loading: false
    };
  }

  onPressExcel = async () => {
    await new Promise((resolve, reject) => {
      console.log(
        "user email :" +
          this.props.user.user.email +
          "   token: " +
          this.props.token
      );
      this.props.getExcelData(this.props.user.user.email, this.props.token);
      resolve();
    });
  };

  /* Listener that updates the list view of the unregiesterd users  */
  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        await this.setState({ loading: true });
        await this.props.getUnregisteredUsers(
          this.props.token,
          this.props.user.user.email
        );
        this.setState({ loading: false });
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

        <View>
          <TouchableOpacity
            style={styles.excelButton}
            onPress={this.onPressExcel}
          >
            {/* Excel Sheet Button - redirect user to home screen if successfull */}
            <Text style={styles.buttonText}> SEND EXCEL SHEET </Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    unregisteredUsers: state.user.unregisteredUsers,
    user: state.user,
    token: state.token.token
  };
};

export default connect(
  mapStateToProps,
  { getUnregisteredUsers, getExcelData }
)(RequestsScreen);

//Style Sheet
const styles = StyleSheet.create({
  excelButton: {
    padding: 10,
    bottom: 20,
    backgroundColor: "#A680B8",
    borderRadius: 8,
    marginRight: 50,
    marginLeft: 50
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
  }
});
