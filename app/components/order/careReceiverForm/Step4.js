import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Button, List, Text, useTheme } from "react-native-paper";
import { screenHeight } from "../../../utils/contants";
import { FormField, FormItemPicker, FormLocationPicker } from "../../forms";
import { useFormikContext } from "formik";

/**
 * Delivery details and submitt
 * @returns
 */

const Step4 = ({ onPrevious, modes, timeSlots, loading, onSubmit }) => {
  const { colors, roundness } = useTheme();
  const { values, validateForm, setFieldTouched } = useFormikContext();
  return (
    <View style={styles.screen}>
      <View style={styles.img}>
        <Image
          style={styles.img}
          source={require("./../../../assets/order_delivered.png")}
          resizeMode="contain"
        />
      </View>
      <Text style={{ textAlign: "center" }} variant="headlineSmall">
        Finally: Delivery Information
      </Text>
      <View style={styles.content}>
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
        <Button mode="contained" onPress={onPrevious} style={styles.navBtn}>
          Previous
        </Button>
        <Button
          mode="contained"
          style={styles.navBtn}
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
            if (valid) onSubmit();
          }}
        >
          Confirm
        </Button>
      </View>
    </View>
  );
};

export default Step4;

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
  itemContainer: {
    margin: 5,
  },
  listItem: {
    padding: 10,
  },
});
