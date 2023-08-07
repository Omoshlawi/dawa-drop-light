import React, { useRef } from "react";
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
  const bottomSheetHeight = useRef(
    new Animated.Value(BOTTOM_SHEET_HEIGHT)
  ).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState;
        // NB: dy is positive when dragged down, otherwise negative
        const newHeight = bottomSheetHeight._value - dy;
        if (
          newHeight >= BOTTOM_SHEET_HEIGHT &&
          newHeight <= screenHeight * 0.75
        ) {
          bottomSheetHeight.setValue(newHeight);
        }
      },

      //   onPanResponderRelease: (_, gestureState) => {
      //     const { dy } = gestureState;
      //     if (dy < 0) {
      //       Animated.timing(bottomSheetHeight, {
      //         toValue: screenHeight,
      //         duration: 300,
      //         useNativeDriver: false,
      //       }).start();
      //     } else if (dy > 0 && dy < BOTTOM_SHEET_HEIGHT * 0.5) {
      //       Animated.timing(bottomSheetHeight, {
      //         toValue: BOTTOM_SHEET_HEIGHT,
      //         duration: 300,
      //         useNativeDriver: false,
      //       }).start();
      //     } else {
      //       Animated.timing(bottomSheetHeight, {
      //         toValue: screenHeight,
      //         duration: 300,
      //         useNativeDriver: false,
      //       }).start();
      //     }
      //   },
    })
  ).current;

  return (
    <Animated.View style={[styles.bottomSheet, { height: bottomSheetHeight }]}>
      <View style={styles.line} {...panResponder.panHandlers} />
      {children}
    </Animated.View>
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
