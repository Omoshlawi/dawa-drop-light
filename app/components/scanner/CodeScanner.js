import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { IconButton, useTheme } from "react-native-paper";
import { screenWidth } from "../../utils/contants";
import { Modal } from "react-native";
import Scanner from "./Scanner";

const CodeScanner = ({ onRequestClose, onScaned }) => {
  const { colors } = useTheme();
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <IconButton
        icon="qrcode-scan"
        size={screenWidth * 0.15}
        mode="outlined"
        containerColor={colors.secondary}
        iconColor={colors.surface}
        onPress={() => setShow(true)}
      />
      <Text>Scan QR Code</Text>
      <Modal
        visible={show}
        onRequestClose={onRequestClose}
        animationType="slide"
      >
        <Scanner
          onScanned={({ type, data }) => {
            setShow(false);
            if (onScaned instanceof Function) {
              onScaned(data);
            }
          }}
          requestCancel={() => setShow(false)}
        />
      </Modal>
    </View>
  );
};

export default CodeScanner;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
