import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { Home } from "../screens/tab";
import routes from "./routes";

const { Navigator, Screen } = createBottomTabNavigator();
const BottomTabNavigation = () => {
  return (
    <Navigator>
      <Screen name={routes.BTAB_HOME_SCREEN} component={Home} />
    </Navigator>
  );
};

export default BottomTabNavigation;
