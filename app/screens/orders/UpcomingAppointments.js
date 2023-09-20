import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { List, useTheme, Text } from "react-native-paper";
import moment from "moment/moment";
import routes from "../../navigation/routes";
import { useUser } from "../../api";

const UpcomingAppointments = ({ navigation, route }) => {
  const { myAppointments, careReceiverAppointments, type, user } = route.params;
  const appointments =
    type === "self" ? myAppointments : careReceiverAppointments;
  const { colors } = useTheme();
  return (
    <View>
      <FlatList
        data={appointments}
        keyExtractor={({ id }) => id}
        renderItem={({ item, index }) => {
          const {
            appointment_type,
            appointment_date,
            date_attended,
            appointment,
            next_appointment_date,
          } = item;
          return (
            <List.Item
              onPress={() => {
                navigation.navigate(routes.ORDERS_NAVIGATION, {
                  screen: routes.ORDERS_APPOINMENT_DETAIL_SCREEN,
                  params: {
                    appointment: index,
                    myAppointments,
                    careReceiverAppointments,
                    patient:
                      type === "self"
                        ? user.patient[0]
                        : user.careReceivers.find(
                            (receiver) => receiver.cccNumber === item.cccNumber
                          ),
                    careReceivers: user.careReceivers,
                    type,
                  },
                });
              }}
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              title={`${
                type === "self"
                  ? user.patient[0].cccNumber
                  : user.careReceivers.find(
                      (receiver) => receiver.cccNumber === item.cccNumber
                    ).cccNumber
              }'s ${appointment_type} appointrment`}
              description={moment(next_appointment_date).format(
                "dddd Do MMMM yyyy"
              )}
              left={(props) => <List.Icon {...props} icon="calendar-clock" />}
              right={(props) => (
                <View
                  style={{
                    padding: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: colors.error }}>{`${moment(
                    next_appointment_date
                  ).diff(moment(), "days")}`}</Text>
                  <Text>days</Text>
                </View>
              )}
            />
          );
        }}
      />
    </View>
  );
};

export default UpcomingAppointments;

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 2,
  },
});
