import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { screenWidth } from "../../utils/contants";

const LocalAuthKeyBoard = ({
  keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  disabled,
  onKeyPressed,
  keyTextColor,
  keyBackgroundColor,
  backgroundColor,
}) => {
  return (
    <View style={[styles.keyBoard, { backgroundColor }]}>
      {keys.map((key) => (
        <TouchableOpacity
          key={key}
          disabled={disabled}
          style={[styles.key, { backgroundColor: keyBackgroundColor }]}
          onPress={() => {
            if (onKeyPressed instanceof Function) {
              onKeyPressed(key);
            }
          }}
        >
          <Text style={[styles.keyText, { color: keyTextColor }]}>{key}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LocalAuthKeyBoard;

const styles = StyleSheet.create({
  keyBoard: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  key: {
    width: screenWidth * 0.3,
    padding: 20,
    margin: 2,
  },
  keyText: {
    textAlign: "center",
  },
});
