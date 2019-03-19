import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RequestCard from "../../cardview/requestCard";
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

    // Sample data
    this.state =  {
      requests: [
        {
          fullname: "Anne Taylor",
          email: "anntaylor@gmail.com",
          dob: "1965-03-20",
          menopausal_stage: "Peri",
          intensity: "Slow",
          distance: 10,
          duration: 60,
          venue: "Indoor",
          location: "Summerside",
        },
        {
          fullname: "Rose Zapata",
          email: "rosezapata@gmail.com",
          dob: "1975-05-04",
          menopausal_stage: "Pre",
          intensity: "Brisk",
          distance: 10,
          duration: 60,
          venue: "Outdoor",
          location: "Riverbend area",
        }
      ]
    }

  }


  // The following code is to be used when real data is to be integrated
  /* componentDidMount() {
    this.props.[insert get request action here];
  }*/

  // Switch request view
  viewRequest(index) {
    Actions.viewRequest({ request: this.state.requests[index]} );
  }

 //
  getRequests() {
    let requests = [];
    console.log(this.props);
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
  console.log(this.props);
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
  console.log("requestscreen");
  return {
  };
};


export default connect(
  mapStateToProps,
  null
)(RequestsScreen);
