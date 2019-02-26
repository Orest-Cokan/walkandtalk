import { Navigation } from "react-native-navigation";

const startTabs = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: "walkandtalk.HomeScreen",
                    passProps: {
                      text: "This is tab 1"
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  icon: require("../../assets/icons/home.png"),
                  animation: false,
                  testID: "FIRST_TAB_BAR_BUTTON",
                  text: "Home"
                }
              }
            }
          },
          {
            component: {
              name: "walkandtalk.SearchScreen",
              passProps: {
                text: "This is tab 2"
              },
              options: {
                bottomTab: {
                  text: "Search",
                  icon: require("../../assets/icons/search.png"),
                  testID: "SECOND_TAB_BAR_BUTTON"
                }
              }
            }
          },
          {
            component: {
              name: "walkandtalk.AddEventScreen",
              passProps: {
                text: "This is tab 3"
              },
              options: {
                bottomTab: {
                  text: "Add Event",
                  icon: require("../../assets/icons/plus.png"),
                  testID: "THIRD_TAB_BAR_BUTTON"
                }
              }
            }
          },
          {
            component: {
              name: "walkandtalk.FormScreen",
              passProps: {
                text: "This is tab 4"
              },
              options: {
                bottomTab: {
                  text: "Forms",
                  icon: require("../../assets/icons/form.png"),
                  testID: "FORTH_TAB_BAR_BUTTON"
                }
              }
            }
          },
          {
            component: {
              name: "walkandtalk.ProfileScreen",
              passProps: {
                text: "This is tab 5"
              },
              options: {
                bottomTab: {
                  text: "Profile",
                  icon: require("../../assets/icons/profile.png"),
                  testID: "FIFTH_TAB_BAR_BUTTON"
                }
              }
            }
          }
        ]
      }
    }
  });
};

export default startTabs;
