import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TimeInput from "./TimeInput";

const TimeRangePicker = () => {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState({
    from: {
      hrs: "",
      min: "",
      am: true,
    },
    to: { hrs: "", min: "", am: true },
  });

  const handeOnHourChange = (isFrom, value) => {
    if (isFrom) {
      setTime({ ...time, from: { ...time.from, hrs: value } });
    } else {
      setTime({ ...time, to: { ...time.to, hrs: value } });
    }
  };
  const handeOnMinuteChange = (isFrom, value) => {
    if (isFrom) {
      setTime({ ...time, from: { ...time.from, min: value } });
    } else {
      setTime({ ...time, to: { ...time.to, min: value } });
    }
  };
  const handeOnIsAmChange = (isFrom, value) => {
    if (isFrom) {
      setTime({ ...time, from: { ...time.from, am: value } });
    } else {
      setTime({ ...time, to: { ...time.to, am: value } });
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inputContaoner}
        onPress={() => setShow(true)}
      >
        <MaterialCommunityIcons name="calendar" size={30} />
        <Text style={styles.input}>Select Time Range</Text>
        <IconButton icon="calendar" />
      </TouchableOpacity>
      <Modal visible={show} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <IconButton icon="close" onPress={() => setShow(false)} />
          </View>
          <View style={styles.modalBody}>
            <View style={styles.modalbodyContent}>
              <Text>From</Text>
              <TimeInput
                hour={time.from.hrs}
                minute={time.from.min}
                isAm={time.from.am}
                onHourChange={(value) => handeOnHourChange(true, value)}
                onMinuteChange={(value) => handeOnMinuteChange(true, value)}
                onIsAmChange={(value) => handeOnIsAmChange(true, value)}
              />
              <Text>to</Text>
              <TimeInput
                hour={time.to.hrs}
                minute={time.to.min}
                isAm={time.to.am}
                onHourChange={(value) => handeOnHourChange(false, value)}
                onMinuteChange={(value) => handeOnMinuteChange(false, value)}
                onIsAmChange={(value) => handeOnIsAmChange(false, value)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TimeRangePicker;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  inputContaoner: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    backgroundColor: "#fff",
  },
  modalBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000040",
  },
  modalbodyContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    width: "90%",
    height: "80%",
  },
});
