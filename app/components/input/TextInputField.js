import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const TextInputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  width,
  ...otherProps
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container]}>
      {icon && (
        <MaterialCommunityIcons name={icon} size={20} color={colors.disabled} />
      )}
      <TextInput
        style={styles.text}
        placeholder={placeholder}
        placeholderTextColor={colors.disabled}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        {...otherProps}
      />
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  text: {
    paddingHorizontal: 10,
    flex: 1,
  },
});
