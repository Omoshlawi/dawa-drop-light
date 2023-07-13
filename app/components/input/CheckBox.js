import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";

const CheckBox = ({ text, value, onValueChange }) => {
  return (
    <View style={styles.section} onPress={() => {}}>
      <Checkbox
        style={styles.checkbox}
        value={value}
        onValueChange={onValueChange}
      />
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
