import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import React from "react";
const SafeArea = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>{children}</SafeAreaView>
  );
};

export default SafeArea;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
