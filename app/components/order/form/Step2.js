import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { screenWidth } from "../../../utils/contants";
import DeliveryMethodChoice from "../DeliveryMethodChoice";
import { useFormikContext } from "formik";
import { ScrollView } from "react-native";

const Step2 = ({ onPrevious, onNext, methods, courrierServices }) => {
  const { colors, roundness } = useTheme();
  const { validateForm, values, setFieldError, setFieldTouched, setErrors } =
    useFormikContext();
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={require("../../../assets/dev-red.png")}
          resizeMode="contain"
        />
      </View>
      <Text variant="headlineLarge" style={{ textAlign: "center" }}>
        Step 1: Delivery Preference
      </Text>
      <View style={styles.form}>
        <DeliveryMethodChoice
          methods={methods}
          courrierService={courrierServices}
        />
        <Button
          mode="contained"
          onPress={async () => {
            console.log("Delivery person", values["deliveryPerson"]);
            console.log("Delivery method", values["deliveryMethod"]);
            console.log("Courrier service", values["courrierService"]);
            // console.log("Checking condition...");
            const isBlockOnTimeSlotFull =
              methods.find(({ _id }) => _id === values["deliveryMethod"])
                ?.blockOnTimeSlotFull === false;
            const hasNoDeliveryPerson = !values["deliveryPerson"];

            // console.log("isBlockOnTimeSlotFull:", isBlockOnTimeSlotFull);
            // console.log("hasNoCareGiver:", hasNoCareGiver);
            let isValid = true;
            const errors = await validateForm(values);
            // if treatment surport and no caregiver specified set error for careGiver
            if (errors["deliveryMethod"]) isValid = false;
            if (isBlockOnTimeSlotFull && values["curriourSercice"]) {
            }
            if (isValid) {
              onNext();
            }
          }}
          style={styles.btn}
        >
          Next
        </Button>
      </View>
    </ScrollView>
  );
};

export default Step2;

const styles = StyleSheet.create({
  img: {
    height: screenWidth * 0.4,
  },
  container: {
    flex: 1,
    width: "100%",
  },
  form: {
    width: "100%",
    padding: 10,
    flex: 1,
  },
  itemContainer: {
    margin: 5,
  },
  listItem: {
    padding: 10,
  },
  btn: {
    marginTop: 10,
  },
});
