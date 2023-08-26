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
  const [show, setShow] = useState(false);
  const { colors, roundness } = useTheme();
  const handleDateChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      if (onChangeValue instanceof Function)
        onChangeValue([...value, selectedDate]);
    }
  };

  const showDatePicker = () => {
    setShow(true);
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
              onPress={showDatePicker}
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
                      _values.splice(index, 1)
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
          <TouchableOpacity
            onPress={showDatePicker}
            style={{ borderRadius: 10 }}
          >
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color={colors.outline}
            />
          </TouchableOpacity>

          {show && (
            <CommunityDateTimePicker
              value={new Date()}
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
