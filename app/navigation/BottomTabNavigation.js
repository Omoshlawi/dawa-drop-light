import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { Home, Account, ActionsMenu } from "../screens/tab";
import routes from "./routes";
import { useTheme } from "react-native-paper";

const { Navigator, Screen } = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const { colors } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Screen
        name={routes.BTAB_HOME_SCREEN}
        component={Home}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="home" {...props} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Screen
        component={ActionsMenu}
        name={routes.BTAB_ACTION_SCREEN}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={[
                styles.mainTabBar,
                {
                  borderColor: colors.white,
                  backgroundColor: focused ? colors.primary : colors.white,
                },
              ]}
            >
              <Image
                style={{ width: size, height: size }}
                source={require("../assets/heart.png")}
              />
            </View>
          ),
        }}
      />
      <Screen
        name={routes.BTAB_ACCOUNT_SCREEN}
        component={Account}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="account" {...props} />
          ),
          tabBarLabel: "Account",
          headerTitle: "Account Settings",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
    </Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  mainTabBar: {
    borderRadius: 70 * 0.5,
    width: 70,
    height: 70,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    borderWidth: 7,
  },
});
