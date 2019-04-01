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

    constructor(props) {
        super(props);
        this.props.getUser = this.props.getUser(
            this.props.user.user.email
          );
    }

    componentDidMount() {
        this.props.getUser;
      }

    viewOtherProfile = () => {
        // Navigate to view this event
       console.log("we are going to view other profile")
      };

    checkIfResearcher = () =>{

        if(this.props.user.user.researcher == false){
            return(
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
        }else{
            return(
            <TouchableOpacity onPress={this.viewOtherProfile}>
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
            </TouchableOpacity>
            );

        }
    }


    render() {
        return this.checkIfResearcher();
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

const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  
  export default connect(
    mapStateToProps,
    {getUser}
  )(UserCard);


