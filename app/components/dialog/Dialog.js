import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const Dialog = ({ children, title, onDismiss, visible, onRequestClose }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onRequestClose}
      onDismiss={onDismiss}
    >
      <View style={styles.screen}>
        <View style={styles.dialog}>
          <Text style={styles.dialogTitle}>{title}</Text>
          <View style={styles.dialogBody}>{children}</View>
          <View style={styles.dialogActions}></View>
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#00000096",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    borderRadius: 30,
    overflow: "hidden",
    padding: 20,
    backgroundColor: "#ffff",
  },
  dialogTitle: {
    fontWeight: "bold",
    padding: 10,
  },
  dialogActions: {},
  dialogBody: {},
});
