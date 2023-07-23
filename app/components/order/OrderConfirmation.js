import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, IconButton, List, Text, useTheme } from "react-native-paper";
import { screenWidth } from "../../utils/contants";
import { useFormikContext } from "formik";

const OrderConfirmation = ({
  deliveryTimeSlots = [],
  deliveryModes = [],
  onSubmit,
}) => {
  const { values, handleSubmit } = useFormikContext();
  const slot = deliveryTimeSlots.find(({ url }) => url === values["time_slot"]);
  const mode = deliveryModes.find(({ _id }) => _id === values["deliveryMode"]);
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.text}>
        Please verify your order details
      </Text>
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.background }]}
        title="Delivery Mode"
        description={mode ? mode.name : "None"}
        left={(props) => <List.Icon icon="truck" {...props} />}
      />
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.background }]}
        title="Time Slot"
        description={slot ? slot.slot : "None"}
        left={(props) => <List.Icon icon="clock" {...props} />}
      />
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
            ? `(${values["deliveryAddress"]["latitude"]}, ${values["deliveryAddress"]["longitude"]})`
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
