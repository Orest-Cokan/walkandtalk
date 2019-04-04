import React, { Component } from "react";
import {
  View,
  Image
} from "react-native";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Button,
} from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { StyledText as Text } from "../../constants/StyledText";
import {getAllUsers, getUser} from "../../actions/UserActions";
var x = 0;

// Profile tab
class OtherProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.props.getUser(this.props.email);
  }

  onBack = () =>{
      Actions.pop()
  }

  render() {
    x = x + 1
    if(x == 2){
      return (
        <Container>
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
              <Title style={ScreenStyleSheet.headerTitle}>Attendee</Title>
            </Body>
            <Right style={ScreenStyleSheet.headerSides}>
              <Button transparent>
              </Button>
            </Right>
          </Header>

          <Content contentContainerStyle={ScreenStyleSheet.content}>
            {/* Profile header container */}
            <View style={ScreenStyleSheet.profileHeader}>
          
              {/* Profile picture */}
              <Image
                style={ScreenStyleSheet.avatar}
                source={this.props.otherUser.picture.image ? {uri: this.props.otherUser.picture.image} : require("../../assets/icons/default-profile.png")}
              />
              <Text style={ScreenStyleSheet.profileName}>
                {this.props.otherUser.fullname}
              </Text>
            </View>

            {/* On screen separator */}
            <View style={ScreenStyleSheet.lineSeparator} />

            {/* Info Header */}
            <View style={ScreenStyleSheet.rowContainer}>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileSectionTitle}>
                  Basic Info
                </Text>
              </View>
            </View>
            {/* Date of birth */}
            <View style={ScreenStyleSheet.rowContainer}>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfo}>Date of Birth</Text>
              </View>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfoInput}>
                  {this.props.user.otherUser.dob}
                </Text>
              </View>
            </View>
            {/* Age */}
            <View style={ScreenStyleSheet.rowContainer}>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfo}>Age</Text>
              </View>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfoInput}>
                  {/* Automatically calculates the age when given date of birth */}
                  {Math.floor(
                    (new Date().getTime() -
                      Date.parse(this.props.user.otherUser.dob)) /
                      31557600000
                  )}
                </Text>
              </View>
            </View>
            {/* Menopausal Stage */}
            <View style={ScreenStyleSheet.rowContainer}>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfo}>Menopausal Stage</Text>
              </View>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfoInput}>
                  {this.props.user.otherUser.menopausal_stage}
                </Text>
              </View>
            </View>

            {/* On screen separator */}
            <View style={ScreenStyleSheet.lineSeparator} />

            {/* Preferences header */}
            <View style={ScreenStyleSheet.rowContainer}>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileSectionTitle}>
                  My Preferences
                </Text>
              </View>
            </View>
            {/* Distance */}
            <View style={ScreenStyleSheet.rowContainer}>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfo}>
                  Length of Walk (by distance)
                </Text>
              </View>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfoInput}>
                  {this.props.user.otherUser.preference.distance}
                </Text>
              </View>
            </View>
            {/* Duration */}
            <View style={ScreenStyleSheet.rowContainer}>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfo}>
                  Length of Walk (by duration)
                </Text>
              </View>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfoInput}>
                  {this.props.user.otherUser.preference.duration}
                </Text>
              </View>
            </View>
            {/* Intensity */}
            <View style={ScreenStyleSheet.rowContainer}>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfo}>Intensity</Text>
              </View>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfoInput}>
                  {this.props.user.otherUser.preference.intensity}
                </Text>
              </View>
            </View>
            {/* Venue */}
            <View style={ScreenStyleSheet.rowContainer}>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfo}>Type of Venue</Text>
              </View>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfoInput}>
                  {this.props.user.otherUser.preference.venue}
                </Text>
              </View>
            </View>
            {/* Location */}
            <View style={ScreenStyleSheet.rowContainer}>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfo}>Location</Text>
              </View>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfoInput}>
                  {this.props.user.otherUser.preference.location}
                </Text>
              </View>
            </View>
          </Content>
        </Container>
      );
    } else{
      return null
    }
  }
}

const mapStateToProps = state => {
    return {
      users: state.user.users,
      user: state.user,
      picture: state.picture,
      otherUser: state.user.otherUser
    };
  };

export default connect(
  mapStateToProps,
  {getAllUsers, getUser}
)(OtherProfileScreen);
