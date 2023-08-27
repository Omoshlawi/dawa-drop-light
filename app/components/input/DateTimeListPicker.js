import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { default as CommunityDateTimePicker } from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme, Text } from "react-native-paper";
import { Pressable } from "react-native";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native";
import { getRandomColor } from "../../utils/helpers";
const DateTimeListPicker = ({
  value = [],
  onChangeValue,
  label,
  icon,
  defaultMode = "time",
  is24Hrs = true,
  formarter, //required
}) => {
  const { colors, roundness } = useTheme();
  const [dateTime, setDateTime] = useState({
    date: null,
    time: null,
    currMode:
      defaultMode === "date" || defaultMode === "time" ? defaultMode : "date",
    show: false,
  });
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      // if default mode is date or time
      if (defaultMode !== "datetime") {
        setDateTime({ ...dateTime, show: false });
        if (onChangeValue instanceof Function)
          return onChangeValue([...value, selectedDate]);
      }
      // if default mode is datetime
      if (dateTime.currMode === "date") {
        // 1st capture date, set it and return
        return setDateTime({
          ...dateTime,
          date: selectedDate,
          currMode: "time",
          show: true,
        });
      } else {
        // last Capture time set it
        setDateTime({
          ...dateTime,
          time: selectedDate,
          currMode: "date",
          show: false,
        });
        if (onChangeValue instanceof Function) {
          // Combine the 2 to form 1
          const date = new Date(dateTime.date);
          const time = new Date(selectedDate); // Use selectedDate here

          onChangeValue([
            ...value,
            new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              time.getHours(),
              time.getMinutes(),
              time.getSeconds()
            ),
          ]);
        }
        // reset state
        setDateTime({
          ...dateTime,
          date: null,
          time: null,
          currMode: "date",
          show: false,
        });
      }
    }
  };

  const showPicker = () => {
    setDateTime({ ...dateTime, show: true });
  };

  return (
    <View style={styles.component}>
      {value.length > 0 && label && (
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
              onPress={showPicker}
            >
              <MaterialCommunityIcons
                name={icon}
                size={20}
                color={colors.outline}
              />
            </TouchableHighlight>
          )}

          {value.length > 0 ? (
            <FlatList
              horizontal
              data={value}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.disabled,
                    borderRadius: roundness,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginHorizontal: 3,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    if (onChangeValue instanceof Function) {
                      const _values = [...value];
                      _values.splice(index, 1);
                      onChangeValue(_values);
                    }
                  }}
                >
                  <View
                    style={{
                      backgroundColor: getRandomColor(),
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      marginHorizontal: 3,
                    }}
                  />
                  <Text>{formarter(item)}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text variant="labelLarge" style={styles.textInput}>
              {label}
            </Text>
          )}
          <TouchableOpacity onPress={showPicker} style={{ borderRadius: 10 }}>
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color={colors.outline}
            />
          </TouchableOpacity>

          {dateTime.show && (
            <CommunityDateTimePicker
              value={new Date()}
              mode={dateTime.currMode}
              is24Hour={is24Hrs}
              display="spinner"
              onChange={handleDateChange}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default DateTimeListPicker;

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
    flex: 1,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
