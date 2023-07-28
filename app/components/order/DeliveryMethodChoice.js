import { StyleSheet, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Card, useTheme, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import { screenWidth } from "../../utils/contants";

const DeliveryMethodChoice = ({
  methods = [],
  fieldName = "deliveryMethod",
}) => {
  const { values, setFieldValue, errors } = useFormikContext();
  const { colors, roundness } = useTheme();
  return (
    <View
      style={[
        styles.conatiner,
        { backgroundColor: colors.surface, borderRadius: roundness },
      ]}
    >
      <Text style={styles.label} variant="titleLarge">
        How do you want drugs delivered ?
      </Text>
      <FlatList
        data={methods}
        keyExtractor={({ _id }) => _id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const { _id, name, description } = item;
          return (
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: colors.background, borderRadius: roundness },
              ]}
              onPress={() => {
                setFieldValue(fieldName, _id);
              }}
            >
              <MaterialCommunityIcons
                style={styles.radio}
                name={
                  _id === values[fieldName]
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                color={colors.primary}
                size={20}
              />
              <MaterialCommunityIcons name="truck-delivery" size={40} />
              <Text style={{ textAlign: "center" }}>{name}</Text>
            </TouchableOpacity>
          );
        }}
      />
      {fieldName && (
        <Text style={{ color: colors.error }}>{errors[fieldName]}</Text>
      )}
    </View>
  );
};

export default DeliveryMethodChoice;

const styles = StyleSheet.create({
  conatiner: {
    padding: 20,
  },
  label: {
    padding: 10,
  },
  card: {
    margin: 5,
    padding: 10,
    alignItems: "center",
    width: screenWidth * 0.35,
  },
  radio: {
    position: "absolute",
    top: 5,
    left: 5,
  },
});
