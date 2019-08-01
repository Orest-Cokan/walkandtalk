import React, { Component } from "react";
import {
  Button,
  Container,
  Content,
  Header,
  Right,
  Body,
  Title,
  ListItem
} from "native-base";
import { Image } from "react-native";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { StyledText as Text } from "../../constants/StyledText";
import { Actions } from "react-native-router-flux";

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  // Navigate to Past Events
  goToPastEvents = () => {
    Actions.pastEvents();
  };

  // Navigate to Helpline Links
  goToHelplineLinks = () => {
    Actions.helplines();
  };

  // Navigate to changing the password
  goToChangePassword = () => {
    Actions.changePassword();
  };

  // Navigate to the event ratings!
  goToEventRatings = () => {
    Actions.eventRatings();
  };

  // Logs the user out of the app
  logout = () => {
    Actions.reset("auth");
  };

  render() {
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Body style={ScreenStyleSheet.sideBarHeaderBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Profile</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.closeDrawer()}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/sidebar.png")}
              />
            </Button>
          </Right>
        </Header>
        <Content>
          {/* Helpline Links */}
          <ListItem button={true} onPress={() => this.goToHelplineLinks()}>
            <Image
              style={ScreenStyleSheet.headerIcon}
              source={require("../../assets/icons/helpline-links.png")}
            />
            <Text style={ScreenStyleSheet.sideBarTextItem}>Helpline Links</Text>
          </ListItem>

          {/* Past Events */}
          <ListItem button={true} onPress={() => this.goToPastEvents()}>
            <Image
              style={ScreenStyleSheet.headerIcon}
              source={require("../../assets/icons/past-events.png")}
            />
            <Text style={ScreenStyleSheet.sideBarTextItem}>
              Your Past Events
            </Text>
          </ListItem>

          {/* Location Ratings */}
          <ListItem button={true} onPress={() => this.goToEventRatings()}>
            <Image
              style={ScreenStyleSheet.headerIcon}
              source={require("../../assets/icons/aboutEvent.png")}
            />
            <Text style={ScreenStyleSheet.sideBarTextItem}>
              Location Ratings
            </Text>
          </ListItem>

          {/* Logout */}
          <ListItem button={true} onPress={() => this.logout()}>
            <Image
              style={ScreenStyleSheet.headerIcon}
              source={require("../../assets/icons/logout.png")}
            />
            <Text style={ScreenStyleSheet.sideBarTextItem}>Logout</Text>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default SideBar;
