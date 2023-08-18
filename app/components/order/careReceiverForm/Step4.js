import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

/**
 * Delivery details and submitt
 * @returns
 */

const Step4 = ({ onPrevious }) => {
  return (
    <View>
      <Text>Step4</Text>
      <Button onPress={onPrevious}>Previous</Button>
    </View>
  );
};

export default Step4;

const styles = StyleSheet.create({});
