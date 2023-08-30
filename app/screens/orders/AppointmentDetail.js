import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Button, List, useTheme } from "react-native-paper";
import moment from "moment/moment";
import Logo from "../../components/Logo";
import { screenWidth } from "../../utils/contants";
import routes from "../../navigation/routes";

const AppointmentDetail = ({ route, navigation }) => {
  const {
    appointment: index,
    patient,
    careReceivers,
    type,
    myAppointments,
    careReceiverAppointments,
  } = route.params;
  const appointment =
    type === "self" ? myAppointments[index] : careReceiverAppointments[index];
  const {
    appointment_type,
    appointment_date,
    date_attended,
    appointment: apt_date,
    next_appointment_date,
  } = appointment;
  const { colors, roundness } = useTheme();
  return (
    <ScrollView style={styles.screen}>
      <View style={{ alignItems: "center" }}>
        <Logo size={screenWidth * 0.35} />
      </View>
      <Text style={styles.title} variant="titleMedium">
        Patient Details
      </Text>
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        title="Name"
        description={`${patient.firstName} ${patient.lastName}`}
        left={(props) => <List.Icon {...props} icon="account" />}
      />
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        title="CCC Number"
        description={`${patient.cccNumber} `}
        left={(props) => <List.Icon {...props} icon="identifier" />}
      />
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        title="Is patient Established ?"
        description={patient.stable ? "Yes" : "No"}
        left={(props) => <List.Icon {...props} icon="identifier" />}
      />
      <Text style={styles.title} variant="titleMedium">
        Appointment Details
      </Text>
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        title="Appointment Type"
        description={`${appointment_type}`}
        left={(props) => <List.Icon {...props} icon="calendar" />}
      />
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        title="Appointment Date"
        description={moment(apt_date).format("dddd Do MMMM yyyy")}
        left={(props) => <List.Icon {...props} icon="calendar" />}
      />
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        title="Next Appointment Date"
        description={moment(next_appointment_date).format("dddd Do MMMM yyyy")}
        left={(props) => <List.Icon {...props} icon="calendar" />}
      />
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        title="Rescheduled ?"
        description={"No"}
        left={(props) => <List.Icon {...props} icon="calendar" />}
      />
      {appointment_type === "Re-Fill" && (
        <>
          {patient && (
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              title="Current Distribution model"
              description={patient.artModel.name}
              left={(props) => <List.Icon {...props} icon="calendar" />}
            />
          )}
          {patient && patient.artModel.modelCode === "fast_track" && (
            <Button
              style={styles.btn}
              mode="contained"
              onPress={() => {
                navigation.navigate(routes.ORDERS_NAVIGATION, {
                  screen: routes.ORDERS_PATIENT_ORDER_FORM_SCREEN,
                  params: { appointment, type, careReceivers, careReceiverAppointments, myAppointments },
                });
              }}
            >
              Request Delivery Service
            </Button>
          )}
        </>
      )}
      {/* <Button style={styles.btn} mode="contained">
        Reschedule appointment
      </Button> */}
    </ScrollView>
  );
};

export default AppointmentDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listItem: {
    marginVertical: 2,
  },
  title: {
    paddingHorizontal: 10,
  },
  btn: {
    margin: 5,
  },
});
