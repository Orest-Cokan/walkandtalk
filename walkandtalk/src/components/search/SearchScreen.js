import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert,
  Dimensions,
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

const searchIcon = require("../../assets/icons/search-bar.png");
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
      text:"",
      currentFilters:null
    }
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }

  onConfirm = () => {
    this.setState({ currentFilters: this.state.selectedItems })
  }


  render() {
    filterHeader = <Header
      style={ScreenStyleSheet.header}
      androidStatusBarColor="#A680B8"
      androidStatusBarStyle="light-content"
    >
      <Body style={ScreenStyleSheet.headerBody}>
        <Title>Filter</Title>
      </Body>
    </Header>


    filterPopup =
    <View>
     <SectionedMultiSelect
       items={items}
       uniqueKey='id'
       subKey='children'
       iconKey='icon'
       headerComponent = {filterHeader}
       confirmText = "Select"
       onConfirm={this.onConfirm}
       showChips={true}
       hideSearch={true}
       showDropDowns={false}
       readOnlyHeadings={true}
       onSelectedItemsChange={this.onSelectedItemsChange}
       selectedItems={this.state.selectedItems}
       colors={{ primary: this.state.selectedItems.length ? "#A680B8" : 'crimson',}}
       styles={{
          selectedItemText: {
            color: "#A680B8",
          },
          selectedSubItemText: {
             color: "#A680B8",
          },
          chipText: {
             maxWidth: Dimensions.get('screen').width - 90,
          },
          chipWrapper:{
            marginBottom:15,
            backgroundColor:"red"
          },
          container:{
            marginBottom: 250
          },
          selectToggle:{
            width:40,
            height:40,
            marginBottom:15,
            marginTop:10,
            borderWidth:1,
            borderColor: "grey",
            borderTopRightRadius: 3,
            borderBottomRightRadius: 3,
            marginRight:5,
            paddingTop:5,
            backgroundColor: "#A680B8",
            alignSelf:"flex-end"
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
          </View>
          {filterPopup}


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
    width:Dimensions.get('screen').width - 70,
    borderWidth: 1,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    borderColor: "grey",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    flexDirection: "row",
    marginBottom: 10,
    marginTop:10,
    alignSelf:"flex-start",
    position:"absolute"
  },
  boxWithFilter: {
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "grey",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    flexDirection: "row",
    marginBottom: 10
  },
  searchIcon: {
    marginTop:3,
    marginRight:3,
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
