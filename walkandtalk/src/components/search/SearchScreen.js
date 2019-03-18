import React, { Component } from "react";
import { fetchEvents } from "../../actions/EventActions";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Entypo from "react-native-vector-icons/Entypo";
import BaseCard from "../../cardview/baseCard";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
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
import MapView, { PROVIDER_GOOGLE, Marker, Callout} from "react-native-maps";

const searchIcon = require("../../assets/icons/search-bar.png");
const icon2 = require("../../assets/icons/form.png");

//TO DO:
//Verfify that distance works --> will be done when lat/lon are given to events
// Search by key word --> in name and description, whole object really
// search returns an array of events fitting the search results
// map these events to the map --> using different markers for diff levels etc
// when clicking on a marker, must be able to view event


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
    name: "Venue",
    id: 2,
    children: [{
        name: "Indoor",
        id: 44,
      },{
        name: "Outdoor",
        id: 55,
      }]
  },
  {
    name: "Within",
    id: 1,
    children: [{
        name: "5 km",
        id: 66,
      },{
        name: "10 km",
        id: 77,
      },{
        name: "15 km",
        id: 88,
      }]
  }

]

// Returns user's current location
// Defaults to San Francisco on simulators
// export const getCurrentLocation = () => {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(position =>
//       resolve(position),
//       e => reject(e));
//   });
// };

/*
This is the search screen. Users can search for events in this screen.
*/
class SearchScreen extends Component {
  //text stores the input from user which is initalized to an empty string.
  //
  constructor(props){
    super(props);
    console.log("inside constructor");
    this.props.fetchEvents();
    this.state = {
      selectedItems: [],
      text:"",
      searchResults:[],
            // currentLocation: {
      // currentLatitude: 0,
      // currentLongitude: 0,
      // latitudeDelta: 0,
      // longitudeDelta: 0
      // },
      markers: [
        {
          key: 1,
          title: 'University of Alberta Walk',
          description: 'Walking around university',
          intensity: 'Slow',
          latitude: 37.784724,
          longitude: -122.404327,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,

        },
        {
          key: 2,
          title: 'Hawrelak Park Walk',
          description: 'Walking around the park',
          intensity: 'Intermediate',
          latitude: 37.786944,
          longitude: -122.406307,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,

        },
        {
          key: 3,
          title: 'Monday Walk',
          description: 'Walking on dat Monday',
          intensity: 'Brisk',
          latitude: 37.784944,
          longitude: -122.405307,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,

        },
      ]
    }
  }

  // async componentWillMount() {
  //   const position = await getCurrentLocation();
  //   if (position) {
  //     this.setState({
  //       currentLocation: {
  //       currentLatitude: position.coords.latitude,
  //       currentLongitude: position.coords.longitude,
  //       latitudeDelta: 0.003,
  //       longitudeDelta: 0.003,
  //       }
  //     });
  //   }
  // }

  componentDidMount() {
    this.props.fetchEvents;
      console.log("all events",this.props.events)
  }  
  onEventClick = () => {
    // Navigate to event
    Actions.signup();
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    console.log("selected items changed - searching....", this.state.selectedItems)
    this.search()
  }

  onConfirm = () => {
    console.log("multi-select closed")
    this.search()
  }

  search(){
      filters = this.state.selectedItems
      events = this.props.events
      var results = []

      filters.forEach(function(f) {
        if (f == 11){
          var i1 = events.filter(event =>{
            return event.intensity === "Slow"
          })
          results = results.concat(i1)
        }
        if (f == 22){
          var i2 = events.filter(event =>{
            return event.intensity === "Intermediate"
          })
          results = results.concat(i2)
        }
        if (f == 33){
          var i3 = events.filter(event =>{
            return event.intensity === "Brisk"
          })
          results = results.concat(i3)
        }
        if (f == 44){
          var v1 = events.filter(event =>{
            return event.venue === "Indoor"
          })
          results = results.concat(v1)
        }
        if (f == 55){
          var v2 = events.filter(event =>{
            return event.venue === "Outdoor"
          })
          results = results.concat(v2)
        }

      })

        this.submitSearch(results)

  }


