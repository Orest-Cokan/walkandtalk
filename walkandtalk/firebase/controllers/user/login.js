import firebase from "react-native-firebase";
import "firebase/firestore";

class FirebaseService {
  constructor() {
    this.ref = firebase.firestore().collection("User");
  }
  async load(email, password) {
    const doc = await this.ref.doc(email).get();
    console.log(doc.data().password, "password " + password);

    if (doc.exists && doc.data().password === password) {
      console.log(doc.data().password, "password:" + password);
      return doc.data();
    }
    console.log(
      doc.data().password,
      "password not in if statement: " + password
    );
    return null;
  }

  async save(user) {
    // do checks
    await this.ref.doc(user.email).set(user);
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
