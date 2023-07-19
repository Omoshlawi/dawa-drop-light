import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeArea } from "../../components/layout";
import { SearchHeader } from "../../components/input";
import { usePatient } from "../../api";
import { List, useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

const Appointments = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAppointments } = usePatient();
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      handleAppointmentFetch();
    }, [])
  );

  const handleAppointmentFetch = async () => {
    setLoading(true);
    const response = await getAppointments();
    setLoading(false);
    if (response.ok) {
      setAppointments(response.data.results);
    }
  };

  return (
    <SafeArea>
      <FlatList
        data={appointments.reverse()}
        refreshing={loading}
        onRefresh={handleAppointmentFetch}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          const {
            appointment_type,
            date_attended,
            appointment,
            appointment_date,
          } = item;
          return (
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              title={`${appointment_type} appoinment`}
              titleStyle={styles.listTitle}
              description={appointment_date}
              left={(props) => <List.Icon {...props} icon="calendar" />}
            />
          );
        }}
      />
    </SafeArea>
  );
};

export default Appointments;

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 5,
    padding: 10,
  },
  listTitle: {
    fontSize: 20,
  },
});
