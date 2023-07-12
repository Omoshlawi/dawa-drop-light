import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeArea } from "../../../components/layout";
import jwtDecode from "jwt-decode";
import { useUserContext } from "../../../context/hooks";
import { useFocusEffect } from "@react-navigation/native";
import { Card, List, useTheme } from "react-native-paper";
import { useAuth, useUser } from "../../../api";
import { Alert } from "react-native";

const Account = () => {
  const { getUser, logout } = useUser();
  const { colors } = useTheme();
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
  return (
    <SafeArea>
      {user && <Card.Title title={user.username} />}
      <List.Item
        style={{ backgroundColor: colors.surface }}
        title="Logout"
        titleStyle={styles.listItemTitle}
        left={(props) => <List.Icon {...props} icon="logout" />}
        onPress={() =>
          Alert.alert("Confirmation", "Are you sure you wanto to logou?", [
            { text: "Cancel" },
            { text: "Logout", onPress: logout },
          ])
        }
      />
    </SafeArea>
  );
};

export default Account;

const styles = StyleSheet.create({
  listItemTitle: {
    fontWeight: "bold",
  },
});
