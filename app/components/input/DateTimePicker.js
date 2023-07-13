import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Button, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DateTimePicker = ({
  placeholder = "Select Date",
  value,
  onChangeDate,
  icon,
}) => {
  const [date, setDate] = useState(new Date(value ? value : Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    if (onChangeDate instanceof Function) onChangeDate(currentDate);
  };
  const showDatepicker = () => {
    setMode("date");
    setShow(true);
  };

  const showTimepicker = () => {
    setMode("time");
    setShow(true);
  };

  return (
    <View style={styles.container}>
      {icon && <MaterialCommunityIcons name={icon} size={20} />}
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        // placeholderTextColor={colors.medium}
        value={date.toDateString()}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <IconButton icon="calendar" onPress={showDatepicker} />
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
