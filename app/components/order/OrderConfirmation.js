import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Button, IconButton, List, Text, useTheme } from "react-native-paper";
import { screenHeight, screenWidth } from "../../utils/contants";
import { useFormikContext } from "formik";
import moment from "moment/moment";

const OrderConfirmation = ({
  onSubmit,
  courrierServices = [],
  specific,
  appointment,
  event,
  careReceivers,
}) => {
  const { values, handleSubmit } = useFormikContext();
  const service = courrierServices.find(
    ({ _id }) => _id === values["courrierService"]
  );
  const careReceiver = careReceivers.find(
    ({ _id }) => _id === values["careReceiver"]
  );
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ScrollView>
        <>
          <Text variant="bodyLarge" style={styles.text}>
            Please verify your delivery details
          </Text>
          <List.Item
            style={[styles.listItem, { backgroundColor: colors.background }]}
            title="Request type"
            description={
              values["type"] === "self"
                ? "Request for self"
                : "Request for another"
            }
            left={(props) => <List.Icon icon="cart" {...props} />}
          />
          {values["type"] === "other" && careReceiver && (
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.background }]}
              title="Care Receiver"
              description={`${careReceiver.firstName} ${careReceiver.lastName} (${careReceiver.cccNumber})`}
              left={(props) => <List.Icon icon="account" {...props} />}
            />
          )}
          {appointment && (
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.background }]}
              title={`${appointment.appointment_type} appointment`}
              description={moment(appointment.next_appointment_date).format(
                "dddd Do MMMM yyyy"
              )}
              left={(props) => <List.Icon icon="calendar-clock" {...props} />}
            />
          )}
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
          <List.Item
            style={[styles.listItem, { backgroundColor: colors.background }]}
            title="Delivery preference method"
            description={
              values["deliveryMethod"] === "in-parcel"
                ? "In Parcel"
                : "In Person"
            }
            left={(props) => <List.Icon icon="truck-delivery" {...props} />}
          />

          {values["deliveryMethod"] === "in-parcel" && (
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.background }]}
              title="Courrier service?"
              description={service ? service.name : "None"}
              left={(props) => <List.Icon icon="truck-fast" {...props} />}
            />
          )}
          {(specific === "yes" || values["deliveryMethod"] === "in-person") &&
            values["deliveryPerson"] && (
              <List.Accordion
                title="Delivery Person"
                left={(props) => (
                  <List.Icon icon="account-outline" {...props} />
                )}
                style={[{ backgroundColor: colors.background }]}
                description={`${values["deliveryPerson"].fullName}`}
              >
                <List.Item
                  title="Phone Number?"
                  description={`${values["deliveryPerson"].phoneNumber}`}
                  left={(props) => <List.Icon icon="phone" {...props} />}
                />
                <List.Item
                  title="National Id"
                  description={`${values["deliveryPerson"].nationalId}`}
                  left={(props) => <List.Icon icon="identifier" {...props} />}
                />
                <List.Item
                  title="Pick up time"
                  description={`${moment(
                    values["deliveryPerson"].pickUpTime
                  ).format("HH:mm")} hrs`}
                  left={(props) => <List.Icon icon="account" {...props} />}
                />
              </List.Accordion>
            )}
          <List.Item
            style={[
              styles.listItem,
              { backgroundColor: colors.background, marginTop: 10 },
            ]}
            title="Phone Number"
            description={values["phoneNumber"] ? values["phoneNumber"] : "None"}
            left={(props) => <List.Icon icon="phone" {...props} />}
          />
          <List.Item
            style={[styles.listItem, { backgroundColor: colors.background }]}
            title="Delivery Location"
            description={
              values["deliveryAddress"]
                ? `${values["deliveryAddress"]["address"]}`
                : "None"
            }
            left={(props) => <List.Icon icon="hospital-marker" {...props} />}
          />
        </>
      </ScrollView>
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
    maxHeight: screenHeight * 0.8,
  },
  listItem: {
    marginBottom: 10,
  },
  text: {
    padding: 10,
  },
});