  getDistance = results => {
    events= this.props.events
    //For 5 km
    if(filters.indexOf(66) != -1){
      events.forEach(function(e) {
        distance = 3959 * acos (cos ( radians(12.966958) )
          * cos( radians( lat ) )
          * cos( radians( lon ) - radians(80.1525835) )
          + sin ( radians(12.966958) )
          * sin( radians( lat ) ))
        if(distance<5){
          results.append(e)
        }
      })
    }
    //For 10 km
    if(filters.indexOf(77) != -1){
      events.forEach(function(e) {
        distance = 3959 * acos (
          cos ( radians(12.966958) )
          * cos( radians( lat ) )
          * cos( radians( lon ) - radians(80.1525835) )
          + sin ( radians(12.966958) )
          * sin( radians( lat ) ))
        if(distance<10){
          results.append(e)
        }
      })
    }
    //For 15 km
    if(filters.indexOf(77) != -1){
      events.forEach(function(e) {
        distance = 3959 * acos (
          cos ( radians(12.966958) )
          * cos( radians( lat ) )
          * cos( radians( lon ) - radians(80.1525835) )
          + sin ( radians(12.966958) )
          * sin( radians( lat ) ))
        if(distance<15){
          results.append(e)
        }
      })
    }

    return results
  }

  submitSearch = results => {
    this.setState({ searchResults: results }, () => {
        console.log(this.state.searchResults, 'make sure state updated');
      });

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
       showRemoveAll={true}
       hideSearch={true}
       showDropDowns={false}
       readOnlyHeadings={true}
       onSelectedItemsChange={this.onSelectedItemsChange}
       selectedItems={this.state.selectedItems}
       onPress={() => this.SectionedMultiSelect._removeAllItems()}
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
            marginBottom: 200
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
            <TouchableOpacity
              onPress={this.search}
              activeOpacity={0}
            >
              <Image
                style={ScreenStyleSheet.searchIcon}
                source={require("../../assets/icons/search-bar.png")}
              />
            </TouchableOpacity>
            <TextInput
              value={this.state.text}
              placeholder="Search"
              style={styles.placeHolder}
              onChangeText={text => this.setState({ text })}
            />
          </View>
          {filterPopup}


          <View style={ScreenStyleSheet.lineSeparator} />
          <MapView
            ref={(ref) => { this.mapRef = ref; }}
            onLayout={() => this.mapRef.fitToCoordinates(this.state.markers, { edgePadding: { top: 50, right: 10, bottom: 10, left: 10 }, animated: false })}                 
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation={true}>
            {this.state.markers.map((marker) => (
              <Marker
              key={marker.key}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              pinColor={marker.intensity == 'Slow' ?
              'blue' : marker.intensity == 'Intermediate' ?
              'turquoise' : marker.intensity == 'Brisk' ?
              'lime' : 'purple'}
              >
              <Callout onPress={() => this.onEventClick()}>
                <TouchableHighlight
                  underlayColor="transparent"
                >
                  <Text>{marker.title}{"\n"}{marker.description}</Text>
                </TouchableHighlight>
              </Callout>
            </Marker>
            ))}
          </MapView>
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
    alignItems: "center",
    paddingHorizontal: 15,
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
    marginBottom: 10
  },
  placeHolder: {
    marginLeft: 3,
    height: 40,
    fontSize: 15,
    color: "grey"
  },
  filterIcon: {
    fontSize: 25,
    marginLeft: "auto",
    transform: [{ rotate: "90deg" }]
  },
  map: {
    height: '92%'
  },
  container: {
    flex: 1,
  }
});

const mapStateToProps = state => {
  console.log("searchscreen");
  return {
    events: state.event.events,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {fetchEvents}
)(SearchScreen);
