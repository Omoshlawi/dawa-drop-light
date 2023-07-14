import { StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeArea } from "../../../components/layout";
import { IconButton, Text, useTheme } from "react-native-paper";
import { useUser } from "../../../api";
import { useFocusEffect } from "@react-navigation/native";
import { ServiceCard } from "../../../components/common";
import HomeAdvert from "../../../components/HomeAdvert";

const Home = ({ navigation }) => {
  const { getUser } = useUser();
  const { colors, roundness } = useTheme();
  const [user, setUser] = useState(null);
  useFocusEffect(
    useCallback(() => {
      handleFetchUser();
    }, [])
  );
  const handleFetchUser = async () => {
    const response = await getUser();
    if (response.ok) {
      setUser(response.data);
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
          title="Drug Order"
          subTitle="Order drugs and have them delivered to your doorstep"
        />
        <ServiceCard
          image={require("../../../assets/conversation.png")}
          title="Consult your doctor"
          subTitle="Talk to a clinician and get help fast and easy, just by button press"
        />
        <HomeAdvert />
        <Text variant="titleMedium">Recent and Upcoming Appointments</Text>
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
  },
  greetings: {
    marginBottom: 20,
  },
});
