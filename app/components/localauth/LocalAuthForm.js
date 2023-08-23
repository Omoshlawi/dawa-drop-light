import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useUser } from "../../api";
import Logo from "../Logo";
import LocalAuthKeyBoard from "./LocalAuthKeyBoard";
import PinIndicators from "./PinIndicators";
import { screenHeight } from "../../utils/contants";
import { useTheme, Text, IconButton } from "react-native-paper";
import { useSettinsContext } from "../../context/hooks";

const LocalAuthForm = ({
  message,
  error,
  maxDigits = 4,
  onPinChanged,
  pin,
}) => {
  const { colors } = useTheme();
  const { theme } = useSettinsContext();
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
      <View>
        <LocalAuthKeyBoard
          disabled={`${pin}`.length >= maxDigits}
          keyTextColor={theme === "dark" ? colors.onPrimary : "#000"}
          keyBackgroundColor={colors.background}
          onKeyPressed={(key) => {
            if (onPinChanged instanceof Function) {
              onPinChanged(`${pin}${key}`);
            }
          }}
          onBackSpace={() => {
            if (onPinChanged instanceof Function) {
              onPinChanged(`${pin}`.substring(0, `${pin}`.length - 1));
            }
          }}
        />
      </View>
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
