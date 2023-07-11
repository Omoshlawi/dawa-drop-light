import { Dimensions } from "react-native";
import routes from "../navigation/routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const menItems = [
  {
    title: "Order Medicine",
    image: require("../assets/medicine.png"),
    id: 1,
    destination: {
      parentRoute: routes.ORDER_NAVIGATION,
      nestedRoute: {
        screen: routes.ORDER_SCREEN,
      },
    },
  },
  {
    title: "Checkout Delivery",
    image: require("../assets/delivery-truck.png"),
    id: 2,
    destination: {
      parentRoute: routes.ORDER_NAVIGATION,
      nestedRoute: {
        screen: routes.CHECHOUT_SCREEN,
      },
    },
  },
  {
    title: "Order History",
    image: require("../assets/clock.png"),
    id: 3,
    destination: {
      parentRoute: routes.ORDER_NAVIGATION,
      nestedRoute: {
        screen: routes.ORDERS_HISTORY_SCREEN,
      },
    },
  },
  {
    title: "Pending Orders",
    image: require("../assets/pending_1.png"),
    id: 4,
    destination: {
      parentRoute: routes.ORDER_NAVIGATION,
      nestedRoute: {
        screen: routes.PENDING_ORDERS_SCREEN,
      },
    },
  },
  {
    title: "Redeeme Points",
    image: require("../assets/box.png"),
    id: 5,
    destination: {
      parentRoute: routes.USER_NAVIGATION,
      nestedRoute: {
        screen: routes.LOYALTY_POINTS_SCREEN,
      },
    },
  },
  {
    title: "Request Transfer",
    image: require("../assets/migration.png"),
    id: 6,
    destination: {
      parentRoute: routes.USER_NAVIGATION,
      nestedRoute: {
        screen: routes.USER_TRANSFER_REQUESTS_SCREEN,
      },
    },
  },
  {
    title: "My Appointments",
    image: require("../assets/medical-appointment.png"),
    id: 7,
    destination: {
      parentRoute: routes.USER_NAVIGATION,
      nestedRoute: {
        screen: routes.USER_APPOINTMENTS_SCREEN,
      },
    },
  },
  {
    title: "My Prescriptions",
    image: require("../assets/prescription.png"),
    id: 8,
    destination: {
      parentRoute: routes.USER_NAVIGATION,
      nestedRoute: {
        screen: routes.USER_PRESCRIPTIONS_SCREEN,
      },
    },
  },
];
export const chechoutTabs = [
  {
    title: "Scan QR code",
    icon: (
      <MaterialCommunityIcons
        name="data-matrix-scan"
        size={20}
        style={{ paddingRight: 10 }}
      />
    ),
  },
  {
    title: "Type in code ",
    icon: (
      <MaterialCommunityIcons
        name="keyboard"
        size={20}
        style={{ paddingRight: 10 }}
      />
    ),
  },
];

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;
