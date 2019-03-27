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
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      e => reject(e)
    );
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

  // async componentWillMount() {
  //   const position = await getCurrentLocation();
  //   if (position) {
  //     this.setState({
  //       currentLocation: {
  //         currentLatitude: position.coords.latitude,
  //         currentLongitude: position.coords.longitude,
  //         latitudeDelta: 0.003,
  //         longitudeDelta: 0.003
  //       }
  //     });
  //   }
  //   console.log("current location", this.state.currentLocation)
  // }

  componentWillMount() {
    this.props.fetchEvents;
    console.log("all events", this.props.events);
    console.log("marker state", this.state.markers);

    // const position = getCurrentLocation();
    // if (position) {
    //   this.setState({
    //     currentLocation: {
    //       currentLatitude: position.coords.latitude,
    //       currentLongitude: position.coords.longitude,
    //       latitudeDelta: 0.003,
    //       longitudeDelta: 0.003
    //     }
    //   });
    // }
    // console.log("current location", this.state.currentLocation)
    //
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    }, (error)=>console.log(error));
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }



  goToEvent = index => {
    // Navigate to view this event
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

  onSelectedItemsChange = selectedItems => {
    //currentItems = this.state.searchResults
    //if(currentItems.length > selectedItems.length){
    //this.setState({ selectedItems: selectedItems }, () => {
    //  console.log(this.state.selectedItems, 'selected items changed...searching');
    //});
    //this.search()
    //}else{
    //this.setState({ selectedItems: selectedItems }, () => {
    //  console.log(this.state.selectedItems, 'selected items changed... no search yet');
    //});
    this.setState({ selectedItems: selectedItems });
  };

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

  search = filters => {
    filters = this.state.selectedItems;
    events = this.props.events;
    console.log(this.props.events, "events in search");

    var results = [];
    var v_arr = [];
    var i_arr = [];

    //sort selected filters into categories
    filters.forEach(function(f) {
      if (f == 11 || f == 22 || f == 33) {
        i_arr.push(f);
      } else {
        v_arr.push(f);
      }
    });
    console.log(i_arr.length, "int arr");
    console.log(v_arr.length, "ven arr");

    //only intensity filters selected
    if (i_arr.length >= 1 && v_arr.length == 0) {
      console.log("HERE");
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
    }

    //only venue filters selected
    if (i_arr.length == 0 && v_arr.length >= 1) {
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
    }

    //Both intensity and venue filters selected - return objects that match all fields
    if (i_arr.length >= 1 && v_arr.length >= 1) {
      console.log("in both arr filters");

      var i;
      var j;
      var c;

      for (c = 0; c < events.length; c++) {
        for (i = 0; i < i_arr.length; i++) {
          for (j = 0; j < v_arr.length; j++) {
            if (i_arr[i] == "11") {
              intense = "Slow";
            }
            if (i_arr[i] == "22") {
              intense = "Intermediate";
            }
            if (i_arr[i] == "33") {
              intense = "Brisk";
            }
            if (v_arr[j] == "44") {
              ven = "Indoor";
            }
            if (v_arr[j] == "55") {
              ven = "Outdoor";
            }

            if (events[c].intensity == intense && events[c].venue == ven) {
              console.log(events[c], "events of i");
              results.push(events[c]);
              console.log("result event", results);
            }
          }
        }
      }
    }

    //Convert to string then to object
    results = JSON.stringify(results);
    results = JSON.parse(results);
    console.log(results, "results");

    //SubmitSearch function to save to state
    this.submitSearch(results);
  };

  //TBD if this works, waiting on lat and lon coordinates to be added to create events
  getDistance = results => {
    events = this.props.events;
    //For 5 km
    if (filters.indexOf(66) != -1) {
      events.forEach(function(e) {
        distance =
          3959 *
          acos(
            cos(radians(12.966958)) *
              cos(radians(lat)) *
              cos(radians(lon) - radians(80.1525835)) +
              sin(radians(12.966958)) * sin(radians(lat))
          );
        if (distance < 5) {
          results.append(e);
        }
      });
    }
    //For 10 km
    if (filters.indexOf(77) != -1) {
      events.forEach(function(e) {
        distance =
          3959 *
          acos(
            cos(radians(12.966958)) *
              cos(radians(lat)) *
              cos(radians(lon) - radians(80.1525835)) +
              sin(radians(12.966958)) * sin(radians(lat))
          );
        if (distance < 10) {
          results.append(e);
        }
      });
    }
    //For 15 km
    if (filters.indexOf(77) != -1) {
      events.forEach(function(e) {
        distance =
          3959 *
          acos(
            cos(radians(12.966958)) *
              cos(radians(lat)) *
              cos(radians(lon) - radians(80.1525835)) +
              sin(radians(12.966958)) * sin(radians(lat))
          );
        if (distance < 15) {
          results.append(e);
        }
      });
    }

    return results;
  };

  submitSearch = results => {
    this.setState({ searchResults: results }, () => {
      console.log(this.state.searchResults, "make sure state updated");
      this.makeMarkers(results);
    });
  };

  makeMarkers = results => {
    console.log(results, "make marker events");
    markers = [];
    results.forEach(function(e) {
      e.latitude = e.location.lat;
      e.longitude = e.location.long;
      markers.push(e);
    });
    this.setState({ markers: markers }, () => {
      console.log(markers, "markers");
    });
  };

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
    var results = [];
    events.forEach(function(e) {
      var stringItem = JSON.stringify(e);
      if (stringItem.includes(keyword)) {
        if (results.indexOf(e) == -1) {
          results.push(e);
        }
      }
    });

    this.setState(
      {
        markers: results
      },
      () => {
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

    // currentMarker = {
    //
    //   latitude: this.state.lastLat + 0.00050 || -36.82339,
    //   longitude: this.state.lastLong + 0.00050 || -73.03569,
    //   intensity: "Current",
    //   location: {
    //     lat: this.state.lastLat + 0.00050 || -36.82339,
    //     long: this.state.lastLong + 0.00050 || -73.03569
    //   }
    // }
    // this.state.markers.push(currentMarker)

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
    color: "grey"
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
  console.log("searchscreen");
  return {
    events: state.event.events,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchEvents }
)(SearchMapViewScreen);
