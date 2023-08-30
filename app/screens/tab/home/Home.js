import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeArea } from "../../../components/layout";
import {
  Avatar,
  Card,
  IconButton,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import { useAuthorize, usePatient, useProvidor, useUser } from "../../../api";
import { useFocusEffect } from "@react-navigation/native";
import { ServiceCard } from "../../../components/common";
import HomeAdvert from "../../../components/HomeAdvert";
import AppointmentCard from "../../../components/AppointmentCard";
import { TouchableOpacity } from "react-native";
import routes from "../../../navigation/routes";
import AppointmentsSummary from "../../../components/AppointmentsSummary";

const Home = ({ navigation }) => {
  const { getUser, getUserId } = useUser();
  const { getUserAuthInfo } = useAuthorize();
  const { getAppointments } = usePatient();
  const { getAllCareReceiversUpcomingAppointments } = useProvidor();
  const { colors, roundness } = useTheme();
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [careReceiverAppointments, setCareReceiverAppointments] = useState([]);
  useFocusEffect(
    useCallback(() => {
      handleFetchUser();
      handleFetchAppoitments();
      handleFetchAuthInfo();
    }, [])
  );
  const handleFetchUser = async () => {
    const response = await getUser();
    if (response.ok) {
      setUser(response.data);
    }
  };
  const handleFetchAppoitments = async () => {
    const response = await getAppointments({ upComing: true });
    const res1 = await getAllCareReceiversUpcomingAppointments();
    if (response.ok) {
      setAppointments(response.data.results);
    } else {
      // if(response.stat)
    }
    if (res1.ok) {
      setCareReceiverAppointments(res1.data.results);
    }
  };

  const handleFetchAuthInfo = async () => {
    const response = await getUserAuthInfo(getUserId());
    if (response.ok) {
      setRoles(response.data.roles);
    }
  };

  if (!user) {
    return null;
  }
  return (
    <SafeArea>
      <ScrollView>
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
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : `${user.username}`}
            </Text>
          </View>
          <Text variant="titleMedium">Services</Text>
          <ServiceCard
            image={require("../../../assets/pills.png")}
            title="Medication home delivery"
            subTitle="Request drug delivery and have them delivered at your door step"
          />
          <ServiceCard
            image={require("../../../assets/conversation.png")}
            title="Appointment"
            subTitle="Track your appointments with ease a get reminder notifications"
          />
          <HomeAdvert />
          {user?.patient?.length === 0 && (
            <TouchableOpacity
              style={{
                backgroundColor: colors.waningLight,
                borderRadius: roundness + 20,
              }}
              onPress={() =>
                navigation.navigate(routes.USER_NAVIGATION, {
                  screen: routes.USER_CREATE_PROFILE_SCREEN,
                })
              }
            >
              <Card.Title
                style={{ padding: 20 }}
                left={(props) => <Avatar.Icon {...props} icon="refresh" />}
                title="Are you a patient user ? Sync you account with you medical account"
                titleNumberOfLines={3}
              />
            </TouchableOpacity>
          )}
          {((careReceiverAppointments.length === 0 &&
            appointments.length > 0) ||
            (careReceiverAppointments.length > 0 &&
              appointments.length === 0)) && (
            <>
              <Text variant="titleMedium">Upcoming Appointments</Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={
                  careReceiverAppointments.length === 0 &&
                  appointments.length > 0
                    ? appointments
                    : careReceiverAppointments
                }
                horizontal
                keyExtractor={({ id }) => id}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(routes.ORDERS_NAVIGATION, {
                        screen: routes.ORDERS_APPOINMENT_DETAIL_SCREEN,
                        params: {
                          appointment: index,
                          patient:
                            careReceiverAppointments.length === 0 &&
                            appointments.length > 0
                              ? user.patient[0]
                              : user.careReceivers.find(
                                  (receiver) =>
                                    receiver.cccNumber === item.cccNumber
                                ),
                          careReceivers: user.careReceivers,
                          type:
                            careReceiverAppointments.length === 0 &&
                            appointments.length > 0
                              ? "self"
                              : "other",
                          myAppointments: appointments,
                          careReceiverAppointments,
                        },
                      });
                    }}
                  >
                    <AppointmentCard {...item} />
                  </TouchableOpacity>
                )}
              />
            </>
          )}
          {careReceiverAppointments.length > 0 && appointments.length > 0 && (
            <>
              <Text variant="titleMedium">Upcoming Appointments</Text>
              <AppointmentsSummary
                careReceiverAppointments={careReceiverAppointments}
                myAppointments={appointments}
                user={user}
              />
            </>
          )}
        </View>
      </ScrollView>
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

/**
                
*/
