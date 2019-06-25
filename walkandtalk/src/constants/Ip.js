import { Platform } from "react-native";

// get correct ip
const getIP = () => {
  if (Platform.OS === "android") {
    return "http://142.244.87.142:2019/";
  } else if (Platform.OS === "ios") {
    return "http:/142.244.87.142:2019/";
  } else {
    return "http://142.244.87.142:2019/";
  }
};

export default getIP;
