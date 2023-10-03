import { Dimensions } from "react-native";
import routes from "../navigation/routes";
// export const BASE_URL = "http://10.10.8.15:5000/"; //lukenya
// export const BASE_URL = "http://192.168.2.148:5000/"; ///office
// export const BASE_URL = "http://dawadrop.kenyahmis.org/"; //home
// export const BASE_URL = "http://192.168.100.40:5000/"; //home laptop
// export const BASE_URL = "http://192.168.100.5:5000/"; //homedesktop
export const BASE_URL = "http://192.168.0.1:5000/"; //dynamic
export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const APPOINTMENT_COLORS = {
  "Re-Fill": "#A0C7E6",
  "Clinical Review": "#1C6BA4",
  PCR: "#E29F1E",
  "Lab Investigation": "#FAF0DE",
};
