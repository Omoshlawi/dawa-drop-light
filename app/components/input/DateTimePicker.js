import { StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { default as ExpoDateTimePicker } from "@react-native-community/datetimepicker";
import moment from "moment";
import { Button, IconButton, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DateTimePicker = ({
  label = "Select Date",
  value,
  onChangeValue,
  icon,
  defaultMode = "time", //countdown,datetime, time, date NB: now supotes date and time only
  is24Hrs = true,
  formarter, //required
}) => {
  const [date, setDate] = useState(value ? new Date(value) : new Date());
  const [show, setShow] = useState(false);
  const handleChange = useCallback((event, selectedDate) => {
    const {
      nativeEvent: { timestamp },
    } = event;
    // timestamp and selected date are same
    // console.log("1. ", moment(timestamp).toLocaleString());
    // console.log("2. ", moment(selectedDate).toLocaleString());
    // console.log(timestamp); //1689730058119
    // console.log(selectedDate); //2023-07-19T13:52:47.691Z
    // console.log(value ? new Date(value) : new Date()); //2023-07-19T13:52:48.352Z
    setShow(false);
    setDate(selectedDate);
    if (onChangeValue instanceof Function) onChangeValue(selectedDate);
  }, []);
  const [mode, setMode] = useState(defaultMode);
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      {icon && <MaterialCommunityIcons name={icon} size={20} />}
      <Text style={styles.textInput}>{value ? formarter(value) : label}</Text>
      {show && (
        <ExpoDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={is24Hrs}
          onChange={handleChange}
          sh
        />
      )}
      <IconButton
        icon="calendar"
        onPress={defaultMode === "time" ? showTimepicker : showDatepicker}
      />
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    margin: 5,
    borderRadius: 20,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
