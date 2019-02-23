import { Navigation } from "react-native-navigation";

const startTabs = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: "walkandtalk.HomeScreen",
        label: "Home Screen",
        title: "Home Screen"
      },
      {
        screen: "walkandtalk.SearchScreen",
        label: "Search Screen",
        title: "Search Screen"
      },
      {
        screen: "walkandtalk.AddEventScreen",
        label: "Add Event",
        title: "Add Event"
      },
      {
        screen: "walkandtalk.FormScreen",
        label: "Form Screen",
        title: "Form Screen"
      },
      {
        screen: "walkandtalk.ProfileScreen",
        label: "Profile Screen",
        title: "Profile Screen"
      }
    ]
  });
};

export default startTabs;
