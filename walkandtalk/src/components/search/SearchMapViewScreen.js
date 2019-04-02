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
  Dimensions
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Entypo from "react-native-vector-icons/Entypo";
import BaseCard from "../../cardview/baseCard";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import geolib from 'geolib'
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content
} from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

//Search Icon present in search bar
const searchIcon = require("../../assets/icons/search-bar.png");

//Below are the items in the filters
// For Intensity - Slow, Intermediate, Brisk
// For Venue - Indoor, Outdoor
// For Distance - 5km, 10km, 15km
const items = [
  {
    name: "Intensity",
    id: 0,
    children: [
      {
        name: "Slow",
        id: 11
      },
      {
        name: "Intermediate",
        id: 22
      },
      {
        name: "Brisk",
        id: 33
      }
    ]
  },
  {
    name: "Venue",
    id: 2,
    children: [
      {
        name: "Indoor",
        id: 44
      },
      {
        name: "Outdoor",
        id: 55
      }
    ]
  },
  {
    name: "Within",
    id: 1,
    children: [
      {
        name: "5 km",
        id: 66
      },
      {
        name: "10 km",
        id: 77
      },
      {
        name: "15 km",
        id: 88
      }
    ]
  }
];

// Returns user's current location
// Defaults to San Francisco on simulators
export const getCurrentLocation = () => {
 return new Promise((resolve, reject) => {
   navigator.geolocation.getCurrentPosition(position =>
     resolve(position),
     e => reject(e));
 });
};


/*
This is the search screen. Users can search for events in this screen.
*/
class SearchMapViewScreen extends Component {
  //text stores the input from user which is initalized to an empty string.
  //
  constructor(props) {
    super(props);
    console.log("inside constructor");
    this.props.fetchEvents();
    this.state = {
      confirmed: false,
      selectedItems: [],
      text: "",
      searchResults: [],
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      currentLocation: {
        currentLatitude: 0,
        currentLongitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markers: []
    };
  }



  async componentWillMount() {
    const position = await getCurrentLocation();
     if (position) {
       //Tracking location is still necessary for distance queries
       this.watchID = navigator.geolocation.watchPosition((position) => {
         let region = {
           latitude:       position.coords.latitude,
           longitude:      position.coords.longitude,
           latitudeDelta:  0.00922*1.5,
           longitudeDelta: 0.00421*1.5
         }
         this.onRegionChange(region, region.latitude, region.longitude);
       }, (error)=>console.log(error));

     }
   }

  //Fetch all events to search from
  // Place a tracker on the position of the deivce
  // Track movement
  // Create the object to update this.state.mapRegion through the onRegionChange function
  componentDidMount() {
    this.props.fetchEvents;
    console.log("all events in component did mount", this.props.events);
    console.log("marker state in component did mount", this.state.markers);
  }

  //Before leaving the component clear the watch of the device
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  //Function for setting the region and lat and lon when movement occurs
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }


//Function for navigating to view the selected event
  goToEvent = index => {
    markers = JSON.stringify(this.state.markers);
    markers = JSON.parse(markers);
    console.log("current markers", markers);

    marker = markers[index];
    console.log(marker, "marker after index");

    Actions.viewEvent({
      searchScreen: true,
      markerSent: marker
    });
  };

  //Updates the list of filters selected
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems: selectedItems });
  };

  //Function when the select button is selected in the multi picker, and it is closed
  onConfirm = () => {
    console.log(this.state.selectedItems, "multi-select closed");
    filters = this.state.selectedItems;

    this.setState(
      {
        selectedItems: [],
        markers: []
      },
      () => {
        console.log(this.state.selectedItems, "confirm SI state updated");
        console.log(this.state.markers, "confirm markers state updated");
      }
    );

    this.search(filters);
  };


