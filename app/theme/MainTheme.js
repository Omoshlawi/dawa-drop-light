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
          surfaceVariant: "red",
          backdrop: "#FFFFFFBF", //Uesd as background in modals, should have transparency to enable see what is in the back a little
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
