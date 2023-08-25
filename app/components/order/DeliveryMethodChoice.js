import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Card, useTheme, Text, List, RadioButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import { screenWidth } from "../../utils/contants";
import { FormField, FormItemPicker } from "../forms";
import { useUser } from "../../api";
import DeliveryPersonDetails from "./form/DeliveryPersonDetails";

const DeliveryMethodChoice = ({
  methods = [],
  fieldName = "deliveryMethod",
  courrierService,
  onWizardInfoChange,
  specific,
}) => {
  const { values, setFieldValue, errors } = useFormikContext();
  const [checked, setChecked] = useState("no");
  const { colors, roundness } = useTheme();
  const currMethod = methods.find(({ _id }) => _id === values[fieldName]);
  const { getUserId } = useUser();
  const userId = getUserId();
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    nationalId: "",
    phoneNumber: "",
  });
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
            name="courrierService"
            icon="truck"
            searchable
            label="Courrier Service"
            data={courrierService}
            valueExtractor={({ _id }) => _id}
            labelExtractor={({ name }) => name}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                style={styles.listItem}
                left={(props) => <List.Icon {...props} icon="truck" />}
              />
            )}
            itemContainerStyle={[
              styles.itemContainer,
              { borderRadius: roundness },
            ]}
          />
          {values["courrierService"] && (
            <View style={{ paddingTop: 10 }}>
              <Text>
                Do you have someone specific in to do the delivery for you?
              </Text>
              <View style={{}}>
                <RadioButton.Group
                  onValueChange={(value) => {
                    if (onWizardInfoChange instanceof Function) {
                      onWizardInfoChange((wizardInfo) => ({
                        ...wizardInfo,
                        specific: value,
                      }));
                    }
                  }}
                  value={specific}
                >
                  <RadioButton.Item
                    label="Yes (You are sending specific courrier service person)"
                    value="yes"
                    labelVariant="bodySmall"
                  />
                  <RadioButton.Item
                    label="No (The facility makes assigns to any available courrier of choice service person)"
                    value="no"
                    labelVariant="bodySmall"
                  />
                </RadioButton.Group>
              </View>
              {specific === "yes" && (
                <>
                  <Text>
                    Please provide details for courrier service person
                  </Text>
                  <DeliveryPersonDetails name="deliveryPerson" />
                </>
              )}
            </View>
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