//Takes in an array of intensity filter ids selected
// Returns an array of events that contain the filters selected
  check_intensity = i_arr =>{
    var results = []
    i_arr.forEach(function(i) {
      if (i == 11) {
        var i1 = events.filter(event => {
          return event.intensity === "Slow";
        });
        results = results.concat(i1);
      }
      if (i == 22) {
        var i2 = events.filter(event => {
          return event.intensity === "Intermediate";
        });
        results = results.concat(i2);
      }
      if (i == 33) {
        var i3 = events.filter(event => {
          return event.intensity === "Brisk";
        });
        results = results.concat(i3);
      }
    });

    console.log(results, "intensity results")
    return results
  }


  //Takes in an array of venue filter ids selected
  // Returns an array of events that contain the filters selected
  check_venue = v_arr =>{
    var results = []
    v_arr.forEach(function(v) {
      if (v == 44) {
        var v1 = events.filter(event => {
          return event.venue === "Indoor";
        });
        results = results.concat(v1);
      }
      if (v == 44) {
        var v2 = events.filter(event => {
          return event.venue === "Outdoor";
        });
        results = results.concat(v2);
      }
    });

    console.log(results, "venue results")
    return results
  }

  //Takes in an array of distance filter ids selected
  // Returns an array of events that contain the filters selected
  // Uses geolib library to calculate the distance between two points
  check_distance = d_arr =>{
    var results = []
    var i;
    var j;
    for (i = 0; i < d_arr.length; i++) {
      for(j=0; j< events.length; j++){
        //distance given in meters
        distance = geolib.getDistance(
          {latitude: this.state.lastLat, longitude: this.state.lastLong},
          {latitude: events[j].location.lat, longitude: events[j].location.long})
        console.log(this.state.lastLat, "lat", this.state.lastLong, "long")
        console.log("distance", distance)
        distance = distance /1000
        console.log("distance km", distance)

          if(d_arr[i]==66){
            if (distance<=5){
              results.push(events[j])
              console.log("5 km search")
            }
          }
          if(d_arr[i]==77){
            if(distance<=10){
              results.push(events[j])
              console.log("10 km search")
            }
          }
          if(d_arr[i]==88){
            if(distance<=15){
              results.push(events[j])
              console.log("15 km search")
            }
          }

      }
    }
    console.log(results, "distance results")
    return results
  }


//MAIN SEARCH function
// Splits the array of filters into smaller arrays of filter ids in section intensity, venue and distance
// If the length of the array is greater thatn zero will get events that fit that filter using check_*** function
// Calls combine result
// Sumbits results to submit results function to save to state
  search = filters => {

    filters = this.state.selectedItems;
    events = this.props.events;
    console.log(this.props.events, "events in search");

    if(filters.length ==0){
      return
    }

    //Array for intensity, venue and distance filters
    var results = [];
    var v_arr = [];
    var i_arr = [];
    var d_arr = [];

    //sort selected filters into categories
    filters.forEach(function(f) {
      if (f == 11 || f == 22 || f == 33) {
        i_arr.push(f);
      }
      if(f == 44 || f == 55){
        v_arr.push(f);
      }
      if(f == 66 || f == 77 || f == 88){
        d_arr.push(f)
      }
    });
    console.log(i_arr.length, "int arr");
    console.log(v_arr.length, "ven arr");
    console.log(d_arr.length, "dis arr");

    var howmany = 3

    if (i_arr.length!=0){
      temp = this.check_intensity(i_arr)
      results.push(temp)
    }else{
      howmany = howmany -1
    }

    if (v_arr.length!=0){
      temp = this.check_venue(v_arr)
      results.push(temp)
    }else{
      howmany = howmany -1
    }

    if (d_arr.length!=0){
      temp = this.check_distance(d_arr)
      results.push(temp)
    }else{
      howmany = howmany -1
    }

  console.log("results before combine", results)
  total_results = this.combineResults(results, howmany)

  //Convert to string then to object
  //results = JSON.stringify(total_results);
  //results = JSON.parse(total_results);
  console.log(total_results, "results after combine");

  //SubmitSearch function to save to state
  this.submitSearch(total_results);

  }


