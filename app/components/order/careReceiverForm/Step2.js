import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
/**
 * Look for eligibility
 * @returns
 */
const Step2 = ({ onNext, onPrevious }) => {
  return (
    <View style={styles.screen}>
      <Text>Step2</Text>
      <Button onPress={onNext}  mode="contained" style={styles.navBtn}>Next</Button>
      <Button onPress={onPrevious} mode="contained" style={styles.navBtn}>Previous</Button>
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
      },
    navBtn: {
        marginVertical: 5,
      },
});
