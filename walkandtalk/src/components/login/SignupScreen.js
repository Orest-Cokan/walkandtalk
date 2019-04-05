import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { createUser } from "../../actions/UserActions";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Button,
} from "native-base";
import SwitchSelector from "react-native-switch-selector";
import NumericInput from "react-native-numeric-input";
import { width } from "react-native-dimension";
import DatePicker from "react-native-datepicker";
import AwesomeAlert from 'react-native-awesome-alerts';
import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import {
  StyledText as Text,
  StyledTextInput as TextInput
} from "../../constants/StyledText";

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: null,
      password: null,
      confirmPassword: null,
      email: null,
      confirmEmail: null,
      confirmEmailCount: 1,
      dob: null,
      menopausal_stage: "Pre",
      intensity: "Slow",
      venue: "Indoor",
      location: null,
      duration: 0,
      distance: 0,
      
      // Error messages
      errorFullname: null,
      errorEmail: null,
      errorConfirmEmail: null,
      errorPassword: null,
      errorConfirmPassword: null,
      errorDOB: null,
      errorLocation: null,

      confirmationAlert: false,
      errorAlert: false,
    };

    // Component refs 
    this.fullname = React.createRef();
    this.email =  React.createRef();
    this.confirmEmail = React.createRef();
    this.password = React.createRef();
    this.confirmPassword = React.createRef();
    this.dob = React.createRef();
    this.location = React.createRef();
  }

  onBack = () => {
    // go back to last page
    Actions.pop();
  };
 
  showAlert(alert) {
    this.setState({
      [alert] : true
    });
  };
 
  hideAlert(alert) {
    this.setState({
      [alert]: false
    });
  };

  // Set state
  onChange(name, value) {
    this.setState({ [name]: value });
    // For datetime pickers
    if (name == 'dob') {
      this.showError(this.state.dob, this.dob, 'errorDOB');
    }
  };

  // Checks if email addresses match
  emailMatch = () => {
    if (this.state.email != this.state.confirmEmail) {
      return false;
    } else {
      return true;
    }
  };

  // Checks if passwords match
  passwordMatch = () => {
    if (this.state.password != this.state.confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  // Checks if input is null or empty
  isValid(input) {
    if (input == null || input == '' ) {
      return false;
    } else {
      return true;
    }
  }

  confirmInfo(name) {
    return (
      <View>
        
      </View>
    );

  }

  //Checks if password field is empty
  isPasswordEmpty(input){
    if (input == null || input == '' ) {
      this.password.current.setNativeProps(ScreenStyleSheet.formInputError);
      this.setState({ errorPassword : this.errorMessage("This is a required field.") });
    }else{
      this.isPasswordMatch()
    }     
  }

  //Checks if both passwords match
  isPasswordMatch(){
    if (this.state.password != this.state.confirmPassword) {
      this.password.current.setNativeProps(ScreenStyleSheet.formInputError);
      this.setState({ errorPassword : this.errorMessage("These passwords do not match.") });
    } else {
      this.password.current.setNativeProps(ScreenStyleSheet.formInputValid);
      this.confirmPassword.current.setNativeProps(ScreenStyleSheet.formInputValid);
      this.setState({ errorPassword : null });
      this.setState({ errorConfirmPassword : null });
    }
  }



  //Checks if email field is empty
  isEmailEmpty(input){
    if (input == null || input == '' ) {
      this.email.current.setNativeProps(ScreenStyleSheet.formInputError);
      this.setState({ errorEmail : this.errorMessage("This is a required field.") });
    }else{
      this.isEmailValid(input)
    }     
  }

  //Checks if email field contains a valid email format
  isEmailValid(input){
    var re = /\S+@\S+\.\S+/
    isEmailValid = re.test(input)
    if(!isEmailValid){
      this.email.current.setNativeProps(ScreenStyleSheet.formInputError);
      this.setState({ errorEmail : this.errorMessage("This email address is not valid.") });
    }else{
      this.isEmailMatch()
    }
  }

  //Checks if email field contains a valid email format - used for Showerror function
  isEmailValidAll(input, error){
    var re = /\S+@\S+\.\S+/
    isEmailValid = re.test(input)
    if(!isEmailValid){
      if(error === "errorEmail"){
        this.email.current.setNativeProps(ScreenStyleSheet.formInputError);
        this.setState({ errorEmail : this.errorMessage("This email address is not valid.") });
      }else{
        this.confirmEmail.current.setNativeProps(ScreenStyleSheet.formInputError);
        this.setState({ errorConfirmEmail : this.errorMessage("This email address is not valid.") });
      }
    }else{
      return true;
    }
  }

  //Checks if both emails match
  isEmailMatch(){
    if (this.state.email != this.state.confirmEmail) {
      this.email.current.setNativeProps(ScreenStyleSheet.formInputError);
      this.setState({ errorEmail : this.errorMessage("These email addresses do not match.") });
    } else {
      this.email.current.setNativeProps(ScreenStyleSheet.formInputValid);
      this.confirmEmail.current.setNativeProps(ScreenStyleSheet.formInputValid);
      this.setState({ errorEmail : null });
      this.setState({ errorConfirmEmail : null });
    }
  }



  // Shows error message
  showError(input, ref, error) {

    // If input is valid 
    if (this.isValid(input)) {
      // Checks if email addresses match
      if (this.email == ref || this.confirmEmail == ref) {
        if(this.isEmailValidAll(input, error)){
          if (this.emailMatch()) {
            this.email.current.setNativeProps(ScreenStyleSheet.formInputValid);
            this.confirmEmail.current.setNativeProps(ScreenStyleSheet.formInputValid);
            this.setState({ errorEmail : null });
            this.setState({ errorConfirmEmail : null });
          } else {
            this.email.current.setNativeProps(ScreenStyleSheet.formInputValid);
            this.confirmEmail.current.setNativeProps(ScreenStyleSheet.formInputError);
            this.setState({ errorEmail : null });

            this.setState({ errorConfirmEmail : this.errorMessage("These email addresses do not match.") }); 
            }
        }
      }
      // Checks if password match
      else if (this.password == ref || this.confirmPassword== ref) {
        if (this.passwordMatch()) {
          this.password.current.setNativeProps(ScreenStyleSheet.formInputValid);
          this.confirmPassword.current.setNativeProps(ScreenStyleSheet.formInputValid);
          this.setState({ errorPassword : null });
          this.setState({ errorConfirmPassword : null });
        } else {
          this.password.current.setNativeProps(ScreenStyleSheet.formInputValid);
          this.confirmPassword.current.setNativeProps(ScreenStyleSheet.formInputError);
          this.setState({ errorPassword : null });
          this.setState({ errorConfirmPassword : this.errorMessage("These passwords do not match.") });
        }
      } 
      // Otherwise, keep or set back to default 
      else {
      ref.current.setNativeProps(ScreenStyleSheet.formInputValid);
      this.setState({ [error] : null });
      }
    } 
    // If input is invalid, show errors
    else {
      ref.current.setNativeProps(ScreenStyleSheet.formInputError);
      if (this.dob == ref) {
        this.setState({ [error] : this.errorMessageDate("This is a required field.") });
      } else {
        this.setState({ [error] : this.errorMessage("This is a required field.") });
      }
    }
  }

  // Error message for text input fields
  errorMessage(message) {
    return (
      <View style={ScreenStyleSheet.rowContainer}>
        <View style={ScreenStyleSheet.formRowInfo}>
          <Text style={ScreenStyleSheet.formErrorMessage}>
            {message}
          </Text>
        </View>
      </View>);
  }

  // Error message for date pickers
  errorMessageDate(message) {
    return (
      <View style={ScreenStyleSheet.rowContainer}>
        <View style={ScreenStyleSheet.formRowInfo}>
          <Text style={[ScreenStyleSheet.formErrorMessage, {textAlign: 'right'}]}>
            {message}
          </Text>
        </View>
      </View>);
  }

  // Checks if all input fields are valid
  inputCheck = () => {
    if (this.isValid(this.state.fullname) 
      && this.isValid(this.state.email)
      && this.isValid(this.state.confirmEmail)
      && this.emailMatch()
      && this.isValid(this.state.password)
      && this.isValid(this.state.confirmPassword)
      && this.passwordMatch()
      && this.isValid(this.state.dob)
      && this.isValid(this.state.location)) {
      return true;
    } else {
      this.showError(this.state.fullname, this.fullname, 'errorFullname');
      this.showError(this.state.email, this.email, 'errorEmail');
      this.showError(this.state.confirmEmail, this.confirmEmail, 'errorConfirmEmail');
      this.showError(this.state.password, this.password, 'errorPassword');
      this.showError(this.state.confirmPassword, this.confirmPassword, 'errorConfirmPassword');
      this.showError(this.state.dob, this.dob, 'errorDOB');
      this.showError(this.state.location, this.location, 'errorLocation');
      return false;
    }
  }

  // When signup button is tapped
  onSignUp = async () => {
    if (this.inputCheck()) {
      await this.props.createUser(
        this.state.email,
        this.state.password,
        this.state.confirmPassword,
        this.state.fullname,
        this.state.menopausal_stage,
        this.state.dob,
        this.state.venue,
        this.state.location,
        this.state.intensity,
        this.state.duration,
        this.state.distance
      );
    } else {
      this.showAlert('errorAlert');
    }
  };

  // When cancel button is tapped
  onCancel = () => {
    Actions.pop();
  };

  render() {
    // All the options displayed in radio buttons
    const intensities = [
      { label: "Slow", value: "Slow" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Brisk", value: "Brisk" }
    ];
    const venues = [
      { label: "Indoor", value: "Indoor" },
      { label: "Outdoor", value: "Outdoor" }
    ];
    const menopausal_stage = [
      { label: "Pre", value: "Pre" },
      { label: "Peri", value: "Peri" },
      { label: "Post", value: "Post" }
    ];

    return (
      <Container>
        {/* Header */}
        <Header
          style={ScreenStyleSheet.header}
          androidStatusBarColor={"white"}
          iosBarStyle={"dark-content"}
        >
          <Left style={ScreenStyleSheet.headerSides}>
            <Button transparent onPress={this.onBack}>
              <Image
                style={ScreenStyleSheet.headerIcon}
                source={require("../../assets/icons/back-button.png")}
              />
            </Button>
          </Left>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title style={ScreenStyleSheet.headerTitle}>Sign up</Title>
          </Body>
          <Right style={ScreenStyleSheet.headerSides} />
        </Header>
        <Content contentContainerStyle={ScreenStyleSheet.content}>
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={styles.subHeader}>Basic Information</Text>
            </View>
          </View>

          {/* Full Name */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Full Name
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View
              ref={this.fullname}
              style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChange.bind(this, 'fullname')}
                onEndEditing={this.showError.bind(this, this.state.fullname, this.fullname, 'errorFullname')}
              />
            </View>
          </View>
          {this.state.errorFullname}

          {/* Email Address */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Email Address
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View 
              ref={this.email}
              style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                autoCapitalize = 'none'
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChange.bind(this, 'email')}
                onEndEditing={this.isEmailValid.bind(this, this.state.email)}
              />
            </View>
          </View>
          {this.state.errorEmail}

          {/* Confirm Email Address */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Confirm Email Address
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View 
              ref={this.confirmEmail} 
              style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                autoCapitalize = 'none'
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChange.bind(this, 'confirmEmail')}
                onEndEditing={this.showError.bind(this, this.state.confirmEmail, this.confirmEmail, 'errorConfirmEmail')}
              />
            </View>
          </View>
          {this.state.errorConfirmEmail}

          {/* Password */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Password
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View 
              ref={this.password}
              style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                secureTextEntry={true}
                onChangeText={this.onChange.bind(this, 'password')}
                onEndEditing={this.isPasswordEmpty.bind(this, this.state.password, this.password, 'errorPassword')}
              />
            </View>
          </View>
          {this.state.errorPassword}

          {/* Confirm Password */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Confirm Password
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View 
              ref={this.confirmPassword} 
              style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                secureTextEntry={true}
                onChangeText={this.onChange.bind(this, 'confirmPassword')}
                onEndEditing={this.showError.bind(this, this.state.confirmPassword, this.confirmPassword, 'errorConfirmPassword')}
              />
            </View>
          </View>
          {this.state.errorConfirmPassword}

          {/* Date of Birth */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Date of Birth
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
            <View 
              ref={this.dob}
              style={ScreenStyleSheet.formRowInfo}>
              <DatePicker
                style={{ width: "100%" }}
                date={this.state.dob}
                mode="date"
                showIcon={false}
                placeholder="Select date of birth"
                maxDate={new Date()}
                format="MMM DD, YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  placeholderText: {
                    alignItems: "center"
                  }
                }}
                onDateChange={this.onChange.bind(this, 'dob')}
              />
            </View>
          </View>
          {this.state.errorDOB}

          {/* Menopause Stage */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Menopause Stage
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <SwitchSelector
              options={menopausal_stage}
              initial={0}
              onPress={this.onChange.bind(this, 'menopausal_stage')}
              textColor={"#A680B8"} //'#7a44cf'
              selectedColor={"#ffffff"}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              hasPadding
            />
          </View>

          {/* Line separator */}
          <View style={ScreenStyleSheet.lineSeparator} />

          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={styles.subHeader}>My Preferences</Text>
            </View>
          </View>

          {/* Distance */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Length of walk (in kilometres)
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <NumericInput
              initValue={this.state.distance}
              value={this.state.distance}
              minValue={0}
              onChange={this.onChange.bind(this, 'distance')}
              totalWidth={width(94)}
              totalHeight={40}
              valueType="real"
              rounded
              borderColor="#A680B8"
              textColor="#A680B8"
              inputStyle={{ borderRadius: 3, borderColor: "transparent" }}
              iconStyle={{ color: "#A680B8" }}
              rightButtonBackgroundColor="white"
              leftButtonBackgroundColor="white"
            />
          </View>

          {/* Duration */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Length of walk (in minutes)
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <NumericInput
              initValue={this.state.duration}
              value={this.state.duration}
              minValue={0}
              onChange={this.onChange.bind(this, 'duration')}
              totalWidth={width(94)}
              totalHeight={40}
              valueType="real"
              rounded
              borderColor="#A680B8"
              textColor="#A680B8"
              inputStyle={{ borderRadius: 3, borderColor: "transparent" }}
              iconStyle={{ color: "#A680B8" }}
              rightButtonBackgroundColor="white"
              leftButtonBackgroundColor="white"
            />
          </View>

          {/* Intensity */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Intensity
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <SwitchSelector
              options={intensities}
              initial={0}
              onPress={this.onChange.bind(this, 'intensity')}
              textColor={"#A680B8"} //'#7a44cf'
              selectedColor={"#ffffff"}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              hasPadding
            />
          </View>

          {/* Venue */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Type of Venue
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={styles.controls}>
            <SwitchSelector
              options={venues}
              initial={0}
              onPress={this.onChange.bind(this, 'venue')}
              textColor={"#A680B8"} //'#7a44cf'
              selectedColor={"#ffffff"}
              buttonColor={"#A680B8"}
              borderColor={"#A680B8"}
              borderRadius={8}
              hasPadding
            />
          </View>

          {/* Location */}
          <View style={ScreenStyleSheet.rowContainer}>
            <View style={ScreenStyleSheet.formRowInfo}>
              <Text style={ScreenStyleSheet.formInfo}>
                Location
                <Text style={ScreenStyleSheet.asterisk}> *</Text>
              </Text>
            </View>
          </View>
          <View style={ScreenStyleSheet.rowContainer}>
            <View 
              ref={this.location}
              style={ScreenStyleSheet.formRowInfo}>
              <TextInput
                style={ScreenStyleSheet.formInput}
                onChangeText={this.onChange.bind(this, 'location')}
                onEndEditing={this.showError.bind(this, this.state.location, this.location, 'errorLocation')}
              />
            </View>
          </View>
          {this.state.errorLocation}

          {/* Options */}
          <View style={ScreenStyleSheet.rowContainer}>
            {/* Cancel button */}
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                { borderWidth: 1, borderColor: "#A680B8" }
              ]}
              onPress={this.onCancel}
            >
              <Text style={{ color: "#A680B8" }}>Cancel</Text>
            </TouchableOpacity>

            {/* Finish button */}
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: "#A680B8" }]}
              onPress={this.onSignUp}
            >
              <Text style={{ color: "white" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Content>
        <AwesomeAlert
          show={this.state.errorAlert}
          showProgress={false}
          message="You must fill in all required fields."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor= {"#A680B8"}
          onConfirmPressed={() => {
            this.hideAlert('errorAlert');
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { createUser }
)(SignupScreen);

//Styles
const styles = {
  subHeader: {
    fontSize: 18,
    color: "black",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "left"
  },
  controls: {
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  buttonContainer: {
    marginVertical: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 10
  }
};
