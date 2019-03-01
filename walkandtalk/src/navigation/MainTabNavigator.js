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
                  text: "Tab 1",
                  icon: require("../assets/images/person.png"),
                  testID: "FIRST_TAB_BAR_BUTTON"
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
                  text: "Tab 2",
                  icon: require("../assets/images/person.png"),
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
                  text: "Tab 3",
                  icon: require("../assets/images/person.png"),
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
                  text: "Tab 4",
                  label: "ree",
                  icon: require("../assets/images/person.png"),
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
                  text: "Tab 5",
                  icon: require("../assets/images/person.png"),
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
