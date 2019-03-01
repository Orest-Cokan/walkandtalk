import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Screen
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  // Header
  header: {
    backgroundColor: '#A680B8',
    height: 40
  },
  headerBody:{
    flex: 1,
    alignItems: 'center'
  },

  // Content
  content: {
    marginHorizontal: "3%",
    marginVertical: "3%",
  },

  // Side-by-side buttons
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    fontSize: 18,
  },

  // Line separator
  lineSeparator: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5
  },

   // Profile tab
   profileHeader: {
     alignItems: 'center',
   },
   avatar: {
     width: 75,
     height: 75,
     borderRadius: 60,
     borderWidth: 3,
     borderColor: 'black',
     marginBottom: 10,
   },
   editProfile: {
     alignSelf: 'flex-end',
     position: 'absolute',
   },
   editIcon:{
     height: 30,
     width: 30,
   },
   profileName: {
     fontSize: 18,
     color: 'black',
     fontWeight:'500',
   },
   profileSectionTitle: {
     fontWeight: 'bold',
     color: 'gray',
   },
   profileRowInfo: {
     flex: 1,
     marginBottom: 5,
   },
   profileInfo:{
     color: "gray"
   },
   profileInput: {
     textAlign: 'right',
     color: 'black'
   },



});
