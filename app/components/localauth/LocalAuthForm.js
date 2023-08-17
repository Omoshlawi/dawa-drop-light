import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useUser } from "../../api";
import Logo from "../Logo";
import LocalAuthKeyBoard from "./LocalAuthKeyBoard";
import PinIndicators from "./PinIndicators";
import { screenHeight } from "../../utils/contants";
import { useTheme } from "react-native-paper";

const LocalAuthForm = ({
  message,
  error,
  maxDigits = 4,
  onPinChanged,
  pin,
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Logo />
      <View style={{ flex: 1 }} />
      <PinIndicators
        digits={maxDigits}
        pin={pin}
        activeColor={colors.primary}
        errorColor={colors.error}
        inactiveColor={colors.disabled}
        error={error}
      />
      <Text style={{ color: error ? colors.error : undefined, padding: 10 }}>
        {message}
      </Text>
      <LocalAuthKeyBoard
        disabled={`${pin}`.length >= maxDigits}
        keyTextColor={colors.onPrimary}
        keyBackgroundColor={colors.background}
        onKeyPressed={(key) => {
          if (onPinChanged instanceof Function) {
            onPinChanged(`${pin}${key}`);
          }
        }}
      />
    </View>
  );
};

export default LocalAuthForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: screenHeight * 0.1,
  },
});
