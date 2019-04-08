import { Platform } from "react-native";

// get correct ip
const getIP = () => {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:2017/";
  } else if (Platform.OS === "ios") {
    return "http://127.0.0.1:2017/";
  } else {
    return "http://10.0.2.2:2017/";
  }
};

export default getIP;
