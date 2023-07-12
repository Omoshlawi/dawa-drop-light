import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import { SafeArea } from "../../../components/layout";

const ActionsMenu = () => {
  const { colors } = useTheme();
  return <SafeArea style={{ backgroundColor: colors.background }}></SafeArea>;
};

export default ActionsMenu;

const styles = StyleSheet.create({});
