import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const IconText = ({
  icon,
  text,
  size,
  fontWeight,
  left = true,
  onPress,
  disabled = false,
  forceEnable = false,
}) => {
  const disableBtn =
    (!(onPress instanceof Function) || disabled) &&
    Boolean(forceEnable) == false;
  return (
    <TouchableOpacity
      style={{
        flexDirection: left ? "row" : "row-reverse",
        alignItems: "center",
      }}
      onPress={onPress}
      disabled={disableBtn}
    >
      {icon && <MaterialCommunityIcons name={icon} size={size} />}
      {text && (
        <Text
          numberOfLines={1}
          style={[
            styles.text,
            {
              fontSize: size,
              fontWeight,
            },
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default IconText;

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 2,
    textAlign: "center",
    verticalAlign: "middle",
  },
});
