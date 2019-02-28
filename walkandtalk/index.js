import { AppRegistry, YellowBox } from "react-native";
import App from "./App";
YellowBox.ignoreWarnings(["Require cycle:", "Remote debugger"]);
AppRegistry.registerComponent("walkandtalk", () => App);
