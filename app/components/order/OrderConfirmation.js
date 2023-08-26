import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, IconButton, List, Text, useTheme } from "react-native-paper";
import { screenWidth } from "../../utils/contants";
import { useFormikContext } from "formik";

const OrderConfirmation = ({
  onSubmit,
  deliveryMethods = [],
  courrierServices = [],
  specific,
}) => {
  const { values, handleSubmit } = useFormikContext();
  const method = deliveryMethods.find(
    ({ _id }) => _id === values["deliveryMethod"]
  );
  const service = courrierServices.find(
    ({ _id }) => _id === values["courrierService"]
  );
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.text}>
        Please verify your delivery details
      </Text>
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.background }]}
        title="Delivered through?"
        description={method ? method.name : "None"}
        left={(props) => <List.Icon icon="truck-delivery" {...props} />}
      />
      {specific === "yes" && values["deliveryPerson"] && (
        <List.Item
          style={[styles.listItem, { backgroundColor: colors.background }]}
          title="Who will do the delivery?"
          description={`${values["deliveryPerson"].fullName} | ${values["deliveryPerson"].nationalId}`}
          left={(props) => <List.Icon icon="account" {...props} />}
        />
      )}
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.background }]}
        title="Phone Number"
        description={values["phoneNumber"] ? values["phoneNumber"] : "None"}
        left={(props) => <List.Icon icon="phone" {...props} />}
      />
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.background }]}
        title="Delivery Location"
        description={
          values["deliveryAddress"]
            ? `${values["deliveryAddress"]["address"]}(${values["deliveryAddress"]["latitude"]}, ${values["deliveryAddress"]["longitude"]})`
            : "None"
        }
        left={(props) => <List.Icon icon="hospital-marker" {...props} />}
      />
      <Button
        onPress={(events) => {
          onSubmit(events);
          handleSubmit(events);
        }}
        mode="contained"
      >
        Submit
      </Button>
    </View>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.7,
  },
  listItem: {
    marginBottom: 10,
  },
  text: {
    padding: 10,
  },
});
