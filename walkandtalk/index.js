import {
  Navigation,
  OptionsModalPresentationStyle
} from "react-native-navigation";
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AddEventScreen from "./src/screens/AddEventScreen";
import FormScreen from "./src/screens/FormScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

import { Provider } from "react-redux";

import { AppRegistry } from "react-native";
import App from "./App";

AppRegistry.registerComponent("walkandtalk", () => App);
