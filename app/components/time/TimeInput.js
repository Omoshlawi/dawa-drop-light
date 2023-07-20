import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme, TextInput } from "react-native-paper";

const TimeInput = ({
  hour,
  minute,
  isAm = true,
  onHourChange,
  onMinuteChange,
  onIsAmChange,
}) => {
  const { colors } = useTheme();

  const handleHourChange = (text) => {
    // Ensure the hour is a valid number between 0 and 12
    const newHour = parseInt(text, 10);
    if (!isNaN(newHour) && newHour >= 0 && newHour <= 12) {
      // make sure onHourChange is a function
      if (onHourChange instanceof Function) {
        onHourChange(text);
      }
    }
    if (!text) {
      if (onHourChange instanceof Function) {
        onHourChange("");
      }
    }
  };

  const handleMinuteChange = (text) => {
    // Ensure the minute is a valid number between 0 and 59
    const newMinute = parseInt(text, 10);
    if (!isNaN(newMinute) && newMinute >= 0 && newMinute <= 59) {
      // make sure onMinuteChange is a function
      if (onMinuteChange instanceof Function) {
        onMinuteChange(text);
      }
    }
    if (!text) {
      if (onMinuteChange instanceof Function) {
        onMinuteChange("");
      }
    }
  };

  const handleIsAmChange = (_isAm) => {
    if (onIsAmChange instanceof Function) {
      onIsAmChange(_isAm);
    }
  };

  return (
    <View style={styles.inputsContainer}>
      <TextInput
        maxLength={2}
        style={styles.input}
        keyboardType="numeric"
        value={hour}
        onChangeText={handleHourChange}
        placeholder="HH"
        mode="outlined"
        label="Hrs"
      />
      <Text>:</Text>
      <TextInput
        maxLength={2}
        style={styles.input}
        keyboardType="numeric"
        value={minute}
        mode="outlined"
        onChangeText={handleMinuteChange}
        placeholder="mm"
        label="Mns"
      />
      <View style={styles.timeContainer}>
        <TouchableOpacity
          style={[
            styles.timeBtn,
            isAm ? { backgroundColor: colors.disabled } : {},
          ]}
          onPress={() => handleIsAmChange(true)}
        >
          <Text style={styles.time}>AM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeBtn,
            !isAm ? { backgroundColor: colors.disabled } : {},
          ]}
          onPress={() => handleIsAmChange(false)}
        >
          <Text style={styles.time}>PM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimeInput;

const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  input: {
    width: 60,
    height: 60,
    borderRadius: 10,
    textAlign: "center",
    marginHorizontal: 10,
  },
  time: {
    verticalAlign: "middle",
    textAlign: "center",
  },
  timeBtn: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  timeContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    overflow: "hidden",
  },
});
