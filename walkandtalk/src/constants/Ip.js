import { Platform } from "react-native";

// return correct ip
// http://10.0.2.2:2019/ android
// http://127.0.0.1:2019/ ios
// http://142.244.87.142:2019/ server
const getIP = () => {
  if (Platform.OS === "android") {
    return "http://142.244.87.142:2019/";
  } else if (Platform.OS === "ios") {
    return "http://142.244.87.142:2019/";
  } else {
    return "http://142.244.87.142:2019/";
  }
};

export default getIP;
