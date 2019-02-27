import firebase from "react-native-firebase";

class FirebaseService {
  constructor() {
    this.ref = firebase.firestore().collection("User");
  }

  async loadUser(email) {
    const profile = await this.ref.doc(email).get();
    console.log(profile.data());
    if (profile.exists) {
      console.log(profile.data());
      return profile;
    }
    return null;
  }
}

export const firebaseService = new FirebaseService();

/*
User:{
email: '',
password: '',
dateOfBirth: '',
intensity: '',
location: '',
time: '',
indoor: '',
profilePicture: '',
menopauseStage: '',
registered: ''
}
*/
