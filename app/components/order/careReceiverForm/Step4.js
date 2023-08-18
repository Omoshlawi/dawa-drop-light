import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

/**
 * Delivery details and submitt
 * @returns
 */

const Step4 = ({ onPrevious }) => {
  return (
    <View style={styles.screen}>
      <Text>Step4</Text>
      <Button mode="contained" onPress={onPrevious} style={styles.navBtn}>
        Previous
      </Button>
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
});
