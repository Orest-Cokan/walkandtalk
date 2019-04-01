import React, { Component} from "react";
import { connect } from "react-redux";
import {TouchableOpacity} from "react-native"
import {
    StyleSheet,
    Image,
    View,
     Text
  } from "react-native";
import ScreenStyleSheet from "../constants/ScreenStyleSheet";
import { Actions } from "react-native-router-flux";
import {getUser} from "../actions/UserActions";

/*
This is the view for user card.
Parameters: User email
Returns: The list view that contains information about the event.
*/

class UserCard extends Component {


    render() {
        return (
          <View style={styles.userCardView}>
                <View>
                <Image
                style={styles.imageView}
                source={require("../assets/icons/default-profile.png")}
                />
                </View>
                <View>
                <Text style={styles.userNameView}>
                    {this.props.fullname}
                </Text>
                </View>
            </View>
        );
      }
    }



//Styles
const styles = StyleSheet.create({
  imageView: {
    height: 25,
    width: 25,
    marginLeft: 10
    
  },
  userNameView:{
    fontSize: 16,
    color: "black",
    marginLeft: 15
  },
  userCardView:{
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 20,
    paddingTop: 7
  }
});


export default UserCard;


