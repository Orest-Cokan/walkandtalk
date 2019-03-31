import React from "react";
import { Image} from "react-native";
import { Router, Stack, Scene, Tabs } from "react-native-router-flux";

import AuthScreen from "./components/login/AuthScreen";
import SignupScreen from "./components/login/SignupScreen";
import AddEventScreen from "./components/event/AddEventScreen";
import HomeScreen from "./components/home/HomeScreen";
import NotificationPlayground from "./components/home/NotificationPlayground";
import SearchTabScreen from "./components/search/SearchTabScreen";
import SearchMapViewScreen from "./components/search/SearchMapViewScreen";
import SearchListViewScreen from "./components/search/SearchListViewScreen";
import ProfileScreen from "./components/profile/ProfileScreen";
import RequestsScreen from "./components/form/RequestsScreen";
import ViewRequestScreen from "./components/form/ViewRequestScreen";
import FormScreen from "./components/form/FormScreen";
import SubmitRecordScreen from "./components/form/SubmitRecord";
import EditProfileScreen from "./components/profile/EditProfileScreen";
import PastEventListScreen from "./components/profile/ViewPastEventList";
import ViewPastEventRecord from "./components/profile/ViewPastEventRecord";
import HelplineScreen from "./components/profile/HelplineScreen";
import QuestionnaireScreen from "./components/form/QuestionnaireScreen";
import ViewEventScreen from "./components/event/ViewEventScreen";
import Dispatch from "./components/form/FormDispatch";
import EditEventSceen from "./components/event/EditEventScreen"

// Navigation logic for the entire app
const RouterComponent = () => (
  <Router>
    <Stack key="root">
      <Stack key="auth" hideNavBar>
        <Scene key="login" component={AuthScreen} />
        <Scene key="signup" component={SignupScreen} />
      </Stack>
      <Stack key="app" hideNavBar panHandlers={null} type="reset">
        <Tabs
          showLabel={false}
          activeBackgroundColor="#A680B8"
          inactiveBackgroundColor="#A680B8"
        >
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
            component={SearchTabScreen}
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
          >
            <Scene key="formDispatch" component={Dispatch} />
            <Scene key="mainFormPage" component={FormScreen} />
            <Scene key="submitRecord" component={SubmitRecordScreen} />
            <Scene key="mainRequestPage" component={RequestsScreen} />
            <Scene key="viewRequest" component={ViewRequestScreen} />
          </Scene>
          {/*If the user is a researcher, this tab will show instead of forms tab*/}
          {/* <Scene
            key="request"
            icon={({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/request-full.png")
                    : require("./assets/icons/request.png")
                }
                style={{ width: 28, height: 28 }}
              />
            )}
            hideNavBar
          >
            <Scene key="mainRequestPage" component={RequestsScreen} />
            <Scene key="viewRequest" component={ViewRequestScreen} />
          </Scene> */}
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
            <Scene key="mainProfile" component={ProfileScreen} />
            <Scene key="editProfile" component={EditProfileScreen} />
            <Scene key="pastEvents" component={PastEventListScreen} />
            <Scene key="viewPastEvent" component={ViewPastEventRecord} />
            <Scene key="helplines" component={HelplineScreen} />
          </Scene>
        </Tabs>
        <Scene key="notifications" component={NotificationPlayground} />
        <Scene key="questionnaire" component={QuestionnaireScreen} />
        <Scene key="viewEvent" component={ViewEventScreen} />
        <Scene key="editEvent" component={EditEventSceen} />
        <Scene key="searchList" component={SearchListViewScreen} />
        <Scene key="searchMap" component={SearchMapViewScreen} />
      </Stack>
    </Stack>
  </Router>
);

export default RouterComponent;
