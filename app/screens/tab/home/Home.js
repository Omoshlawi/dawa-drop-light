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
import { useAuthorize, usePatient, useUser } from "../../../api";
import { useFocusEffect } from "@react-navigation/native";
import { ServiceCard } from "../../../components/common";
import HomeAdvert from "../../../components/HomeAdvert";
import AppointmentCard from "../../../components/AppointmentCard";
import { TouchableOpacity } from "react-native";
import routes from "../../../navigation/routes";

const Home = ({ navigation }) => {
  const { getUser, getUserId } = useUser();
  const { getUserAuthInfo } = useAuthorize();
  const { getAppointments } = usePatient();
  const { colors, roundness } = useTheme();
  const [suggestProfile, setSuggestProfile] = useState(true);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
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
    const response = await getAppointments();
    if (response.ok) {
      setAppointments(response.data.results);
    } else {
      // if(response.stat)
    }
  };

  const handleFetchAuthInfo = async () => {
    const response = await getUserAuthInfo(getUserId());
    if (response.ok) {
      setRoles(response.data.roles);
    }
  };

  useEffect(() => {
    // if user is normal user with no roles then set suggest to true
    setSuggestProfile(user && !user.isSuperUser && roles.length === 0);
  }, [roles, user]);

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
          {suggestProfile ? (
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
          ) : (
            <>
              {appointments.length > 0 && (
                <Text variant="titleMedium">
                  Recent and Upcoming Appointments
                </Text>
              )}
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={appointments}
                horizontal
                keyExtractor={({ id }) => id}
                renderItem={({ item, index }) => <AppointmentCard {...item} />}
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
