import React, { Component } from "react";
import { View, Image, TouchableHighlight } from "react-native";
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
import Sidebar from "./Sidebar";

// Profile tab
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  // Sidebar close
  closeDrawer = () => {
    this.drawer._root.close();
  };

  // Sidebar open
  openDrawer = () => {
    this.drawer._root.open();
  };

  // When edit profile icon is clicked
  goToEditProfile = () => {
    // Navigate to edit profile
    Actions.editProfile();
  };

  componentWillMount() {
    vars = this.props.user.user;
  }

  render() {
    const vars = this.props.user.user;
    return (
      <Container>
        <Drawer
          side="right"
          ref={ref => {
            this.drawer = ref;
          }}
          content={<Sidebar closeDrawer={this.closeDrawer.bind(this)} />}
          tapToClose={true}
          openDrawerOffset={0.4}
          panOpenMask={0.4}
          onClose={() => this.closeDrawer()}
        >
          {/* Header */}
          <Header
            style={ScreenStyleSheet.header}
            androidStatusBarColor={"white"}
            iosBarStyle={"dark-content"}
          >
            <Left style={ScreenStyleSheet.headerSides} />
            <Body style={ScreenStyleSheet.headerBody}>
              <Title style={ScreenStyleSheet.headerTitle}>Profile</Title>
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
              {/* Edit profile icon  */}
              <View style={ScreenStyleSheet.editProfile}>
                <TouchableHighlight
                  onPress={this.goToEditProfile}
                  activeOpacity={0}
                  underlayColor={"transparent"}
                >
                  <Image
                    style={ScreenStyleSheet.editIcon}
                    source={require("../../assets/icons/edit.png")}
                  />
                </TouchableHighlight>
              </View>
              {/* Profile picture */}
              <Image
                style={ScreenStyleSheet.avatar}
                source={
                  this.props.picture.picture.image
                    ? { uri: this.props.picture.picture.image }
                    : require("../../assets/icons/default-profile.png")
                }
              />
              <Text style={ScreenStyleSheet.profileName}>{vars.fullname}</Text>
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
                  {vars.dob}
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
                    (new Date().getTime() - Date.parse(vars.dob)) / 31557600000
                  )}
                </Text>
              </View>
            </View>
            {/* Menopausal Stage */}
            <View style={ScreenStyleSheet.rowContainer}>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfo}>
                  Menopausal Stage
                </Text>
              </View>
              <View style={ScreenStyleSheet.profileRowInfo}>
                <Text style={ScreenStyleSheet.profileInfoInput}>
                  {vars.menopausal_stage}
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
                  {vars.preference.distance} km
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
                  {vars.preference.duration} min
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
                  {vars.preference.intensity}
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
                  {vars.preference.venue}
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
                  {vars.preference.location}
                </Text>
              </View>
            </View>
          </Content>
        </Drawer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    picture: state.picture
  };
};

export default connect(
  mapStateToProps,
  null
)(ProfileScreen);
