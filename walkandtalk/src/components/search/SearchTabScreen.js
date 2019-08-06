import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Title,
  Icon,
  Tabs,
  Tab,
  Text,
  Body,
  TabHeading
} from "native-base";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Platform
} from "react-native";
import TabOne from "./SearchListViewScreen";
import TabTwo from "./SearchMapViewScreen";
import BaseCard from "../../cardview/baseCard";
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { connect } from "react-redux";
import { fetchNonUserEvents } from "../../actions/EventActions";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { Actions } from "react-native-router-flux";
import Loader from "../../constants/loader";
import { items } from "../../constants/Tags";

class SearchTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
      selectedItems: [],
      text: null,
      searchProps: [],
      searchResults: [],
      mapRegion: {
        latitude: 53.5325,
        longitude: -113.4964,
        latitudeDelta: 0.252,
        longitudeDelta: 0.00421
      },
      lastLat: null,
      lastLong: null,
      loading: false
    };
    this.props.fetchNonUserEvents(this.props.token, this.props.user.user.email);
  }

  componentDidMount() {
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.setState({ loading: true });
        await this.props.fetchNonUserEvents(
          this.props.token,
          this.props.user.user.email
        );
        this.getInitialEvents();
        this.setState({ loading: false });
      }
    );
  }

  //Updates the list of filters selected
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems: selectedItems });
  };

  //Function when the select button is selected in the multi picker, and it is closed
  onConfirm = () => {
    filters = this.state.selectedItems;

    this.setState({ selectedItems: [] }, () => {
      console.log(this.state.selectedItems, "confirm SI state updated");
    });

    this.search(filters);
  };

  // Loads the initial events into the view
  getInitialEvents() {
    let events = [];
    this.props.events.map((event, index) => {
      let badge = null;
      let attending = false;
      if (this.props.user.user.email == event.email) {
        badge = "HOSTING";
      } else {
        for (let i = 0; i < event.attendees.length; i++) {
          if (event.attendees[i].email == this.props.user.user.email) {
            badge = "GOING";
            break;
          }
        }
      }
      if (this.props.user.user.email == event.email) {
        attending == true;
      } else {
        for (let i = 0; i < event.attendees.length; i++) {
          if (event.attendees[i].email == this.props.user.user.email) {
            attending = true;
          }
        }
      }

      if (!attending) {
        events.unshift(
          <TouchableOpacity
            key={index}
            onPress={this.viewEvent.bind(this, index, badge)}
          >
            <BaseCard
              date={event.date}
              start_time={event.start_time}
              title={event.title}
              location={event.location.streetName}
              badge={badge}
            />
          </TouchableOpacity>
        );
      }
    });
    this.setState({ searchProps: events, searchResults: this.props.events });
  }

  //Before leaving the component clear the watch of the device
  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  viewEvent(index, badge) {
    Actions.viewEvent({
      event: this.props.events[index],
      badge: badge
    });
  }

  //MAIN SEARCH function
  // Splits the array of filters into smaller arrays of filter ids in section intensity, venue and distance
  // If the length of the array is greater thatn zero will get events that fit that filter using check_*** function
  // Calls combine result
  // Sumbits results to submit results function to save to state
  search = filters => {
    filters = this.state.selectedItems;
    events = this.props.events;

    if (filters.length == 0) {
      return;
    }

    //Array for intensity, venue and distance filters
    var results = [];
    var v_arr = [];
    var i_arr = [];
    var t_arr = [];

    //sort selected filters into categories
    filters.forEach(function(f) {
      if (f == 11 || f == 22 || f == 33) {
        i_arr.push(f);
      }
      if (f == 44 || f == 55) {
        v_arr.push(f);
      }
      if (f == 100 || f == 101 || f == 102 || f == 103 || f == 104) {
        t_arr.push(f);
      }
    });

    var howmany = 3;

    if (i_arr.length != 0) {
      temp = this.check_intensity(i_arr);
      results.push(temp);
    } else {
      howmany = howmany - 1;
    }

    if (v_arr.length != 0) {
      temp = this.check_venue(v_arr);
      results.push(temp);
    } else {
      howmany = howmany - 1;
    }

    if (t_arr.length != 0) {
      temp = this.check_tags(t_arr);
      results.push(temp);
    } else {
      howmany = howmany - 1;
    }

    total_results = this.combineResults(results, howmany);

    //SubmitSearch function to save to state
    this.submitSearch(total_results);
  };

  //Takes in an array of intensity filter ids selected
  // Returns an array of events that contain the filters selected
  check_intensity = i_arr => {
    var results = [];
    i_arr.forEach(function(i) {
      if (i == 11) {
        var i1 = events.filter(event => {
          return event.intensity == "Slow";
        });
        results = results.concat(i1);
      }
      if (i == 22) {
        var i2 = events.filter(event => {
          return event.intensity == "Intermediate";
        });
        results = results.concat(i2);
      }
      if (i == 33) {
        var i3 = events.filter(event => {
          return event.intensity == "Brisk";
        });
        results = results.concat(i3);
      }
    });

    return results;
  };

  //Takes in an array of venue filter ids selected
  // Returns an array of events that contain the filters selected
  check_venue = v_arr => {
    var results = [];
    v_arr.forEach(function(v) {
      if (v == 44) {
        var v1 = events.filter(event => {
          return event.venue == "Indoor";
        });
        results = results.concat(v1);
      }
      if (v == 55) {
        var v2 = events.filter(event => {
          return event.venue == "Outdoor";
        });
        results = results.concat(v2);
      }
    });
    return results;
  };

  // Aggregate search results
  // If only one filter was selected - total_arr == 1, then return results
  // If two filters selected - total_arr == 2, check for where items exist in both arrays and return those
  // If three filters selected - total_arr == 3, check for where items exist in first 2 arrays, then repeat again with the last array and return those
  combineResults = (results, total_arr) => {
    var combine_res = [];
    console.log("these are our results: " + JSON.stringify(results));
    if (total_arr == 1) {
      return results[0];
    }
    //Two arrays results [0] and results [1]
    if (total_arr == 2) {
      results[0].forEach(function(res) {
        if (results[1].indexOf(res) > -1) {
          combine_res.push(res);
        }
      });
      return combine_res;
    }

    if (total_arr == 3) {
      results[0].forEach(function(res) {
        if (results[1].indexOf(res) > -1) {
          combine_res.push(res);
          console.log("we pushed 1");
        }
      });

      var final_res = combine_res;
      combine_res.forEach(function(res) {
        if (results[2].indexOf(res) > -1) {
          final_res.push(res);
          console.log("we pushed 2");
        }
      });
      console.log(final_res + "why is this wrong");
      return final_res;
    }
  };

  submitSearch = results => {
    let events = [];
    results.map((event, index) => {
      let badge = null;
      let attending = false;
      if (this.props.user.user.email == event.email) {
        badge = "HOSTING";
      } else {
        for (let i = 0; i < event.attendees.length; i++) {
          if (event.attendees[i].email == this.props.user.user.email) {
            badge = "GOING";
            break;
          }
        }
      }
      if (this.props.user.user.email == event.email) {
        attending == true;
      } else {
        for (let i = 0; i < event.attendees.length; i++) {
          if (event.attendees[i].email == this.props.user.user.email) {
            attending = true;
          }
        }
      }

      if (!attending) {
        events.unshift(
          <TouchableOpacity
            key={index}
            onPress={this.viewEvent.bind(this, index, badge)}
          >
            <BaseCard
              date={event.date}
              start_time={event.start_time}
              title={event.title}
              location={event.location.streetName}
              badge={badge}
            />
          </TouchableOpacity>
        );
      }
    });
    this.setState({ searchProps: events, searchResults: results });
    this.setState({ searchResults: results }, () => {
      console.log(this.state.searchResults, "make sure state updated");
    });
  };

  //Using the search results from state, convert them to coordinate objects that can be placed on the map
  makeCoords = results => {
    coords = [];
    results.forEach(function(e) {
      coords.push({
        latitude: e.location.lat,
        longitude: e.location.long,
        latitudeDelta: 0.001 * 1.5,
        longitudeDelta: 0.04 * 1.5
      });
    });
    return coords;
  };

  //Function for setting the region and lat and lon when movement occurs
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  getCoords() {
    if (this.state.searchResults.length == 0) {
      coords = this.makeCoords(this.props.events);
    } else {
      coords = this.makeCoords(this.state.searchResults);
    }
    return coords;
  }
  returnMargin() {
    if (Platform.OS == "ios") {
      return 15;
    } else {
      return 10;
    }
  }
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
              marginTop: Dimensions.get("screen").height * 0.1,
              marginBottom: 200
            },
            selectToggle: {
              width: 40,
              height: 40,
              marginBottom: 15,
              marginTop: this.returnMargin(),
              borderWidth: 1,
              borderColor: "grey",
              borderTopRightRadius: 3,
              borderBottomRightRadius: 3,
              marginLeft:
                Dimensions.get("screen").width -
                Dimensions.get("screen").width * 0.4,
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
        <Loader loading={this.state.loading} />
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Search</Title>
          </Body>
        </Header>

        {!this.state.loading && (
          <Content
            contentContainerStyle={[ScreenStyleSheet.content, { flex: 1 }]}
          >
            {/* Search bar */}
            <View
              style={Platform.OS == "ios" ? styles.boxIos : styles.boxAndroid}
            >
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
                onEndEditing={this.keywordSearch}
              />
              {Platform.OS == "ios" ? filterPopup : null}
            </View>
            {Platform.OS == "android" ? filterPopup : null}
            <Tabs
              tabBarUnderlineStyle={{
                borderBottomWidth: 2,
                borderColor: "#A680B8"
              }}
            >
              <Tab
                heading={
                  <TabHeading style={{ backgroundColor: "#FFFFFF" }}>
                    <Text style={{ color: "#A680B8" }}>List</Text>
                  </TabHeading>
                }
              >
                <TabOne results={this.state.searchProps} />
              </Tab>
              <Tab
                heading={
                  <TabHeading style={{ backgroundColor: "#FFFFFF" }}>
                    <Text style={{ color: "#A680B8" }}>Map</Text>
                  </TabHeading>
                }
              >
                <TabTwo
                  resultsCoords={this.getCoords()}
                  results={this.state.searchResults}
                  region={this.state.mapRegion}
                  onRegionChange={this.onRegionChange.bind(this)}
                />
              </Tab>
            </Tabs>
          </Content>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  boxAndroid: {
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
  boxIos: {
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
    alignSelf: "flex-start"
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
  return {
    events: state.event.nonUserEvents,
    user: state.user,
    token: state.token.token
  };
};

export default connect(
  mapStateToProps,
  { fetchNonUserEvents }
)(SearchTabScreen);
