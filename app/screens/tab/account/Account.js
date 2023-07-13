import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeArea } from "../../../components/layout";
import { useFocusEffect } from "@react-navigation/native";
import {
  Avatar,
  Card,
  IconButton,
  List,
  useTheme,
  Button,
  Text,
} from "react-native-paper";
import { useUser } from "../../../api";
import { Alert } from "react-native";
import Dialog from "../../../components/dialog/Dialog";
import routes from "../../../navigation/routes";
import { CardTitle } from "../../../components/common";

const Account = ({ navigation }) => {
  const { getUser, logout } = useUser();
  const { colors } = useTheme();
  const [user, setUser] = useState(null);
  useFocusEffect(
    useCallback(() => {
      handleFetchUser();
    }, [])
  );
  const [showAbout, setShowAbout] = useState(false);
  const handleFetchUser = async () => {
    const response = await getUser();
    if (response.ok) {
      setUser(response.data);
    }
  };
  return (
    <SafeArea>
      {user && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.USER_NAVIGATION, {
              screen: routes.USER_CHANGE_PROFILE_UPDATE_SCREEN,
              params: user,
            })
          }
        >
          <Card.Title
            title={user.username}
            titleVariant="titleLarge"
            left={(props) => <Avatar.Icon icon="account" {...props} />}
            subtitle={user.email}
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            right={(props) => <IconButton {...props} icon="chevron-right" />}
          />
        </TouchableOpacity>
      )}
      <CardTitle
        text="Change Password"
        onPress={() => {
          navigation.navigate(routes.USER_NAVIGATION, {
            screen: routes.USER_CHANGE_PWD_SCREEN,
          });
        }}
        icon="key"
      />
      <CardTitle text="Settings" onPress={() => {}} icon="cogs" />
      <CardTitle
        text="About"
        onPress={() => setShowAbout(true)}
        icon="information-variant"
      />
      <List.Item
        style={[styles.listItem, { backgroundColor: colors.surface }]}
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
      <Dialog
        visible={showAbout}
        title="About DawaDrop"
        onRequestClose={() => setShowAbout(false)}
      >
        <View style={styles.dialog}>
          <List.Item
            title="Version"
            description="2.0"
            left={(props) => <List.Icon {...props} icon="information" />}
          />
          <Text style={{ padding: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Button mode="outlined" onPress={() => setShowAbout(false)}>
            Ok
          </Button>
        </View>
      </Dialog>
    </SafeArea>
  );
};

export default Account;

const styles = StyleSheet.create({
  listItemTitle: {
    fontWeight: "bold",
  },
  listItem: {
    marginBottom: 5,
  },
  dialog: {
    width: 300,
  },
});
