import React from "react";
<<<<<<< HEAD
=======
import { View, Image } from "react-native";
>>>>>>> dbf1840f8c1d76d3345249446e1cc70def5713df
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
import FormScreen from "./components/form/FormScreen";

<<<<<<< HEAD
const HomeIcon = () => <Ionicons name="ios-home" size={34} />;
const ExploreIcon = () => <Ionicons name="md-search" size={34} />;
const AddEventIcon = () => <EvilIcons name="plus" size={34} />;
const ProfileIcon = () => <Icon name="user" size={34} />;
const FormIcon = () => <Ionicons name="md-clipboard" size={34} />;

=======
>>>>>>> dbf1840f8c1d76d3345249446e1cc70def5713df
const RouterComponent = () => (
  <Router>
    <Stack key="root">
      <Stack key="auth" hideNavBar>
        <Scene key="login" component={AuthScreen} />
        <Scene key="signup" component={SignupScreen} />
      </Stack>
      <Stack key="app" hideNavBar panHandlers={null}>
        <Tabs showLabel={false}>
          <Scene
            key="home"
            component={HomeScreen}
            icon={({ focused }) => (
              <Image source = {focused ? require("./assets/icons/home-full.png") : require("./assets/icons/home.png")}
                 style={{ width: 28, height:28 }}
              />
          )}
            title="Home"
            hideNavBar
          />
          <Scene
            key="search"
            component={SearchScreen}
            icon={({ focused }) => (
              <Image source = {focused ? require("./assets/icons/search-full.png") : require("./assets/icons/search.png")}
                 style={{ width: 28, height:28 }}
              />
          )}
            hideNavBar
          />
          <Scene
            key="addevent"
            component={AddEventScreen}
            icon={({ focused }) => (
              <Image source = {focused ? require("./assets/icons/plus-full.png") : require("./assets/icons/plus.png")}
                 style={{ width: 28, height:28 }}
              />
          )}
            hideNavBar
          />
<<<<<<< HEAD
          <Scene key="form" component={FormScreen} icon={FormIcon} hideNavBar />
=======
          <Scene
            key="form"
            component={FormScreen}
            icon={({ focused }) => (
              <Image source = {focused ? require("./assets/icons/form-full.png") : require("./assets/icons/form.png")}
                 style={{ width: 28, height:28 }}
              />
          )}
            hideNavBar
          />
>>>>>>> dbf1840f8c1d76d3345249446e1cc70def5713df
          <Scene
            key="profile"
            component={ProfileScreen}
            icon={({ focused }) => (
              <Image source = {focused ? require("./assets/icons/profile-full.png") : require("./assets/icons/profile.png")}
                 style={{ width: 28, height:28 }}
              />
          )}
            hideNavBar
          />
        </Tabs>
      </Stack>
    </Stack>
  </Router>
);

export default RouterComponent;