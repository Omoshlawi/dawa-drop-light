import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useUser } from "../../../api";
/**
 * Choose the care receiver or search carereceiver by cccNumber and create relations
 * STEPS:
 * 1. Get all careReceivers with can Order privileges
 * 2.
 * @returns
 */
const Step1 = ({ onNext }) => {
  const { getTreatmentSurport, getUserId } = useUser();
  const [careReceivers, setCareReceivers] = useState([]);
  const userId = getUserId();
  const handleFetch = async () => {
    const resp = await getTreatmentSurport({ canOrderDrug: true });
    if (resp.ok) {
      setCareReceivers(
        resp.data.results.filter((item) => {
          const { careGiver: careGiver_, careReceiver: careReceiver_ } = item;
          // asociation fully established and user is caregiver
          return careReceiver_ && careGiver_ && careGiver_ === userId;
        })
      );
    }
  };
  return (
    <View style={styles.screen}>
      <Text>Step1</Text>
      <Button onPress={onNext} mode="contained" style={styles.navBtn}>
        Next
      </Button>
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  navBtn: {
    marginVertical: 5,
  },
});