//finalizes the search results
// If only one filter was selected - total_arr == 1, then return results
// If two filters selected - total_arr == 2, check for where items exist in both arrays and return those
// If three filters selected - total_arr == 3, check for where items exist in both arrays, then repeat again with the last array and return those
  combineResults = (results , total_arr) => {
    var combine_res =[]
    if (total_arr == 1){
      console.log("return me 1", results)
      return results[0]
    }
    //Two arrays results [0] and results [1]
    if(total_arr == 2){
      console.log(results[0], "res 0")
      console.log(results[1], "res 1")
      results[0].forEach( function (res) {
        console.log(results[1].indexOf(res), "index value")
      if(results[1].indexOf(res) > -1) {
        combine_res.push(res);
        console.log("pushed", res)
        }
      });
        console.log("return me 2", combine_res)
      return combine_res
    }

    if(total_arr == 3){
      results[0].forEach( function (res) {
      if(results[1].indexOf(res) > -1) {
        combine_res.push(res);
        }
      });

      var final_res = combine_res
      combine_res.forEach( function (res) {
      if(results[2].indexOf(res) > -1) {
        final_res.push(res);
        }
      });
      console.log("return me 3", final_res)
      return final_res
    }
  }


//Saves the search results to state
  submitSearch = results => {
    this.setState({ searchResults: results }, () => {
      console.log(this.state.searchResults, "make sure state updated");
      this.makeMarkers(results);
    });
  };

//Using the search results from state, convert them to markers that can be placed on the map
  makeMarkers = results => {
    console.log(results, "make marker events");
    markers = [];
    results.forEach(function(e) {
      console.log(e.location.lat, "lat")
      e.latitude = e.location.lat;
      e.longitude = e.location.long;
      markers.push(e);
    });
    this.setState({ markers: markers }, () => {
      console.log(markers, "markers");
    });
  };


//*Fits the coordinates to map, or sets the region** needs further implementation**
  layoutMap = () => {
    markers = this.state.markers;
    if (markers.length != 0) {
      this.mapRef.fitSuppliedMarkers(this.state.markers, {
        edgePadding: { top: 50, right: 10, bottom: 10, left: 10 },
        animated: true
      });
    }else{

      this.mapRef.fitToCoordinates(this.state.region, {
        edgePadding: { top: 50, right: 10, bottom: 10, left: 10 },
        animated: true
      });
    }
  };


