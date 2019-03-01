import { Navigation } from "react-native-navigation";
import React from "react";
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AddEventScreen from "./src/screens/AddEventScreen";
import FormScreen from "./src/screens/FormScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SignupScreen from "./src/screens/SignupScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen"
import { Provider } from "react-redux";
import store from "./src/store/store";
import firebase from "react-native-firebase";

// Registering the screens
Navigation.registerComponent(
  "walkandtalk.AuthScreen",
  () => props => (
    <Provider store={store}>
      <AuthScreen {...props} />
    </Provider>
  ),
  () => AuthScreen
);

Navigation.registerComponent(
  "walkandtalk.HomeScreen",
  () => props => (
    <Provider store={store}>
      <HomeScreen {...props} />
    </Provider>
  ),
  () => HomeScreen
);

Navigation.registerComponent(
  "walkandtalk.SearchScreen",
  () => props => (
    <Provider store={store}>
      <SearchScreen {...props} />
    </Provider>
  ),
  () => SearchScreen
);

Navigation.registerComponent(
  "walkandtalk.AddEventScreen",
  () => props => (
    <Provider store={store}>
      <AddEventScreen {...props} />
    </Provider>
  ),
  () => AddEventScreen
);

Navigation.registerComponent(
  "walkandtalk.FormScreen",
  () => props => (
    <Provider store={store}>
      <FormScreen {...props} />
    </Provider>
  ),
  () => FormScreen
);
Navigation.registerComponent(
  "walkandtalk.ProfileScreen",
  () => props => (
    <Provider store={store}>
      <ProfileScreen {...props} />
    </Provider>
  ),
  () => ProfileScreen
);
Navigation.registerComponent(
  "walkandtalk.EditProfileScreen",
  () => props => (
    <Provider store={store}>
      <EditProfileScreen {...props} />
    </Provider>
  ),
  () => EditProfileScreen
);
Navigation.registerComponent(
  "walkandtalk.SignupScreen",
  () => props => (
    <Provider store={store}>
      <SignupScreen {...props} />
    </Provider>
  ),
  () => SignupScreen
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      style: 'light',
      backgroundColor: "#A680B8"
    },
    topBar: {
      height: 0
    },
    bottomTabs: {
      animate: false,
      backgroundColor: "#A680B8"
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

firebase
  .auth()
  .signInAnonymously()
  .then(credential => {
    if (credential) {
      console.log("default app user ->", credential.user.toJSON());
    }
  });
