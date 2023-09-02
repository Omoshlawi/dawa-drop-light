import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { useSettinsContext } from "../context/hooks";
import { StatusBar } from "expo-status-bar";

const ThemedNavigationContainer = ({ children }) => {
  const { colors } = useTheme();
  const { theme } = useSettinsContext();
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
          primary: colors.primary,
          card: colors.surface,
          text: theme === "dark" ? "#fff" : "#000",
        },
      }}
    >
      <StatusBar
        style={theme === "dark" ? "light" : "dark"}
        backgroundColor={colors.background}
        // backgroundColor={appConf.theme === "light" ? "#000" : "#fff"}
      />
      {children}
    </NavigationContainer>
  );
};

export default ThemedNavigationContainer;
