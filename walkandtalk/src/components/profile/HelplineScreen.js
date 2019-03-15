// Helpline links Screen View
import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Linking } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Button,
  StatusBar
} from "native-base";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { Actions } from "react-native-router-flux";

class HelplineScreen extends Component {
  onBack = () => {
    // Navigate back to profile page
    Actions.pop();
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
          <Left style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.onBack}>
              <Image
                style={ScreenStyleSheet.backIcon}
                source={require("../../assets/icons/back-button.png")}
              />
            </Button>
          </Left>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Helpline Links</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          <Text style={styles.HelplineTitle}>
            Northern America Menopause Society (NAMS)
          </Text>
          <Text
            style={styles.HelplineLink}
            onPress={() =>
              Linking.openURL("https://www.menopause.org/for-women")
            }
          >
            www.menopause.org
          </Text>

          <View style={ScreenStyleSheet.lineSeparator} />
          <Text style={styles.HelplineTitle}>
            Society of Obstetricians and Gynaecologists of Canada (SOGC)
          </Text>
          <Text
            style={styles.HelplineLink}
            onPress={() => Linking.openURL("https://www.menopauseandu.ca/")}
          >
            www.menopauseandu.ca
          </Text>
          <View style={ScreenStyleSheet.lineSeparator} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(HelplineScreen);

// Styles
const styles = StyleSheet.create({
  HelplineTitle: {
    marginHorizontal: 10,
    paddingTop: 10
  },
  HelplineLink: {
    color: "#A680B8",
    marginHorizontal: 10,
    paddingBottom: 10
  }
});
