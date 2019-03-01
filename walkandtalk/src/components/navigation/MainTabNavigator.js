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
                  iconColor: 'white',
                  selectedIconColor: 'white',
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
                  icon: require("../../assets/icons/search.png"),
                  testID: "SECOND_TAB_BAR_BUTTON",
                  iconColor: 'white',
                  selectedIconColor: 'white',
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
                  icon: require("../../assets/icons/plus.png"),
                  testID: "THIRD_TAB_BAR_BUTTON",
                  iconColor: 'white',
                  selectedIconColor: 'white',
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
                  icon: require("../../assets/icons/form.png"),
                  testID: "FORTH_TAB_BAR_BUTTON",
                  iconColor: 'white',
                  selectedIconColor: 'white',
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
                  icon: require("../../assets/icons/profile.png"),
                  testID: "FIFTH_TAB_BAR_BUTTON",
                  iconColor: 'white',
                  selectedIconColor: 'white',
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
