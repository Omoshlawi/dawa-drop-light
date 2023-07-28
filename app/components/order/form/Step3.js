import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Button, List, Text, useTheme } from "react-native-paper";
import { screenWidth } from "../../../utils/contants";
import moment from "moment/moment";
import { FormField, FormItemPicker, FormLocationPicker } from "../../forms";
import { useFormikContext } from "formik";

const Step3 = ({ onNext, onPrevious, modes, timeSlots, loading }) => {
  const { colors, roundness } = useTheme();
  const { values, validateForm, setFieldTouched } = useFormikContext();
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={require("../../../assets/dev.png")}
          resizeMode="contain"
        />
      </View>
      <Text variant="headlineLarge">Finish: Delivery Information</Text>
      <View style={styles.form}>
        <FormField
          name="phoneNumber"
          placeholder="Enter Phone number"
          label="Phone number"
          icon="phone"
        />
        <FormItemPicker
          name="deliveryMode"
          icon="truck-delivery"
          searchable
          label="Delivery mode"
          data={modes}
          valueExtractor={({ _id }) => _id}
          labelExtractor={({ name }) => name}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              style={styles.listItem}
              left={(props) => <List.Icon {...props} icon="truck-delivery" />}
            />
          )}
          itemContainerStyle={[
            styles.itemContainer,
            { borderRadius: roundness },
          ]}
        />
        <FormItemPicker
          name="deliveryTimeSlot"
          icon="timelapse"
          searchable
          label="Delivery time slot"
          data={timeSlots}
          valueExtractor={({ _id }) => _id}
          labelExtractor={({ label }) => label}
          renderItem={({ item }) => (
            <List.Item
              title={item.label}
              style={styles.listItem}
              left={(props) => <List.Icon {...props} icon="timelapse" />}
            />
          )}
          itemContainerStyle={[
            styles.itemContainer,
            { borderRadius: roundness },
          ]}
        />
        <FormLocationPicker name="deliveryAddress" />
        <Button mode="contained" onPress={onPrevious} style={styles.btn}>
          Previous
        </Button>
        <Button
          mode="contained"
          loading={loading}
          onPress={async () => {
            const fields = [
              "deliveryAddress",
              "deliveryMode",
              "phoneNumber",
              "deliveryTimeSlot",
            ];
            const errors = await validateForm(values);
            const invalidFields = Object.keys(errors);
            let valid = true;
            for (const field of fields) {
              const inValid = invalidFields.includes(field);
              if (inValid) {
                valid = !inValid;
                setFieldTouched(field, true);
              }
            }
            if (valid) onNext();
          }}
          style={styles.btn}
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

export default Step3;

const styles = StyleSheet.create({
  img: {
    height: screenWidth * 0.5,
  },
  container: {
    flex: 1,
    alignItems: "center",
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
