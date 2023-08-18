import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
/**
 * Look for eligibility
 * @returns
 */
const Step2 = ({ onNext, onPrevious }) => {
  return (
    <View>
      <Text>Step2</Text>
      <Button onPress={onNext}>Next</Button>
      <Button onPress={onPrevious}>Previous</Button>
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({});
