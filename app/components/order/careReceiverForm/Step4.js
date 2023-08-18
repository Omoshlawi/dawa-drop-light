import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import { screenHeight } from "../../../utils/contants";

/**
 * Delivery details and submitt
 * @returns
 */

const Step4 = ({ onPrevious }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.img}>
        <Image
          style={styles.img}
          source={require("./../../../assets/order_delivered.png")}
          resizeMode="contain"
        />
      </View>
      <Text style={{ textAlign: "center" }} variant="headlineSmall">
        Finally: Delivery Information
      </Text>
      <View style={styles.content}>
        <Button mode="contained" onPress={onPrevious} style={styles.navBtn}>
          Previous
        </Button>
        <Button mode="contained" style={styles.navBtn}>
          Submit
        </Button>
      </View>
    </View>
  );
};

export default Step4;

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
