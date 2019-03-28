import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { Right } from "native-base";

export default StyleSheet.create({
  // Screen
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },

  // Header
  header: {
    backgroundColor: "white",
    height: 45,
    fontFamily: "proxima_nova_reg"
  },
  headerBody: {
    flex: 1,
    alignItems: "center"
  },
  headerTitle: {
    color: "grey"
  },
  headerSides: {
    flex: 1
  },
  sideBarHeaderBody: {
    marginLeft: 5
  },
  sideBarTextItem: {
    marginLeft: 10
  }, 

  // Back icon
  headerIcon: {
    height: 20,
    width: 20
  },

  // Content
  content: {
    marginHorizontal: "3%",
    marginVertical: "3%"
  },

  // Side-by-side buttons
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftRightButton: {
    width: "45%",
    height: 30,
    marginVertical: 30,
    marginHorizontal: 10
  },

  // Section title
  sectionTitle: {
    marginBottom: 10,
    fontSize: 18
  },

  // Line separator
  lineSeparator: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5
  },

  // Asterisk

  asterisk: {
    color: "#DD5581"
  },

  // Search tab

  searchIcon: {
    height: 20,
    width: 20
  },

  // Profile tab
  profileHeader: {
    alignItems: "center"
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "black",
    marginBottom: 10
  },
  editProfile: {
    alignSelf: "flex-end",
    position: "absolute"
  },
  editIcon: {
    height: 30,
    width: 30
  },
  profileName: {
    fontSize: 18,
    color: "black",
    fontWeight: "500"
  },
  profileSectionTitle: {
    fontWeight: "bold",
    color: "gray"
  },
  profileRowInfo: {
    flex: 1,
    marginBottom: 8
  },
  profileInfo: {
    color: "gray"
  },
  profileInfoInput: {
    color: "black",
    textAlign: "right"
  },

  // Forms
  formRowContainerEvent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 13
  },
  formInfo: {
    color: "gray",
    fontSize: 15
  },
  formRowInfo: {
    flex: 1,
    marginBottom: 10
  },
  formDescriptionInput: {
    textAlignVertical: "top",
    borderWidth: 0.5,
    borderColor: "gray",
    color: "black",
    padding: 5,
    fontSize: 15
  },
  formInput: {
    textAlign: "left",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    borderTopWidth: 0.5,
    borderTopColor: "transparent",
    color: "black",
    padding: 0,
    fontSize: 15
  },

  formInputUneditable: {
    textAlign: "left",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    color: "gray",
    padding: 0,
    fontSize: 15
  },
  TitleHeader: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 15
  },

  // Validation
  formInputError: {
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  formInputValid: {
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
  },
  formErrorMessage: {
    color: "red",
  },

  //Events
  EventSectionTitle: {
    fontWeight: "bold",
    color: "#A680B8",
    fontSize: 18
  },

  eventIcons: {
    width: 25,
    height: 25,
    marginBottom: 10,
    marginRight: 7,
    position: "relative"
  },

  eventInfoInput: {
    textAlign: "left",
    color: "black",
    fontSize: 16,
    paddingBottom: 2
  },
  rowContainerEvent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 13
  },
  rowContainerEvent2: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 2
  },
  attending: {
    textAlign: "left",
    color: "#A680B8",
    fontSize: 16,
    paddingBottom: 2,
    fontWeight: "bold"
  },
  attendingText: {
    textAlign: "left",
    color: "black",
    fontSize: 16,
    marginLeft: 4
  },
  // Line separator
  EventLineSeparator: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 5
  },

  aboutInfo: {
    textAlign: "left",
    color: "grey",
    fontSize: 16,
    paddingBottom: 2
  },

  eventDescription: {
    textAlign: "left",
    color: "black",
    fontSize: 16,
    marginLeft: 2,
    marginRight: 2,
    height: 230
  },
  eventDescription1: {
    textAlign: "left",
    color: "black",
    fontSize: 16,
    marginLeft: 2,
    marginRight: 2,
    height: 165
  },

  headerWithBack: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
});
