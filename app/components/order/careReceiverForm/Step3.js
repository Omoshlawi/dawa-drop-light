import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { screenHeight } from "../../../utils/contants";
import DeliveryMethodChoice from "../DeliveryMethodChoice";
import { useFormikContext } from "formik";
/**
 * Delivery method
 * @returns
 */

const Step3 = ({ onNext, onPrevious, methods, treatmentSurpoters }) => {
  const { colors, roundness } = useTheme();
  const { validateForm, values, setFieldError, setFieldTouched, setErrors } =
    useFormikContext();
  const [careGiverField, setCareGiverField] = useState("");
  return (
    <View style={styles.screen}>
      <View style={styles.img}>
        <Image
          style={styles.img}
          source={require("./../../../assets/deliveries.png")}
          resizeMode="contain"
        />
      </View>
      <Text style={{ textAlign: "center" }} variant="headlineSmall">
        Step 3: Almost Done
      </Text>
      <View style={styles.content}>
        <DeliveryMethodChoice
          methods={methods}
          treatmentSurpoters={treatmentSurpoters}
          careGiverMessage={careGiverField}
        />
        <Button onPress={onPrevious} mode="contained" style={styles.navBtn}>
          Previous
        </Button>
        <Button
          onPress={async () => {
            console.log("Checking condition...");
            const isBlockOnTimeSlotFull =
              methods.find(({ _id }) => _id === values["deliveryMethod"])
                ?.blockOnTimeSlotFull === false;
            const hasNoCareGiver = !values["careGiver"];

            console.log("isBlockOnTimeSlotFull:", isBlockOnTimeSlotFull);
            console.log("hasNoCareGiver:", hasNoCareGiver);
            let isValid = true;
            const errors = await validateForm(values);
            // if treatment surport and no caregiver specified set error for careGiver
            if (errors["deliveryMethod"]) {
              isValid = false;
            } else if (isBlockOnTimeSlotFull && hasNoCareGiver) {
              isValid = false;
              setCareGiverField("Care giver is required");
              // console.log("Setting field error and touched...");
            }

            if (isValid) {
              setCareGiverField("");
              console.log("Proceeding to next step...");
              console.log(values["careGiver"]);
              onNext();
            }
          }}
          mode="contained"
          style={styles.navBtn}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

export default Step3;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  navBtn: {
    marginVertical: 5,
  },
  content: {
    padding: 10,
  },
  img: {
    width: "100%",
    height: screenHeight * 0.2,
  },
});
