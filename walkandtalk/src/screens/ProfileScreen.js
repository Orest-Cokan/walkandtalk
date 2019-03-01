import React, { Component } from 'react';
import {
 StyleSheet,
 Text,
 View,
 Image,
 TouchableOpacity,
 TouchableHighlight,
 ScrollView
} from 'react-native';
import { goEditProfile } from '../components/navigation/InitialNavigator';
import ScreenStyleSheet from "../constants/ScreenStyleSheet";
import { Container, Header, Left, Body, Title, Right, Content } from "native-base";

// Profile tab
class ProfileScreen extends Component {

 constructor(props) {
   super(props);

    // Set state on inital profile signup
   this.state = {
     name: 'Brittany Taylor',
     dob: 'January 1, 1955',
     menopausalStage: 'Peri',
     distance: 10,
     duration: 60,
     intensity: 'Intermediate',
     venue: 'Indoor',
     location: 'Riverbend Area'
   };
 }

  // When edit profile icon is clicked
 editProfile = () => {
    // Navigate to edit profile
   goEditProfile();
 }

  render() {
    return (
      <Container>
        {/* Header */}
        <Header style={ScreenStyleSheet.header}>
          <Body style={ScreenStyleSheet.headerBody}>
            <Title>Profile</Title>
          </Body>
        </Header>

        <Content contentContainerStyle={ScreenStyleSheet.content}>
             {/* Profile header container */}
             <View style={ScreenStyleSheet.profileHeader}>
             {/* Edit profile icon  */}
             <View style={ScreenStyleSheet.editProfile}>
               <TouchableHighlight onPress={this.editProfile} underlayColor={'transparent'} activeOpacity={0}>
                 <Image style={ScreenStyleSheet.editIcon} source={require('../assets/icons/edit.png')}/>
               </TouchableHighlight>
             </View>
             {/* Profile picture */}
             <Image style={ScreenStyleSheet.avatar} source={require('../assets/icons/profile.png')}/>
             <Text style={ScreenStyleSheet.profileName}>{this.state.name}</Text>
             </View>

             {/* On screen separator */}
             <View style={ScreenStyleSheet.lineSeparator}/>

             {/* Info Header */}
             <View style={ScreenStyleSheet.rowContainer}>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileSectionTitle}>Basic Info</Text>
               </View>
             </View>
             {/* Date of birth */}
             <View style={ScreenStyleSheet.rowContainer}>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInfo}>Date of Birth</Text>
               </View>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInput}>{this.state.dob}</Text>
               </View>
             </View>
             {/* Age */}
             <View style={ScreenStyleSheet.rowContainer}>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInfo}>Age</Text>
               </View>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInput}>
                 {/* Automatically calculates the age when given date of birth */}
                 {Math.floor((new Date().getTime()-Date.parse(this.state['dob']))/31557600000)}</Text>
               </View>
             </View>
             {/* Menopausal Stage */}
             <View style={ScreenStyleSheet.rowContainer}>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInfo}>Menopausal Stage</Text>
               </View>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInput}>{this.state.menopausalStage}</Text>
               </View>
             </View>

             {/* On screen separator */}
             <View style={ScreenStyleSheet.lineSeparator}/>

             {/* Preferences header */}
             <View style={ScreenStyleSheet.rowContainer}>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileSectionTitle}>My Preferences</Text>
               </View>
             </View>
             {/* Distance */}
             <View style={ScreenStyleSheet.rowContainer}>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInfo}>Length of Walk (by distance)</Text>
               </View>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInput}>{this.state.distance} km</Text>
               </View>
             </View>
             {/* Duration */}
             <View style={ScreenStyleSheet.rowContainer}>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInfo}>Length of Walk (by duration)</Text>
               </View>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInput}>{this.state.duration} min</Text>
               </View>
             </View>
             {/* Intensity */}
             <View style={ScreenStyleSheet.rowContainer}>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInfo}>Intensity</Text>
               </View>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInput}>{this.state.intensity}</Text>
               </View>
             </View>
             {/* Venue */}
             <View style={ScreenStyleSheet.rowContainer}>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInfo}>Type of Venue</Text>
               </View>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInput}>{this.state.venue}</Text>
               </View>
             </View>
             {/* Location */}
             <View style={ScreenStyleSheet.rowContainer}>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInfo}>Location</Text>
               </View>
               <View style={ScreenStyleSheet.profileRowInfo}>
                 <Text style={ScreenStyleSheet.profileInput}>{this.state.location}</Text>
               </View>
             </View>

             {/* Options */}
             <View style={ScreenStyleSheet.rowContainer}>
               {/* Button to help links */}
               <TouchableOpacity style={styles.buttonContainer}>
                 <Text>Help Line Links</Text>
               </TouchableOpacity>
               {/* Button to past events */}
               <TouchableOpacity style={styles.buttonContainer}>
                 <Text>Past Events</Text>
               </TouchableOpacity>
             </View>
        </Content>
      </Container>
    );
  }
}

// Styles
const styles = StyleSheet.create({
 buttonContainer: {
   marginVertical: 10,
   height: 50,
   justifyContent: 'center',
   alignItems: 'center',
   width: "48%",
   borderRadius: 10,
   borderWidth: 1,
   borderColor: 'black',
 },

});

export default ProfileScreen;
