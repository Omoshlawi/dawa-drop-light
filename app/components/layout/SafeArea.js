import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
const SafeArea = ({ children, style }) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }, style]}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
