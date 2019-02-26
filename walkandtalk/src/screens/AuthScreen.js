import React, { Component } from "react";
import { StyleSheet, AppRegistry, View, Text,TextInput, Button, TouchableOpacity, Image} from "react-native";
import { createStackNavigator, createAppContainer, stackNavigator } from 'react-native-navigation';
import {
  Navigation,
  OptionsModalPresentationStyle
} from "react-native-navigation";
import GenerateForm from 'react-native-form-builder';
import { goSignup } from '../initialNavigation/index';
import startMainTabs from "../navigation/MainTabNavigator";


class AuthScreen extends Component {

  constructor(props) {
    	super(props);

     }

  loginHandler = () => {
    startMainTabs();
  };

  signupHandler = () => {
    goSignup();
  };




  render() {

    return (
      <View>
        <Text style={styles.logo}>WALK AND TALK</Text>
        <View>
          <GenerateForm
            ref={(c) => {
              this.formGenerator = c;
            }}
            fields={fields}
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.loginHandler}
        >
          <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableOpacity>

        <Text style={styles.signUp}>New to Walk and Talk?</Text>

         <View style={styles.nestedButtonView}>

           <Text style={styles.signUp}>Sign up</Text>

           <TouchableOpacity
            style={styles.signupButton}
            onPress={this.signupHandler}>
            <Text style={styles.here}> Here </Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}


const fields = [
  {
    type: 'text',
    name: 'Email',
    required: true,
    label: 'Email',
  },
  {
    type: 'password',
    name: 'password',
    required: true,
    label: 'Password',
  }
];



const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 150
  },
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
      marginBottom:80,
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
      color:'#c391d0',
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
