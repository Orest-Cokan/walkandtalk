import React from "react";
import { View } from "react-native";
import {
  Router,
  Stack,
  Scene,
  Tabs,
  StatusBar
} from "react-native-router-flux";

import AuthScreen from "./components/login/AuthScreen";
import SignupScreen from "./components/login/SignupScreen";
import AddEventScreen from "./components/event/AddEventScreen";
import HomeScreen from "./components/home/HomeScreen";
import SearchScreen from "./components/search/SearchScreen";
import ProfileScreen from "./components/profile/ProfileScreen";

import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import FormScreen from "./components/form/FormScreen";

const HomeIcon = () => <Ionicons name="ios-home" size={34} />;
const ExploreIcon = () => <Ionicons name="md-search" size={34} />;
const AddEventIcon = () => <EvilIcons name="plus" size={34} />;
const ProfileIcon = () => <Icon name="user" size={34} />;
const FormIcon = () => <Ionicons name="md-clipboard" size={34} />;
const RouterComponent = () => (
  <Router>
    <Stack key="root">
      <Stack key="auth" hideNavBar>
        <Scene key="login" component={AuthScreen} />
        <Scene key="signup" component={SignupScreen} />
      </Stack>
      <Stack
        key="app"
        hideNavBar
        panHandlers={null}
        navigationBarStyle={{ backgroundColor: "#A680B8" }}
      >
        <Tabs
          showLabel={false}
          navigationBarStyle={{ backgroundColor: "#A680B8" }}
        >
          <Scene
            key="home"
            component={HomeScreen}
            icon={HomeIcon}
            title="Home"
            navigationBarStyle={{ backgroundColor: "#A680B8" }}
            hideNavBar
          />
          <Scene
            key="search"
            component={SearchScreen}
            icon={ExploreIcon}
            navigationBarStyle={{ backgroundColor: "#A680B8" }}
            hideNavBar
          />
          <Scene
            key="addevent"
            component={AddEventScreen}
            icon={AddEventIcon}
            hideNavBar
            navigationBarStyle={{ backgroundColor: "#A680B8" }}
          />
          <Scene
            key="form"
            component={FormScreen}
            icon={FormIcon}
            hideNavBar
            navigationBarStyle={{ backgroundColor: "#A680B8" }}
          />
          <Scene
            key="profile"
            component={ProfileScreen}
            icon={ProfileIcon}
            navigationBarStyle={{ backgroundColor: "#A680B8" }}
            hideNavBar
          />
        </Tabs>
      </Stack>
    </Stack>
  </Router>
);

export default RouterComponent;
