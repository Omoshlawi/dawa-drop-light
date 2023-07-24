import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { default as ExpoCheckbox } from "expo-checkbox";
import { TouchableOpacity } from "react-native";

const CheckBox = ({ text, value, onValueChange }) => {
  return (
    <View style={styles.section} onPress={() => {}}>
      <ExpoCheckbox
        style={styles.checkbox}
        value={Boolean(value)}
        onValueChange={onValueChange}
      />
      <TouchableOpacity onPress={() => onValueChange(!Boolean(value))}>
        <Text style={styles.paragraph}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
