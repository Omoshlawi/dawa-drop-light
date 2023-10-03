import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { useSettinsContext } from "../context/hooks";

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#00ACA9",
    accent: "#00353C",
    background: "#E1EDED", //"#F0FFFF"->light
    medium: "#AAC8C8",
    onPrimary: "#fff",
    disabled: "#AAC8C8",
    error: "#FF1616",
    outline: "#00353C",
    secondary: "#00353C",
    white: "#fff",
    surface: "#fff",
    onSurface: "#00353C",
    waningLight: "#FBF0DC",
    // onSurfaceVariant: "red",
    // surfaceVariant: "red",
    backdrop: "#FFFFFFBF", //Uesd as background in modals, should have transparency to enable see what is in the back a little
  },
  roundness: 10,
};

const darkTheme = {
  ...DefaultTheme, // Use DefaultTheme as the base
  colors: {
    ...DefaultTheme.colors, // Keep the existing DarkTheme colors
    primary: "#00ACA9", // Light gray for primary
    accent: "#E1EDED", // Light gray for accent
    background: "#121212", // Dark background color
    medium: "#E1EDED", // Light gray for text on dark background
    onPrimary: "#fff",
    disabled: "#666", // Mid-tone gray for disabled elements
    error: "#FF1616",
    outline: "#00353C",
    secondary: "#00353C", // Light gray for secondary
    white: "#fff",
    surface: "#1E1E1E", // Darker surface color
    onSurface: "#E1EDED", // Light text on dark surface
    waningLight: "#FBF0DC",
    surfaceVariant: "red",
    backdrop: "#00000096",
  },
  roundness: 10,
};

const MainTheme = ({ children }) => {
  const { theme } = useSettinsContext();
  return (
    <PaperProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {children}
    </PaperProvider>
  );
};

export default MainTheme;

const styles = StyleSheet.create({});
