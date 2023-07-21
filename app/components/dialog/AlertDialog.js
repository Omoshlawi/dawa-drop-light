import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { Text, Button } from "react-native-paper";
import { getDialogIcon } from "./";
import { screenWidth } from "../../utils/contants";

const AlertDialog = ({ mode, message, onButtonPress }) => {
  return (
    <View style={styles.dialog}>
      <Image style={styles.img} source={getDialogIcon(mode)} />
      <Text style={styles.text}>{message}</Text>
      <Button mode="outlined" onPress={onButtonPress}>
        Ok
      </Button>
    </View>
  );
};

export default AlertDialog;

const styles = StyleSheet.create({
  dialog: {
    width: screenWidth * 0.75,
  },
  img: {
    alignSelf: "center",
    width: 100,
    height: 100,
  },
  text: {
    textAlign: "center",
    padding: 10,
  },
});
