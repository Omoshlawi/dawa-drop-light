import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
/**
 * Choose the care receiver or search carereceiver by cccNumber and create relations
 * @returns
 */
const Step1 = ({ onNext }) => {
  return (
    <View>
      <Text>Step1</Text>
      <Button onPress={onNext}>Next</Button>
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({});
