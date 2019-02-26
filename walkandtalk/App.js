import { Navigation } from "react-native-navigation";
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AddEventScreen from "./src/screens/AddEventScreen";
import FormScreen from "./src/screens/FormScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { Provider } from "react-redux";

// Register the screens
Navigation.registerComponent("walkandtalk.AuthScreen", () => AuthScreen);
Navigation.registerComponent("walkandtalk.HomeScreen", () => HomeScreen);
Navigation.registerComponent("walkandtalk.SearchScreen", () => SearchScreen);
Navigation.registerComponent(
  "walkandtalk.AddEventScreen",
  () => AddEventScreen
);
Navigation.registerComponent("walkandtalk.FormScreen", () => FormScreen);
Navigation.registerComponent("walkandtalk.ProfileScreen", () => ProfileScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      height: 0
    },
    bottomTabs: {
      animate: false,
      backgroundColor: "#d9a4ff"
    }
  });

  Navigation.setRoot({
    root: {
      component: {
        name: "walkandtalk.AuthScreen"
      }
    }
  });
});

import firebase from "react-native-firebase";

firebase
  .auth()
  .signInAnonymously()
  .then(credential => {
    if (credential) {
      console.log("default app user ->", credential.user.toJSON());
    }
  });
