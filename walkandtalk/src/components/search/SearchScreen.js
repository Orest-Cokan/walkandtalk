import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Entypo from "react-native-vector-icons/Entypo";
import BaseCard from "../../cardview/baseCard";
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

const icon = require("../../assets/icons/search.png");
const icon2 = require("../../assets/icons/form.png");

const items = [
  {
    name: "Intensity",
    id: 0,
    children: [{
        name: "Slow",
        id: 11,
      },{
        name: "Intermediate",
        id: 22,
      },{
        name: "Brisk",
        id: 33,
      }
      ]
  },
  {
    name: "Within",
    id: 1,
    children: [{
        name: "5 km",
        id: 44,
      },{
        name: "10 km",
        id: 55,
      },{
        name: "15 km",
        id: 66,
      }]
  }]


/*
This is the search screen. Users can search for events in this screen.
*/
class SearchScreen extends Component {
  //text stores the input from user which is initalized to an empty string.
  //
  constructor(){
    super()
    this.state = {
      selectedItems: [],
      text:""
    }
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }


  render() {
    return (
      <Container>
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor="#A680B8"
          androidStatusBarStyle="light-content"
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title>Search</Title>
          </Body>
        </Header>

      <View>
       <SectionedMultiSelect
         items={items}
         uniqueKey='id'
         subKey='children'
         iconKey='icon'
         selectText='Search for events...'
         confirmText = "Select"
         hideSearch={true}
         showDropDowns={false}
         readOnlyHeadings={true}
         onSelectedItemsChange={this.onSelectedItemsChange}
         selectedItems={this.state.selectedItems}
         colors={{
           primary:{
             color: "#A680B8"
           }
         }}
         styles={{
            selectedItemText: {
              color: "#A680B8",
            },
            selectedSubItemText: {
               color: "#A680B8",
            }
          }}
           cancelIconComponent={
            <Icon
             size={20}
             name="close"
             style={{ color: 'white' }}
           />
           }
       />
       </View>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
          {/* Search bar */}
          <View style={styles.box}>
            <Ionicon name="ios-search" style={styles.searchIcon} />
            <TextInput
              value={this.state.text}
              placeholder="Search"
              style={styles.placeHolder}
              onChangeText={text => this.setState({ text })}
            />
            <Entypo name="sound-mix" style={styles.filterIcon} />
          </View>
          <View style={ScreenStyleSheet.lineSeparator} />
          <Text style={ScreenStyleSheet.sectionTitle}>Events near you</Text>
          <BaseCard
            time="WED, MAR 3 AT 10:00PM"
            title="Weekly Walk"
            location="Van Vliet Centre"
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "grey",
    justifyContent: "center",
    paddingHorizontal: 15,
    flexDirection: "row",
    marginBottom: 10
  },
  searchIcon: {
    fontSize: 25
  },
  placeHolder: {
    height: 40,
    fontSize: 15,
    color: "grey"
  },
  filterIcon: {
    fontSize: 25,
    marginLeft: "auto",
    transform: [{ rotate: "90deg" }]
  }
});

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(SearchScreen);
