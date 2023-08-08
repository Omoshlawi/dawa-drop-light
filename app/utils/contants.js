import { Dimensions } from "react-native";
import routes from "../navigation/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// export const BASE_URL = "http://192.168.2.92:5000/";
export const BASE_URL = "http://192.168.100.4:5000/";
export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const APPOINTMENT_COLORS = {
  "Re-Fill": "#A0C7E6",
  "Clinical Review": "#1C6BA4",
  PCR: "#E29F1E",
  "Lab Investigation": "#FAF0DE",
};
