import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { Text, useTheme } from "react-native-paper";

const LinkedText = ({ text, onPress, link }) => {
  const {
    colors: { primary },
  } = useTheme();
  return (
    <View style={styles.reg}>
      <Text>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: primary }}>{link}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LinkedText;

const styles = StyleSheet.create({
  reg: {
    flexDirection: "row",
  },
});
