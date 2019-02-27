import { Navigation } from "react-native-navigation";

export const goSignup = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "walkandtalk.SignupScreen"
            }
          }
        ]
      }
    }
  });

export const goHome = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "walkandtalk.HomeScreen"
            }
          }
        ]
      }
    }
  });

export const goLogin = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "walkandtalk.AuthScreen"
            }
          }
        ]
      }
    }
  });
