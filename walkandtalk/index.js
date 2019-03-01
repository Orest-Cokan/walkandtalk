import { AppRegistry, YellowBox } from "react-native";
import App from "./App";
YellowBox.ignoreWarnings(["Require cycle:"]);
AppRegistry.registerComponent("walkandtalk", () => App);
