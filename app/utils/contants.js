import { Dimensions } from "react-native";
import routes from "../navigation/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export const BASE_URL = "http://192.168.100.5:5000/";
export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;
export const ACTIONS = [
  {
    image: require("../assets/permission.png"),
    title: "Permisions and roles",
    destination: {},
  },
  {
    image: require("../assets/order.png"),
    title: "Drug Orders",
    destination: {},
  },
  {
    image: require("../assets/patients.png"),
    title: "Patients",
    destination: {},
  },
  {
    image: require("../assets/appointment.png"),
    title: "Appointments",
    destination: {},
  },
  {
    image: require("../assets/medicare.png"),
    title: "Order Drug",
    destination: {},
  },
  {
    image: require("../assets/deliverycycle.png"),
    title: "Deliveries",
    destination: {},
  },
  {
    image: require("../assets/features.png"),
    title: "Delivery FeedBacks",
    destination: {},
  },
  {
    image: require("../assets/prescription.png"),
    title: "Prescription",
    destination: {},
  },
];
