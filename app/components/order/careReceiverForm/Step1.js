import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import { useUser } from "../../../api";
import { screenHeight, screenWidth } from "../../../utils/contants";
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
      <View style={styles.img}>
        <Image
          style={styles.img}
          source={require("./../../../assets/surport.png")}
          resizeMode="contain"
        />
      </View>
      <Text style={{ textAlign: "center" }} variant="headlineSmall">
        Step 1: Care Receiver Information
      </Text>
      <View style={styles.content}>
        <Button onPress={onNext} mode="contained" style={styles.navBtn}>
          Next
        </Button>
      </View>
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  img: {
    width: "100%",
    height: screenHeight * 0.2,
  },
  navBtn: {
    marginVertical: 5,
  },
  content: {
    padding: 10,
  },
});
