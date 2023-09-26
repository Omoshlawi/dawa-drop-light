import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, IconButton, List, Text, useTheme } from "react-native-paper";

import { useFormikContext } from "formik";
import moment from "moment/moment";
import { screenWidth } from "../../../utils/contants";
const ServiceConfirmationDialog = ({
  order,
  event,
  courrierServices = [],
  onSubmit,
}) => {
  const { values, handleSubmit } = useFormikContext();
  const service = courrierServices.find(
    ({ _id }) => _id === values["courrierService"]
  );
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.text}>
        Please verify your delivery details
      </Text>
      {event && (
        <List.Item
          style={[styles.listItem, { backgroundColor: colors.background }]}
          title={event.title}
          description={moment(event.distributionTime).format(
            "dddd Do MMMM yyyy"
          )}
          left={(props) => <List.Icon icon="calendar-clock" {...props} />}
        />
      )}

      {order && (
        <List.Item
          style={[styles.listItem, { backgroundColor: colors.background }]}
          left={(props) => <List.Icon {...props} icon={"cart"} />}
          title={`${moment(order.appointment?.next_appointment_date).format(
            "Do ddd MMM yyyy"
          )}'s ${order.appointment?.appointment_type} Appointment`}
          description={`${moment(order.createdAt).format(
            "Do ddd MMM yyyy"
          )} | ${order.patient[0]?.cccNumber}`}
        />
      )}

      <List.Item
        style={[styles.listItem, { backgroundColor: colors.background }]}
        title="Delivery Type?"
        description={values["deliveryType"]}
        left={(props) => <List.Icon icon="truck-delivery" {...props} />}
      />

      {values["deliveryType"] === "courrier" && (
        <List.Item
          style={[styles.listItem, { backgroundColor: colors.background }]}
          title="Courrier service?"
          description={service ? service.name : "None"}
          left={(props) => <List.Icon icon="truck-fast" {...props} />}
        />
      )}
      {["courrier", "delegate"].includes(values["deliveryType"]) && (
        <>
          {values["deliveryAddress"] && (
            <>
              <List.Item
                style={[
                  styles.listItem,
                  { backgroundColor: colors.background },
                ]}
                title="Delivery Location"
                description={
                  values["deliveryAddress"]
                    ? `${values["deliveryAddress"]["address"]}`
                    : "None"
                }
                left={(props) => (
                  <List.Icon icon="hospital-marker" {...props} />
                )}
              />
            </>
          )}
          {values["deliveryPerson"] && (
            <>
              <Text>Delivery Person details</Text>
              <List.Item
                style={[
                  styles.listItem,
                  { backgroundColor: colors.background },
                ]}
                title="Name"
                description={`${values["deliveryPerson"].fullName}`}
                left={(props) => <List.Icon icon="account" {...props} />}
              />
              <List.Item
                style={[
                  styles.listItem,
                  { backgroundColor: colors.background },
                ]}
                title="Phone number"
                description={`${values["deliveryPerson"].phoneNumber}`}
                left={(props) => <List.Icon icon="phone" {...props} />}
              />
              <List.Item
                style={[
                  styles.listItem,
                  { backgroundColor: colors.background },
                ]}
                title="National Id"
                description={`${values["deliveryPerson"].nationalId}`}
                left={(props) => <List.Icon icon="identifier" {...props} />}
              />
              <List.Item
                style={[
                  styles.listItem,
                  { backgroundColor: colors.background },
                ]}
                title="Time Picked up"
                description={`${moment(
                  values["deliveryPerson"].pickUpTime
                ).format("HH: mm")} hrs`}
                left={(props) => <List.Icon icon="identifier" {...props} />}
              />
            </>
          )}
        </>
      )}
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

export default ServiceConfirmationDialog;

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
