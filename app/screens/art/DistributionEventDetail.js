import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useTheme, List, Text } from "react-native-paper";
import moment from "moment/moment";

const DistributionEventDetail = ({ navigation, route }) => {
  const { event } = route.params;
  const {
    title,
    distributionTime,
    distributionLocation,
    group,
    leadUser: _leadUser,
    artModel: _artModel,
    subscribers,
    remarks,
  } = event;
  const user = _leadUser[0];
  const artModel = _artModel[0];
  const { colors, roundness } = useTheme();
  return (
    <ScrollView>
      <Text style={styles.title} variant="titleMedium">
        Event Information
      </Text>
      <List.Item
        title="Title"
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        description={title}
        left={(props) => <List.Icon {...props} icon="calendar" />}
      />
      <List.Item
        title="Event Time"
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        description={moment(distributionTime).format("ddd Do MMMM yyyy")}
        left={(props) => <List.Icon {...props} icon="clock" />}
      />
      <List.Item
        title="Group"
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        description={group.title}
        left={(props) => <List.Icon {...props} icon="account-group-outline" />}
      />
      <List.Item
        title="Event venue"
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        description={
          distributionLocation.address
            ? distributionLocation.address
            : `(${distributionLocation.latitude} ${distributionLocation.longitude})`
        }
        left={(props) => <List.Icon {...props} icon="google-maps" />}
      />
      <List.Item
        title="Remarks"
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        description={remarks ? remarks : "None"}
        descriptionNumberOfLines={3}
        left={(props) => <List.Icon {...props} icon="information" />}
      />
      {user && (
        <>
          <Text style={styles.title} variant="titleMedium">
            Lead Information
          </Text>
          <List.Item
            title="Name"
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={
              user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : `${user.username}`
            }
            left={(props) => <List.Icon {...props} icon="account" />}
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
            title="Total Subscribers"
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={subscribers.length}
            left={(props) => <List.Icon {...props} icon="account-group" />}
          />
        </>
      )}
    </ScrollView>
  );
};

export default DistributionEventDetail;

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 2,
  },
  title: {
    paddingHorizontal: 10,
  },
});
