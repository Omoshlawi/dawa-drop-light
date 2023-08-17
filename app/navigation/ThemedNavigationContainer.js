import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { useSettinsContext } from "../context/hooks";

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
      {children}
    </NavigationContainer>
  );
};

export default ThemedNavigationContainer;
