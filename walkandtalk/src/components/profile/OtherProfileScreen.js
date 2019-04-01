import React, { Component } from "react";
import {
  StyleSheet,
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
  Drawer
} from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { StyledText as Text } from "../../constants/StyledText";
import { getPicture } from "../../actions/PictureActions";
import {getUser} from "../../actions/UserActions";

// Profile tab
class OtherProfileScreen extends Component {
  constructor(props) {
    super(props);
    console.log("Props on profile", this.props);
    //this.props.getUser(this.props.email);

}

componentWillMount() {
   this.props.user = this.props.getUser(this.props.email);
    console.log(this.props.email, "email")
    console.log(this.props.user, "getUser results")
  }

  onBack = () =>{
      Actions.pop()
  }

  render() {
    const otherUser = this.props.user;
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
            <Title style={ScreenStyleSheet.headerTitle}>{otherUser.fullname}</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={() => this.openDrawer()}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/sidebar.png")}
              />
            </Button>
          </Right>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Profile header container */}
          <View style={ScreenStyleSheet.profileHeader}>
        
            {/* Profile picture */}
            <Image
              style={ScreenStyleSheet.avatar}
              source={require("../../assets/icons/default-profile.png")}
            />
            <Text style={ScreenStyleSheet.profileName}>
              {otherUser.fullname}
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
                {otherUser.dob}
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
                    Date.parse(otherUser.dob)) /
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
                {otherUser.menopausal_stage}
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
                {otherUser.distance} km
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
                {otherUser.duration} min
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
                {otherUser.intensity}
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
                {otherUser.venue}
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
                {otherUser.location}
              </Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
    console.log("otherprofilescreen");
    return {
      user: state.user,
      picture: state.picture
    };
  };

export default connect(
  mapStateToProps,
  {getUser}
)(OtherProfileScreen);

// Styles
const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black"
  }
});