//Set the keyword entered to the state, and clear it after
  setKeyword = text => {
    this.setState(
      {
        text: text,
        selectedItems: [],
        markers: []
      },
      () => {
        console.log(this.state.text, "keyword state updated");
        console.log(this.state.selectedItems, "SI state updated");
        console.log(this.state.markers, "markers state updated");
      }
    );
  };

  //Key word search
  // Searches through out the whole object
  keywordSearch = () => {
    events = this.props.events;
    keyword = this.state.text;

    this.setState(
      {
        markers: [],
        text: ""
      },
      () => {
        console.log(this.state.markers, "cleared markers for keyword search");
      }
    );

    console.log("events in keyword", events);
    console.log("keyword", keyword);
    //convert each item to a string and see if the key word exists as a subset
    // if so, push that event to the list of results to be displayed
    //Case insensitive
    var results = [];
    keyword = keyword.toUpperCase()
    events.forEach(function(e) {
      var stringItem = JSON.stringify(e);
      stringItem = stringItem.toUpperCase()
      if (stringItem.includes(keyword)) {
        if (results.indexOf(e) == -1) {
          results.push(e);
        }
      }
    });

    this.setState(
      {markers: results},() => {
        console.log(this.state.markers, "updated markers for display");
      }
    );
  };

  render() {
    filterHeader = (
      <Header
        style={ScreenStyleSheet.header}
        androidStatusBarColor="#A680B8"
        androidStatusBarStyle="light-content"
      >
        <Body style={ScreenStyleSheet.headerBody}>
          <Title>Filter</Title>
        </Body>
      </Header>
    );


    filterPopup = (
      <View>
        <SectionedMultiSelect
          items={items}
          uniqueKey="id"
          subKey="children"
          iconKey="icon"
          headerComponent={filterHeader}
          confirmText="Select"
          onConfirm={this.onConfirm}
          showChips={false}
          showRemoveAll={false}
          hideSearch={true}
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          onPress={() => this.SectionedMultiSelect._removeAllItems()}
          colors={{
            primary: this.state.selectedItems.length ? "#A680B8" : "crimson"
          }}
          styles={{
            selectedItemText: {
              color: "#A680B8"
            },
            selectedSubItemText: {
              color: "#A680B8"
            },
            chipText: {
              maxWidth: Dimensions.get("screen").width - 90
            },
            chipWrapper: {
              marginBottom: 15,
              backgroundColor: "red"
            },
            container: {
              marginBottom: 200
            },
            selectToggle: {
              width: 40,
              height: 40,
              marginBottom: 15,
              marginTop: 10,
              borderWidth: 1,
              borderColor: "grey",
              borderTopRightRadius: 3,
              borderBottomRightRadius: 3,
              marginRight: 5,
              paddingTop: 5,
              backgroundColor: "#A680B8",
              alignSelf: "flex-end"
            }
          }}
          cancelIconComponent={
            <Icon size={20} name="close" style={{ color: "white" }} />
          }
        />
      </View>
    );

    return (
      <Container>

        <Content
          contentContainerStyle={[ScreenStyleSheet.content, { flex: 1 }]}
        >
          {/* Search bar */}
          <View style={styles.box}>
            <TouchableOpacity onPress={this.search} activeOpacity={0}>
              <Image
                style={ScreenStyleSheet.searchIcon}
                source={require("../../assets/icons/search-bar.png")}
              />
            </TouchableOpacity>
            <TextInput
              value={this.state.text}
              placeholder="Search"
              style={styles.placeHolder}
              onChangeText={this.setKeyword}
              onSubmitEditing={this.keywordSearch}
            />
          </View>
          {filterPopup}

          <View style={ScreenStyleSheet.lineSeparator} />
          {/* Map View */}
          <MapView
            ref={ref => {
              this.mapRef = ref;
            }}
            onLayout={() => {
              this.layoutMap;
            }}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation={true}
            region={this.state.region}
            onRegionChange={this.onRegionChange.bind(this)}
          >
            {this.state.markers.map((marker, idx) => (
              <Marker
                key={idx}
                coordinate={{
                  latitude: marker.location.lat,
                  longitude: marker.location.long
                }}
                pinColor={
                  marker.intensity == "Slow"
                    ? "blue"
                    : marker.intensity == "Intermediate"
                    ? "turquoise"
                    : marker.intensity == "Brisk"
                    ? "lime"
                    : "purple"
                }
              >
                <Callout onPress={() => this.goToEvent(idx)}>
                  <TouchableHighlight underlayColor="transparent">
                    <Text>{marker.title}</Text>
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
    width: Dimensions.get("screen").width - 70,
    borderWidth: 1,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    borderColor: "grey",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "flex-start",
    position: "absolute"
  },
  boxWithFilter: {
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10
  },
  placeHolder: {
    marginLeft: 3,
    height: 40,
    fontSize: 15,
    color: "grey",
    width: "75%"
  },
  filterIcon: {
    fontSize: 25,
    marginLeft: "auto",
    transform: [{ rotate: "90deg" }]
  },
  map: {
    height: "92%"
  },
  container: {
    flex: 1
  }
});

const mapStateToProps = state => {
  console.log("search map view screen");
  return {
    events: state.event.events,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchEvents }
)(SearchMapViewScreen);
