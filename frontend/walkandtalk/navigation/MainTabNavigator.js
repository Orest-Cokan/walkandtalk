import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FormScreen from "../screens/FormScreen";
import ProfileScreen from "../screens/ProfileScreen";
const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: " ",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-home-outline{focused ? "" : "-outline"}`
          : "ios-home"
      }
    />
  )
};

const SearchStack = createStackNavigator({
  Links: LinksScreen
});

SearchStack.navigationOptions = {
  tabBarLabel: " ",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-search-outline{focused ? "" : "-outline"}`
          : "md-search"
      }
    />
  )
};

const AddEventStack = createStackNavigator({
  Settings: SettingsScreen
});

AddEventStack.navigationOptions = {
  tabBarLabel: " ",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-add-circle-outline{focused ? "" : "-outline"}`
          : "md-add-circle"
      }
    />
  )
};

const FormStack = createStackNavigator({
  Form: FormScreen
});

FormStack.navigationOptions = {
  tabBarLabel: " ",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-list-box-outline{focused ? "" : "-outline"}`
          : "md-list"
      }
    />
  )
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
});

ProfileStack.navigationOptions = {
  tabBarLabel: " ",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person-outline" : "md-person"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  SearchStack,
  AddEventStack,
  FormStack,
  ProfileStack
});
