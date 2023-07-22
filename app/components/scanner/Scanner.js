import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { IconButton, useTheme, Text } from "react-native-paper";
import { screenWidth } from "../../utils/contants";

const Scanner = ({ onScanned, requestCancel }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [backCamera, setBackCamera] = useState(true);
  const [permissionResponse, requestPermission] =
    BarCodeScanner.usePermissions();
  const { colors } = useTheme();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await requestPermission();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.titleText} variant="titleLarge">
        Point the camera QR code
      </Text>
      <View style={styles.scanner}>
        <BarCodeScanner
          onBarCodeScanned={onScanned}
          style={StyleSheet.absoluteFillObject}
          type={backCamera ? "back" : "front"}
        />
      </View>
      <View style={styles.btnContainer}>
        <IconButton
          size={screenWidth * 0.12}
          icon={backCamera ? "camera-flip" : "camera-flip-outline"}
          mode="outlined"
          onPress={() => setBackCamera(!backCamera)}
        />
        <IconButton
          size={screenWidth * 0.12}
          icon="close"
          mode="outlined"
          onPress={requestCancel}
        />
      </View>
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  scanner: {
    flex: 2,
  },
  titleText: {
    textAlign: "center",
    padding: 10,
  },
});
