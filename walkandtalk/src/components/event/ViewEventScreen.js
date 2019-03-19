
import React, { Component } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Button
} from "native-base";
import { SegmentedControls } from "react-native-radio-buttons";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import BaseCard from "../../cardview/baseCard";
import { Actions } from "react-native-router-flux";

class ViewEventScreen extends Component {

  constructor(props) {
    super(props);

    // Set state on inital profile signup
    this.state = {
      time: "WED, MAR 3 AT 10:00PM",
      title: "Walk in the park",
      location:"Hawrelak Park",
      badge:"GOING",
      host: "Beatrice",
      intensity:"Brisk",
      attending: 6,
      description: "Hello All. Im writing this description to see how it looks on the screen if you think it looks good gimme a thumbs up"
    };
  }

  onBack = () => {
    // Navigate back to profile page
    Actions.pop();
  };

  //Depending on whether we are viewing an event in home or in search different props will be passing
  // First we want to determine props available and set state with the necessary values
  //
  // First will do for search events
  componentWillMount(){
    searchEvent = this.props.event
    console.log(searchEvent, "searchEvent")
  }

  render() {
    const attendingOptions = ["Not Going", "Going"];

//Should be checking if neither going nor hosting
    if (this.state.badge=="GOING") {
        buttons =
      <View style={styles.segmentedControls}>
        <SegmentedControls
          tint={"#A680B8"}
          backTint={"#ffffff"}
          optionStyle={{ fontFamily: "AvenirNext-Medium" }}
          selectedOption={attendingOptions[1]}
          optionContainerStyle={{
            flex: 1,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2
          }}
          options={attendingOptions}
        />
      </View>;
    }
    else {
      buttons =
      <View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={this.onPressLogin}
      >
        {/*Edit Event*/}
        <Text style={styles.buttonText}> EDIT </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={this.onPressLogin}
      >
        {/*Delete Event*/}
        <Text style={styles.buttonText}> DELETE </Text>
      </TouchableOpacity>
      </View>
    }

    if (this.state.badge=="GOING") {
      description =
      <View style={ScreenStyleSheet.rowContainerEvent}>
        <Text style={ScreenStyleSheet.eventDescription}>
        {this.state.description}
        </Text>
      </View>
    }else{
      description =
      <View style={ScreenStyleSheet.rowContainerEvent}>
        <Text style={ScreenStyleSheet.eventDescription1}>
        {this.state.description}
        </Text>
      </View>
    }

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
            <Title style={ScreenStyleSheet.headerTitle}>{this.state.title}</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Card List View */}
          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.EventSectionTitle}>
                {this.state.time}
              </Text>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View style={ScreenStyleSheet.profileRowInfo}>
              <Text style={ScreenStyleSheet.TitleHeader}>
                {this.state.title}
              </Text>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View >
            <Image
              style={ScreenStyleSheet.eventIcons}
              source={require("../../assets/icons/walk.png")}
            />
            </View>
            <View s>
              <Text style={ScreenStyleSheet.eventInfoInput}>
                {this.state.intensity}
              </Text>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View >
            <Image
              style={ScreenStyleSheet.eventIcons}
              source={require("../../assets/icons/pin.png")}
            />
            </View>
            <View s>
              <Text style={ScreenStyleSheet.eventInfoInput}>
                {this.state.location}
              </Text>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View >
            <Image
              style={ScreenStyleSheet.eventIcons}
              source={require("../../assets/icons/event-host.png")}
            />
            </View>
            <View s>
              <Text style={ScreenStyleSheet.eventInfoInput}>
                {this.state.host}
              </Text>
            </View>
          </View>

          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View >
            <Image
              style={ScreenStyleSheet.eventIcons}
              source={require("../../assets/icons/user-group.png")}
            />
            </View>
            <View style={ScreenStyleSheet.rowContainerEvent2}>
              <Text style={ScreenStyleSheet.attending}>
                {this.state.attending} people
              </Text>
              <Text style={ScreenStyleSheet.attendingText}>are attending this event</Text>
            </View>
          </View>

          {/* On screen separator */}
          <View style={ScreenStyleSheet.EventLineSeparator} />

          <View style={ScreenStyleSheet.rowContainerEvent}>
            <View >
            <Image
              style={ScreenStyleSheet.eventIcons}
              source={require("../../assets/icons/form.png")}
            />
            </View>
            <View>
              <Text style={ScreenStyleSheet.aboutInfo}>
                About this event
              </Text>
            </View>
          </View>
          {description}
          {buttons}




        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(ViewEventScreen);

const styles= {
segmentedControls: {
  marginLeft: 15,
  marginRight: 15,
  marginBottom: 15,

},
buttonContainer: {
  marginVertical: 10,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  width: "48%",
  borderRadius: 10,
},
editButton: {
  marginTop: 10,
  marginBottom: 10,
  marginRight: 40,
  marginLeft: 40,
  padding: 10,
  backgroundColor: "#A680B8",
  borderRadius: 8
},
deleteButton: {
  marginTop: 10,
  marginBottom: 10,
  marginRight: 40,
  marginLeft: 40,
  padding: 10,
  backgroundColor: "#ae4949",
  borderRadius: 8
},
buttonText: {
  color: "white",
  textAlign: "center",
  fontSize: 15,
  fontWeight: "bold"
},
};
