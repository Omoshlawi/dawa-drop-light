import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DefaultTheme, PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
};

const MainTheme = ({ children }) => {
  return (
    <PaperProvider
      theme={{
        colors: {
          primary: "#00ACA9",
          accent: "#00353C",
          background: "#E1EDED", //"#F0FFFF"->light
          medium: "#AAC8C8",
          onPrimary: "#000",
          disabled: "#AAC8C8",
          error: "#FF1616",
          outline: "#54F7F4",
          secondary: "#54F7F4",
          white: "#fff",
          surface: "#fff",
          onSurface: "#00353C",
          waningLight: "#FBF0DC",
        },
        roundness: 10,
      }}
    >
      {children}
    </PaperProvider>
  );
};

export default MainTheme;

const styles = StyleSheet.create({});
