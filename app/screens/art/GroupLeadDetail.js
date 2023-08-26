import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, List, Text, useTheme } from "react-native-paper";
import { getImageUrl } from "../../utils/helpers";

const GroupLeadDetail = ({ navigation, route }) => {
  const { artGroupLead, artModels, users } = route.params;
  const { colors, roundness } = useTheme();
  const {
    user: _user,
    artModel: _artModel,
    registeredBy: _registeredBy,
    groups,
    members,
  } = artGroupLead;

  const user = _user[0];
  const artModel = _artModel[0];
  const registeredBy = _registeredBy[0];

  return (
    <ScrollView>
      {user && (
        <>
          <Text style={styles.title} variant="titleMedium">
            User Information
          </Text>
          <List.Item
            title="Name"
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={
              user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : `${user.username}`
            }
            left={(props) =>
              user.image ? (
                <Avatar.Image
                  {...props}
                  source={{ uri: getImageUrl(user.image) }}
                />
              ) : (
                <List.Icon {...props} icon="account" />
              )
            }
          />
          <List.Item
            title="Email"
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={user.email}
            left={(props) => <List.Icon {...props} icon="email" />}
          />
          <List.Item
            title="Phone Number"
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={user.email}
            left={(props) => <List.Icon {...props} icon="phone" />}
          />
        </>
      )}
      {artModel && (
        <>
          <Text style={styles.title} variant="titleMedium">
            Art Distribution Model Infomation
          </Text>
          <List.Item
            title="Name"
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={artModel.name}
            left={(props) => (
              <List.Icon {...props} icon="account-supervisor-outline" />
            )}
          />
          <List.Item
            title="Total Members"
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={members.length}
            left={(props) => <List.Icon {...props} icon="account-group" />}
          />
          <List.Item
            title="Total Groups"
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={groups.length}
            left={(props) => (
              <List.Icon {...props} icon="account-group-outline" />
            )}
          />
        </>
      )}
      {registeredBy && <></>}
    </ScrollView>
  );
};

export default GroupLeadDetail;

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 2,
  },
  title: {
    paddingHorizontal: 10,
  },
});
