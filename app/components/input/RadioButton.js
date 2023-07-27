import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RadioButton = ({
  label,
  data = [],
  value,
  labelExtractor,
  valueExtractor,
  onValueChange,
  error,
}) => {
  const { colors, roundness } = useTheme();
  const current = data.find((val) => valueExtractor(val) === value);
  return (
    <View
      style={[
        styles.choiceContainer,
        { backgroundColor: colors.surface, borderRadius: roundness },
      ]}
    >
      <Text variant="titleLarge">{label}</Text>
      <View style={styles.choiceContainer}>
        {data.map((item, index) => {
          const selected = valueExtractor(item) === valueExtractor(current);
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.response,
                {
                  backgroundColor: selected
                    ? colors.disabled
                    : colors.background,
                  borderRadius: roundness,
                },
              ]}
              onPress={() => {
                if (onValueChange instanceof Function) {
                  onValueChange(item);
                }
              }}
            >
              <MaterialCommunityIcons
                name={selected ? "radiobox-marked" : "radiobox-blank"}
                size={20}
                color={colors.primary}
              />
              <Text variant="titleSmall" style={styles.responseText}>
                {labelExtractor(item)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && <Text style={{ color: colors.error }}>{error}</Text>}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  choiceContainer: {
    padding: 10,
  },
  responsesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  response: {
    padding: 10,
    margin: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  responseText: {
    paddingHorizontal: 10,
  },
});
