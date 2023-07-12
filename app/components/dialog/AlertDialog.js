import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import Dialog from "./Dialog";
import { Text, Button } from "react-native-paper";

const AlertDialog = ({ success, visible, message, onDismiss }) => {
  const [show, setShow] = useState(Boolean(visible));
  return (
    <Dialog
      visible={show}
      onRequestClose={() => setShow(false)}
      onDismiss={onDismiss}
    >
      <View style={{ width: 300 }}>
        <Image
          source={
            success
              ? require("../../assets/check.png")
              : require("../../assets/error.png")
          }
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
        <Text
          variant="headlineMedium"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          {message}
        </Text>
        <Button
          onPress={() => {
            setShow(false);
            if (onDismiss instanceof Function) onDismiss();
          }}
          mode="outlined"
        >
          Ok
        </Button>
      </View>
    </Dialog>
  );
};

export default AlertDialog;

const styles = StyleSheet.create({});
