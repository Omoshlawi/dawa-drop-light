import React, { useRef, useState } from "react";
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
} from "react-native";
import { screenWidth } from "../../utils/contants";

const { height: screenHeight } = Dimensions.get("window");
const BOTTOM_SHEET_HEIGHT = screenHeight * 0.25;

const SwipableBottomSheet = ({ children }) => {
  const [bottomSheetHeight, setHeight] = useState(BOTTOM_SHEET_HEIGHT);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;
        // NB: dy positive when drugged down otherwise negative
        const newHeight = bottomSheetHeight - dy;
        if (
          newHeight >= BOTTOM_SHEET_HEIGHT &&
          newHeight <= screenHeight * 0.5
        ) {
          setHeight(newHeight);
        }
      },
    })
  ).current;

  return (
    <View style={[styles.bottomSheet, { height: bottomSheetHeight }]}>
      <View style={styles.line} {...panResponder.panHandlers} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  line: {
    width: screenWidth * 0.25,
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 8,
  },
});

export default SwipableBottomSheet;
