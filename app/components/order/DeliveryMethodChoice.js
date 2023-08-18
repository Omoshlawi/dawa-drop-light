import { StyleSheet, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Card, useTheme, Text, List } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import { screenWidth } from "../../utils/contants";
import { FormItemPicker } from "../forms";
import { useUser } from "../../api";

const DeliveryMethodChoice = ({
  methods = [],
  fieldName = "deliveryMethod",
  treatmentSurpoters,
  careGiverMessage,
}) => {
  const { values, setFieldValue, errors } = useFormikContext();
  const { colors, roundness } = useTheme();
  const currMethod = methods.find(({ _id }) => _id === values[fieldName]);
  const { getUserId } = useUser();
  const userId = getUserId();
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
      {currMethod?.blockOnTimeSlotFull === false && (
        <>
          <FormItemPicker
            name="careGiver"
            icon="account"
            searchable
            label="Care giver"
            data={treatmentSurpoters}
            valueExtractor={({ _id }) => _id}
            labelExtractor={(careGiver) => {
              const name = `${
                careGiver.userCareGiver[0].firstName &&
                careGiver.userCareGiver[0].lastName
                  ? careGiver.userCareGiver[0].firstName +
                    " " +
                    careGiver.userCareGiver[0].lastName
                  : careGiver.userCareGiver[0].username
              }`;
              return name;
            }}
            renderItem={({ item }) => {
              const {
                patientCareReceiver,
                userCareGiver,
                careGiver: careGiver_,
                careReceiver: careReceiver_,
                userCareReceiver,
                _id,
              } = item;
              const careReceiver = patientCareReceiver[0];
              const careGiver = userCareGiver[0];
              const careReceiverUser = userCareReceiver[0];
              const name =
                careGiver.firstName && careGiver.lastName
                  ? `${careGiver.firstName} ${careGiver.lastName}`
                  : `${careGiver.username}`;
              const description = `${careGiver.phoneNumber} | ${careGiver.email}`;
              return (
                <List.Item
                  title={name}
                  style={styles.listItem}
                  left={(props) => <List.Icon {...props} icon="account" />}
                  description={description}
                  descriptionStyle={{ color: colors.disabled }}
                />
              );
            }}
            itemContainerStyle={[
              styles.itemContainer,
              { borderRadius: roundness },
            ]}
          />
          {careGiverMessage && (
            <Text style={{ color: colors.error }}>{careGiverMessage}</Text>
          )}
        </>
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
  listItem: {
    padding: 10,
  },
  itemContainer: {
    margin: 5,
  },
});
