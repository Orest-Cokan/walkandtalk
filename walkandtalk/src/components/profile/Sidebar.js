import React, { Component } from 'react';
import { Button, 
  Container, 
  Content, 
  Header,
  Right, 
  Body, 
  Title, 
  Text, 
  List, 
  ListItem 
} from 'native-base';
import { Image} from 'react-native';
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { Actions}  from 'react-native-router-flux';


class SideBar extends Component{
  constructor(props) {
    super(props);
  }

  goHome() {
    Actions.home();
  }

  // Navigate to Past Events
  goToPastEvents = () => {
    Actions.pastEvents();
  };

  // Navigate to Helpline Links
  goToHelplineLinks = () => {
    Actions.helplines();
  };

  // Logs the user out of the app
  logout = () => {
    Actions.login();
  };

  render(){
    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}>
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
          <List>
            {/* Past Events */}
            <ListItem
              button={true}
              onPress={() => this.goToPastEvents()}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/past-events.png")}
              />
              <Text style={ScreenStyleSheet.sideBarTextItem}>Past Events</Text>
            </ListItem>

            {/* Helpline Links */}
            <ListItem
              button={true}
              onPress={() => this.goToHelplineLinks()}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/helpline-links.png")}
              />
              <Text style={ScreenStyleSheet.sideBarTextItem}>Helpline Links</Text>
            </ListItem>

            {/* Change password */}
            {/* Leads to home page for now */}
            <ListItem
              button={true}
              onPress={() => this.goHome()}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/password.png")}
              />
              <Text style={ScreenStyleSheet.sideBarTextItem}>Change Password</Text>
            </ListItem>

            {/* Logout */}
            <ListItem
              button={true}
              onPress={() => this.logout()}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/logout.png")}
              />
              <Text style={ScreenStyleSheet.sideBarTextItem}>Logout</Text>
            </ListItem>
          </List>
        </Content>
    </Container>
    );
  }
}


export default SideBar;