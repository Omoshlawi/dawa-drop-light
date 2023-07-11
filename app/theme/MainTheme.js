import React from "react";
import { ThemeProvider, createTheme } from "@rneui/themed";

const theme = createTheme({
  darkColors: {
    primary: "#00ACA9",
    background: "#ECF7F7",
    black: "#000",
    disabled: "#AAC8C8",
    success: "#A6D71C",
    error: "#FF1616",
    warning: "yellow",
    white: "#fff",
  },
  lightColors: {
    primary: "#54F7F4",
    background: "#D4FFFE",
    black: "#00f",
    disabled: "#AAC8C8",
    success: "#A6D71C",
    error: "#FF1616",
    warning: "yellow",
    white: "#fff",
  },
  mode: "dark",
  components: {
    Button: {
      buttonStyle: {
        padding: 10,
      },
      containerStyle: {
        margin: 5,
        borderRadius: 20,
      },
    },
  },
});

const MainTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MainTheme;
