import { StyleSheet, View } from "react-native";
import React from "react";
import { APPOINTMENT_COLORS, screenWidth } from "../utils/contants";
import { useTheme, Text } from "react-native-paper";
import moment from "moment";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import routes from "../navigation/routes";
const AppointmentsSummary = ({
  myAppointments = [],
  careReceiverAppointments = [],
  user,
}) => {
  const { navigate } = useNavigation();
  const data = [
    {
      description: "Your upcoming appointments",
      count: myAppointments.length,
      color: "#00353C",
      onPress: () => {
        navigate(routes.ORDERS_NAVIGATION, {
          screen: routes.ORDERS_UPCOMING_APPOINMENTS_SCREEN,
          params: { appointments: myAppointments, type: "self", user },
        });
      },
    },
    {
      description: "Your care receiver appointments",
      count: careReceiverAppointments.length,
      color: "#5D3715D4",
      onPress: () => {
        navigate(routes.ORDERS_NAVIGATION, {
          screen: routes.ORDERS_UPCOMING_APPOINMENTS_SCREEN,
          params: {
            appointments: careReceiverAppointments,
            type: "other",
            user,
          },
        });
      },
    },
  ];
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          key={index}
          onPress={item.onPress}
          style={[styles.appointmentCard, { backgroundColor: item.color }]}
        >
          <View style={styles.count}>
            <Text style={{ fontWeight: "bold" }} variant="headlineLarge">
              {item.count}
            </Text>
          </View>
          <View style={styles.content}>
            <Text variant="bodyMedium" numberOfLines={3}>
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default AppointmentsSummary;

const styles = StyleSheet.create({
  appointmentCard: {
    margin: 5,
    width: screenWidth * 0.6,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    flex: 1,
    borderRadius: 20,
  },
  count: {
    borderRadius: 10,
    backgroundColor: "green",
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
    alignItems: "center",
  },
});
