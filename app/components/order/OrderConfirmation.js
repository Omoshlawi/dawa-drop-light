import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, IconButton, List, Text, useTheme } from "react-native-paper";
import { screenWidth } from "../../utils/contants";
import { useFormikContext } from "formik";

const OrderConfirmation = ({
  deliveryTimeSlots = [],
  deliveryModes = [],
  onSubmit,
  deliveryMethods = [],
  careGiverSurporters = [],
  careReceiverSuppoters = [],
}) => {
  const { values, handleSubmit } = useFormikContext();
  const slot = deliveryTimeSlots.find(({ url }) => url === values["time_slot"]);
  const mode = deliveryModes.find(({ _id }) => _id === values["deliveryMode"]);
  const method = deliveryMethods.find(
    ({ _id }) => _id === values["deliveryMethod"]
  );
  const careGiver = careGiverSurporters.find(
    ({ _id }) => _id === values["careGiver"]
  );
  const careReceiver = careReceiverSuppoters.find(
    ({ _id }) => _id === values["careReceiver"]
  );
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.text}>
        Please verify your order details
      </Text>
      {careReceiver && (
        <List.Item
          style={[styles.listItem, { backgroundColor: colors.background }]}
          title="CareReceiver"
          description={`${
            careReceiver.userCareReceiver[0].firstName &&
            careReceiver.userCareReceiver[0].lastName
              ? careReceiver.userCareReceiver[0].firstName +
                " " +
                careReceiver.userCareReceiver[0].lastName
              : `${careReceiver.userCareReceiver[0].username}(${careReceiver.userCareReceiver[0].phoneNumber})`
          }`}
          left={(props) => <List.Icon icon="account" {...props} />}
        />
      )}
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.background }]}
        title="Delivery Mode"
        description={mode ? mode.name : "None"}
        left={(props) => <List.Icon icon="truck" {...props} />}
      />
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.background }]}
        title="Time Slot"
        description={slot ? slot.label : "None"}
        left={(props) => <List.Icon icon="timelapse" {...props} />}
      />
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.background }]}
        title="Delivered through?"
        description={method ? method.name : "None"}
        left={(props) => <List.Icon icon="truck-delivery" {...props} />}
      />
      {method.blockOnTimeSlotFull === false && careGiver && (
        <List.Item
          style={[styles.listItem, { backgroundColor: colors.background }]}
          title="Care giver"
          description={
            careGiver
              ? `${
                  careGiver.userCareGiver[0].firstName &&
                  careGiver.userCareGiver[0].lastName
                    ? careGiver.userCareGiver[0].firstName +
                      " " +
                      careGiver.userCareGiver[0].lastName
                    : careGiver.userCareGiver[0].username
                }`
              : "None"
          }
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
