import { StyleSheet, View, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme, Text } from "react-native-paper";
import _ from "lodash";

const TextInputField = ({
  icon,
  placeholder,
  label = "Some label",
  mode = "outlined",
  value,
  onChangeText,
  keyboardType,
  width,
  ...otherProps
}) => {
  const { colors, roundness } = useTheme();
  return (
    <View style={[styles.container]}>
      {mode === "outlined" && label && (
        <Text
          variant="labelSmall"
          style={[
            styles.label,
            {
              backgroundColor: colors.background,
              color: colors.onSurfaceVariant,
            },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          { borderRadius: roundness, backgroundColor: colors.surface },
          mode === "outlined" ? { borderWidth: 1 } : {},
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={colors.disabled}
          />
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
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    overflow: "hidden",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    marginTop: 5,
  },
  text: {
    paddingHorizontal: 10,
    flex: 1,
  },
  label: {
    position: "absolute",
    top: 0,
    left: 10,
    zIndex: 1,
    verticalAlign: "middle",
    paddingHorizontal: 5,
  },
});
