import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeArea } from "../../../components/layout";
import { IconButton, Text, useTheme } from "react-native-paper";
import { usePatient, useUser } from "../../../api";
import { useFocusEffect } from "@react-navigation/native";
import { ServiceCard } from "../../../components/common";
import HomeAdvert from "../../../components/HomeAdvert";
import AppointmentCard from "../../../components/AppointmentCard";

const Home = ({ navigation }) => {
  const { getUser } = useUser();
  const { getAppointments } = usePatient();
  const { colors, roundness } = useTheme();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  useFocusEffect(
    useCallback(() => {
      handleFetchUser();
      handleFetchAppoitments();
    }, [])
  );
  const handleFetchUser = async () => {
    const response = await getUser();
    if (response.ok) {
      setUser(response.data);
    }
  };
  const handleFetchAppoitments = async () => {
    const response = await getAppointments();
    if (response.ok) {
      setAppointments(response.data.results);
    } else {
      // if(response.stat)
    }
  };

  if (!user) {
    return null;
  }
  return (
    <SafeArea>
      <View style={styles.header}>
        <IconButton icon="menu" onPress={() => {}} />
        <View style={styles.headerRight}>
          <IconButton icon="magnify" onPress={() => {}} />
          <IconButton icon="bell" onPress={() => {}} />
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.greetings}>
          <Text variant="bodyLarge">👋 Hello!</Text>
          <Text variant="headlineLarge">
            {`${user.firstName} ${user.lastName}`}
          </Text>
        </View>
        <Text variant="titleMedium">Services</Text>
        <ServiceCard
          image={require("../../../assets/pills.png")}
          title="Medication Orders"
          subTitle="Order, dispension and delivery of medication to the patient"
        />
        <ServiceCard
          image={require("../../../assets/conversation.png")}
          title="Consult your doctor"
          subTitle="Talk to a clinician and get help fast and easy, just by button press"
        />
        <HomeAdvert />
        <Text variant="titleMedium">Recent and Upcoming Appointments</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={appointments}
          horizontal
          keyExtractor={({ id }) => id}
          renderItem={({ item, index }) => <AppointmentCard {...item} />}
        />
      </View>
    </SafeArea>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  headerRight: {
    flexDirection: "row",
  },
  body: {
    paddingHorizontal: 30,
    flex: 1,
    paddingBottom: 30,
  },
  greetings: {
    marginBottom: 20,
  },
});
