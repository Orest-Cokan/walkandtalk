import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";

// PROFILE TAB
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    // SET STATE ON INITIAL PROFILE SIGNUP
    this.state = {
      name: "Brittany Taylor",
      dob: "January 1, 1955",
      menopausalStage: "Peri",
      distance: 10,
      duration: 60,
      intensity: "Intermediate",
      venue: "Indoor",
      location: "Riverbend Area"
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContent}>
            <View style={styles.edit}>
              <Image
                style={styles.editIcon}
                source={require("../assets/icons/edit.png")}
              />
            </View>
            <Image
              style={styles.avatar}
              source={require("../assets/icons/profile.png")}
            />
            <Text style={styles.name}>{this.state.name}</Text>
          </View>

          <View style={styles.seperator} />

          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textHeader}>Basic Info</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Date of Birth</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.dob}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Age</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>
                {Math.floor(
                  (new Date().getTime() - Date.parse(this.state["dob"])) /
                    31557600000
                )}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Menopausal Stage</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.menopausalStage}</Text>
            </View>
          </View>

          <View style={styles.seperator} />

          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textHeader}>My Preferences</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>
                Length of Walk (by distance)
              </Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.distance} km</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>
                Length of Walk (by duration)
              </Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.duration} min</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Intensity</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.intensity}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Type of Venue</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.venue}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.textInfo}>
              <Text style={styles.textInfoStyle}>Location</Text>
            </View>
            <View style={styles.textInfo}>
              <Text style={styles.textInput}>{this.state.location}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Help Line Links</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Past Events</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(ProfileScreen);

// STYLES
const styles = StyleSheet.create({
  headerContent: {
    padding: 20,
    alignItems: "center",
    marginTop: 40
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "black",
    marginBottom: 10
  },
  edit: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 100
  },
  editIcon: {
    height: 30,
    width: 30,
    marginRight: 20
  },
  seperator: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  textInfo: {
    flex: 1,
    marginLeft: 15,
    marginBottom: 5
  },
  name: {
    fontSize: 20,
    color: "black",
    fontWeight: "500"
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 13,
    color: "gray"
  },
  textInfoStyle: {
    fontSize: 13,
    color: "gray"
  },
  textInput: {
    textAlign: "right",
    marginRight: 15,
    color: "black"
  },
  buttonContainer: {
    marginTop: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    marginLeft: 15,
    marginRight: 10
  }
});
