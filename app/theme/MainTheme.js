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
          background: "#fff",
          onPrimary: "#FFF",
          disabled: "#AAC8C8",
          error: "#FF1616",
          outline: "#54F7F4",
          secondary: "#54F7F4",
          white: "#fff",
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
