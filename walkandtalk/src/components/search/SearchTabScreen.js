import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Tabs,
  Tab,
  Text,
  Right,
  Left,
  Body,
  TabHeading
} from "native-base";
import TabOne from "./SearchListViewScreen";
import TabTwo from "./SearchMapViewScreen";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";

class SearchTabScreen extends Component {
  render() {
    return (
      <Container>
      <Header
        style={ScreenStyleSheet.header}
        androidStatusBarColor={"white"}
        iosBarStyle={"dark-content"}
      >
        <Body style={ScreenStyleSheet.headerBody}>
          <Title style={ScreenStyleSheet.headerTitle}>Search</Title>
        </Body>
      </Header>
        <Tabs style={{ elevation: 3 }}>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: "#A680B8"}}>
                <Text>List</Text>
              </TabHeading>
            }
          >
            <TabOne />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: "#A680B8"}}>
                <Text>Map</Text>
              </TabHeading>
            }
          >
            <TabTwo />
          </Tab>

        </Tabs>
      </Container>
    );
  }
}

export default SearchTabScreen;
