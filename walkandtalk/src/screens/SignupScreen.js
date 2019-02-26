import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Form, Separator,InputField, LinkField, SwitchField, PickerField,DatePickerField,TimePickerField} from 'react-native-form-builder';
import GenerateForm from 'react-native-form-builder';
import { goSignup, goHome, goLogin } from '../initialNavigation/index';
import startMainTabs from "../navigation/MainTabNavigator";


export default class SignupScreen extends Component {

  constructor(props) {
    	super(props);

     }

  loginHandler = () => {
    startMainTabs();
  };

  authHandler = () => {
    goLogin();
  };

  render() {
    return (

      <ScrollView>
      <View style={styles.header}>
      <Text style={styles.headerText}> Sign Up </Text>
      </View>
      <View>
        <GenerateForm
          ref={(c) => {
            this.formGenerator = c;
          }}
          fields={fields}
        />
      </View>
        <View style={styles.nestedButtonView}>
            <TouchableOpacity
            style= {styles.cancelButton}
             onPress={this.authHandler}>
             <Text style={styles.buttonText}> CANCEL </Text>
           </TouchableOpacity>
           <TouchableOpacity
             style= {styles.submitButton}
             onPress={() => Alert.alert(
               'Success!',
               'Thank you for signing up!\nYour information has been forwarded to our researchers for evaluation.\nExpect to recieve an email within 7 days.',
               [{text: 'OK', onPress: this.authHandler}],
               { cancelable: false }
             )}>
            <Text style={styles.buttonText}> SUBMIT </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}




const styles = {
  wrapper: {
    flex: 1,
    marginTop: 150
  },
  header:{
    backgroundColor: '#c391d0',
    width: '100%',
    height: 40
  },
  headerText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  submitButton:{
    marginTop: 30,
    marginBottom:30,
    marginRight:10,
    marginLeft:10,
    padding: 10,
    backgroundColor: '#c391d0',
    borderRadius: 8
  },
  cancelButton:{
    marginTop: 30,
    marginBottom:30,
    marginRight:10,
    marginLeft:10,
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 8
  },
  buttonText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  nestedButtonView: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf:'center'
}
};
// These Fields will create a login form with three fields
const fields = [
  {
    type: 'text',
    name: 'full_name',
    required: true,
    label: 'Full Name',
  },
  {
    type: 'text',
    name: 'email',
    required: true,
    label: 'Email Address',
  },
  {
    type: 'text',
    name: 'ConfirmEmail',
    required: true,
    label: 'Confirm Email',
  },
  {
    type: 'password',
    name: 'password',
    required: true,
    label: 'Password',
  },
  {
    type: 'password',
    name: 'confirmPass',
    required: true,
    label: 'Confirm Password',
  },
  {
    type: 'date',
    name: 'birthday',
    required: true,
    mode: 'date',
    label: 'Date of Birth',
  }
];
