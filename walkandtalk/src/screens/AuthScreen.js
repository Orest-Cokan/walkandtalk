import React, { Component } from "react";
import { StyleSheet, AppRegistry, View, Text,TextInput, Button, TouchableOpacity, Image} from "react-native";

import startMainTabs from "../navigation/MainTabNavigator";

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  };

  render() {
    return (
      <View>
        <Text style={styles.logo}>WALK AND TALK</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Email Address"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput style={styles.inputBox}
          style={styles.inputBox}
          placeholder="Password"
          onChangeText={(text) => this.setState({text})}
        />

        <TouchableOpacity
         style={styles.loginButton}
         onPress={this.loginHandler}>
         <Text style={styles.buttonText}> LOGIN </Text>
       </TouchableOpacity>

       <Text style={styles.signUp}>New to Walk and Talk?</Text>

         <View style={styles.nestedButtonView}>
         <Text style={styles.signUp}>Sign up</Text>
         <TouchableOpacity
          style={styles.signupButton}
          onPress={this.loginHandler}>
          <Text style={styles.here}> Here </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    logo:{
      fontWeight: 'bold',
      fontSize: 50,
      color: '#c391d0',
      textAlign: 'center',
      marginBottom: 60,
      marginTop: 80,
    },
    inputBox: {
      alignSelf: 'center',
      borderWidth: 2,
      borderRadius: 2,
      borderColor: 'grey',
      height: 40,
      padding: 10,
      width: 360,
      marginTop: 10,
      marginBottom:10,
      marginRight:15,
      marginLeft:15,
      fontSize: 18
    },
    loginButton:{
      marginTop: 30,
      marginBottom:120,
      marginRight:50,
      marginLeft:50,
      padding: 10,
      backgroundColor: '#c391d0',
      borderRadius: 8
    },
    signupButton:{
    },
    buttonText:{
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold'
    },
    signUp:{
      fontSize: 18,
      color:'black',
      textAlign:'center'
    },
    here:{
      fontSize: 18,
      color:'black',
      textDecorationLine: 'underline',
      textAlign: 'right'
    },
    nestedButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center'
  }
});

export default AuthScreen;
