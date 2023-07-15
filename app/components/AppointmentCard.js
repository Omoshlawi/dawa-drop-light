import { StyleSheet, View } from "react-native";
import React from "react";
import { APPOINTMENT_COLORS, screenWidth } from "../utils/contants";
import { useTheme, Text } from "react-native-paper";
import moment from "moment";

const AppointmentCard = ({
  appointment_type,
  appointment_date,
  date_attended,
  appointment,
}) => {
  const { roundness, colors } = useTheme();
  const date = moment(appointment);
  return (
    <View
      style={[
        styles.appointmentCard,
        {
          backgroundColor: APPOINTMENT_COLORS[appointment_type]
            ? APPOINTMENT_COLORS[appointment_type]
            : colors.primary,
          borderRadius: roundness + 10,
        },
      ]}
    >
      <View style={styles.date}>
        <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
          {date.format("Do")}
        </Text>
        <Text variant="headlineSmall">{date.format("MMM")}</Text>
      </View>
      <View style={styles.content}>
        <Text variant="bodyLarge" style={{}}>
          12.00 A.M
        </Text>
        <Text variant="headlineSmall" style={{}} >
          {appointment_type} Appointment
        </Text>
        <Text variant="bodyLarge" style={{}}>
          Mbagthi hospital
        </Text>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  appointmentCard: {
    margin: 5,
    width: screenWidth * 0.7,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  date: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF52",
    height: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF52",
    borderRadius: 10,
    marginLeft: 10,
    height: "100%",
    justifyContent: "center",
  },
});
