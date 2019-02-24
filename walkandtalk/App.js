import { Navigation } from "react-native-navigation";
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AddEventScreen from "./src/screens/AddEventScreen";
import FormScreen from "./src/screens/FormScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { Provider } from "react-redux";
import configurestore from "./src/store/configureStore";

const store = configurestore();

// Register the screens
Navigation.registerComponent(
  "walkandtalk.AuthScreen",
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "walkandtalk.HomeScreen",
  () => HomeScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "walkandtalk.SearchScreen",
  () => SearchScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "walkandtalk.AddEventScreen",
  () => AddEventScreen
);
Navigation.registerComponent(
  "walkandtalk.FormScreen",
  () => FormScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "walkandtalk.ProfileScreen",
  () => ProfileScreen,
  store,
  Provider
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false
    },
    bottomTabs: {
      animate: false
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
