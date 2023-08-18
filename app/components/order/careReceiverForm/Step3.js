import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import { screenHeight } from "../../../utils/contants";

/**
 * Delivery method
 * @returns
 */

const Step3 = ({ onNext, onPrevious }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.img}>
        <Image
          style={styles.img}
          source={require("./../../../assets/deliveries.png")}
          resizeMode="contain"
        />
      </View>
      <Text style={{ textAlign: "center" }} variant="headlineSmall">
        Step 3: Almost Done
      </Text>
      <View style={styles.content}>
        <Button onPress={onPrevious} mode="contained" style={styles.navBtn}>
          Previous
        </Button>
        <Button onPress={onNext} mode="contained" style={styles.navBtn}>
          Next
        </Button>
      </View>
    </View>
  );
};

export default Step3;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  navBtn: {
    marginVertical: 5,
  },
  content: {
    padding: 10,
  },
  img: {
    width: "100%",
    height: screenHeight * 0.2,
  },
});
