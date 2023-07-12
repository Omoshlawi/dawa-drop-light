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
          background: "#ECF7F7",
          onPrimary: "#FFF",
        },
      }}
    >
      {children}
    </PaperProvider>
  );
};

export default MainTheme;

const styles = StyleSheet.create({});
