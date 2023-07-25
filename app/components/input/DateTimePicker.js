import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { default as CommunityDateTimePicker } from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme, Text } from "react-native-paper";
import { Pressable } from "react-native";
import { TouchableHighlight } from "react-native";

const DateTimePicker = ({
  label = "Date",
  value,
  onChangeValue,
  icon,
  defaultMode = "time",
  is24Hrs = true,
  formarter, //required
}) => {
  const [show, setShow] = useState(false);
  const { colors, roundness } = useTheme();
  const handleDateChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      if (onChangeValue instanceof Function) onChangeValue(selectedDate);
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.component}>
      {value && label && (
        <Text
          style={[
            styles.label,
            {
              backgroundColor: colors.background,
              color: colors.onSurfaceVariant,
            },
          ]}
          variant="labelSmall"
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.container,
          { borderRadius: roundness, borderColor: colors.outline },
        ]}
      >
        <View style={styles.inputContainer}>
          {icon && (
            <TouchableHighlight
              underlayColor={colors.disabled}
              style={{ borderRadius: 10 }}
              onPress={showDatePicker}
            >
              <MaterialCommunityIcons
                name={icon}
                size={20}
                color={colors.outline}
              />
            </TouchableHighlight>
          )}
          <TouchableOpacity onPress={showDatePicker} style={{ flex: 1 }}>
            <Text variant="labelLarge" style={styles.textInput}>
              {value ? formarter(value) : label}
            </Text>
          </TouchableOpacity>
          {show && (
            <CommunityDateTimePicker
              value={value || new Date()}
              mode={defaultMode}
              is24Hour={is24Hrs}
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  label: {
    left: 10,
    position: "absolute",
    zIndex: 1,
    paddingHorizontal: 5,
  },
  component: {
    marginTop: 5,
  },
  container: {
    borderWidth: 1,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    margin: 5,
    padding: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
