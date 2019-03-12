import React from "react";
import { View, Image } from "react-native";
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
import EditProfileScreen from "./components/profile/EditProfileScreen";
import PastEventListScreen from "./components/profile/ViewPastEventList";
import HelplineScreen from "./components/profile/HelplineScreen";



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
              <Image
                source={
                  focused
                    ? require("./assets/icons/home-full.png")
                    : require("./assets/icons/home.png")
                }
                style={{ width: 28, height: 28 }}
              />
            )}
            title="Home"
            hideNavBar
          />
          <Scene
            key="search"
            component={SearchScreen}
            icon={({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/search-full.png")
                    : require("./assets/icons/search.png")
                }
                style={{ width: 28, height: 28 }}
              />
            )}
            hideNavBar
          />
          <Scene
            key="addevent"
            component={AddEventScreen}
            icon={({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/plus-full.png")
                    : require("./assets/icons/plus.png")
                }
                style={{ width: 28, height: 28 }}
              />
            )}
            hideNavBar
          />
          <Scene
            key="form"
            component={FormScreen}
            icon={({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/form-full.png")
                    : require("./assets/icons/form.png")
                }
                style={{ width: 28, height: 28 }}
              />
            )}
            hideNavBar
          />
          <Scene
            key="profile"
            icon={({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/profile-full.png")
                    : require("./assets/icons/profile.png")
                }
                style={{ width: 28, height: 28 }}
              />
            )}
            hideNavBar
          >
            <Scene
              key="profilePage"
              component={ProfileScreen}
            />
            <Scene
              key="editProfile"
              component={EditProfileScreen}
            />
            <Scene
              key="pastEvents"
              component={PastEventListScreen}
            />
            <Scene
              key="helplines"
              component={HelplineScreen}
            />

          </Scene>
        </Tabs>
      </Stack>
    </Stack>
  </Router>
);

export default RouterComponent;
