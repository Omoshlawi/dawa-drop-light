import { StyleSheet, ScrollView, View, Alert } from "react-native";
import React, { useState } from "react";
import { useTheme, List, Text, Avatar, Portal, FAB } from "react-native-paper";
import moment from "moment/moment";
import { getImageUrl } from "../../utils/helpers";
import { NestedProvider } from "../../theme";
import routes from "../../navigation/routes";
import { useUser } from "../../api";
const DistributionEventDetail = ({ navigation, route }) => {
  const { event, groups } = route.params;
  const {
    title,
    distributionTime,
    distributionLocation,
    group,
    leadUser: _leadUser,
    artModel: _artModel,
    subscribers,
    remarks,
    remiderNortificationDates,
    extraSubscribers,
    feedBacks, //fields =>event,user,confirmedAttendance, deliveryRequest, note
  } = event;
  const user = _leadUser[0];
  const artModel = _artModel[0];
  const { colors, roundness } = useTheme();
  const { getUserId } = useUser();
  const userId = getUserId();
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const myFeedBackIndex = feedBacks.findIndex(
    ({ user: _userId }) => _userId === userId
  );
  const disableConfirmAttendance =
    (user && user._id === userId) || // 1.disable if curr user on the leader
    // myFeedBackIndex !== -1 || // 2.disable if feedback exist
    feedBacks[myFeedBackIndex]?.confirmedAttendance === true; // 3.if already confirmed
  const disablerequestDelivery =
    (user && user._id === userId) || // 1.disable if curr user on the leader
    feedBacks[myFeedBackIndex]?.confirmedAttendance === false; // 3.if already requested delivery
  const handleConfirmAttendance = async () => {};
  return (
    <View style={styles.screen}>
      <NestedProvider>
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
            left={(props) => (
              <List.Icon {...props} icon="account-group-outline" />
            )}
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
          <List.Accordion
            title="Reminder nortification dates"
            left={(props) => <List.Icon {...props} icon="bell" />}
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={`${remiderNortificationDates.length}`}
          >
            {remiderNortificationDates.map((date, index) => {
              return (
                <List.Item
                  key={index}
                  title={moment(date).format("ddd Do MMMM yyyy HH:mm")}
                  style={[
                    styles.listItem,
                    { backgroundColor: colors.surface, marginHorizontal: 10 },
                  ]}
                  // description={`${email} | ${phoneNumber}`}
                  left={(props) => <List.Icon {...props} icon="bell-circle" />}
                />
              );
            })}
          </List.Accordion>
          <List.Accordion
            title="Extra subscribers"
            left={(props) => (
              <List.Icon {...props} icon="account-group-outline" />
            )}
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={`${extraSubscribers.length}`}
          >
            {extraSubscribers.map((user, index) => {
              return (
                <List.Item
                  key={index}
                  title={user.name}
                  style={[
                    styles.listItem,
                    { backgroundColor: colors.surface, marginHorizontal: 10 },
                  ]}
                  description={user.phoneNumber}
                  left={(props) => <List.Icon {...props} icon="account" />}
                />
              );
            })}
          </List.Accordion>
          <List.Accordion
            title="Total Subscribers"
            left={(props) => <List.Icon {...props} icon="account-group" />}
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={`${subscribers.length}`}
          >
            {subscribers.map((user, index) => {
              const {
                username,
                email,
                phoneNumber,
                image,
                lastName,
                firstName,
              } = user;
              return (
                <List.Item
                  key={index}
                  title={
                    firstName && lastName
                      ? `${firstName} ${lastName}`
                      : username
                  }
                  style={[styles.listItem, { backgroundColor: colors.surface }]}
                  description={`${email} | ${phoneNumber}`}
                  left={(props) =>
                    image ? (
                      <Avatar.Image
                        {...props}
                        source={{ uri: getImageUrl(image) }}
                      />
                    ) : (
                      <Avatar.Icon {...props} icon="account" />
                    )
                  }
                />
              );
            })}
          </List.Accordion>
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
                description={user.phoneNumber}
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
            </>
          )}
        </ScrollView>
        <Portal>
          <FAB.Group
            open={open}
            fabStyle={[styles.fab, { backgroundColor: colors.secondary }]}
            color={colors.surface}
            label={open ? "Close" : "Actions"}
            backdropColor={colors.backdrop}
            visible
            icon={open ? "close" : "dots-vertical"}
            actions={[
              {
                icon: "square-edit-outline",
                label: "Edit",

                onPress: () => {
                  // Check if group lead
                  if (user && user._id === userId)
                    navigation.navigate(routes.ART_NAVIGATION, {
                      screen: routes.ART_DISTRIBUTION_EVENTS_FORM_SCREEN,
                      params: { event, groups },
                    });
                },
                color:
                  user && user._id === userId
                    ? colors.secondary
                    : colors.disabled,
                labelTextColor:
                  user && user._id === userId
                    ? colors.secondary
                    : colors.disabled,
              },
              {
                icon: "wechat",
                label: "group chats",
                onPress: () => {},
              },
              {
                icon: "check-all",
                label: "Confirm Attendance",
                color: disableConfirmAttendance
                  ? colors.disabled
                  : colors.secondary,
                labelTextColor: disableConfirmAttendance
                  ? colors.disabled
                  : colors.secondary,
                onPress: () => {
                  if (!disableConfirmAttendance) {
                    //sumbit form
                    Alert.alert(
                      "Confirmation",
                      "Are you sure you want to confirm you attendance now for the event?",
                      [
                        { text: "Confirm", onPress: handleConfirmAttendance },
                        { text: "Cancel" },
                      ]
                    );
                  }
                },
              },

              {
                icon: "truck-delivery",
                label: "Request home Delivery",
                color: disablerequestDelivery
                  ? colors.disabled
                  : colors.secondary,
                labelTextColor: disablerequestDelivery
                  ? colors.disabled
                  : colors.secondary,
                onPress: () => {
                  if (!disablerequestDelivery) {
                    //sumbit form
                    navigation.navigate(routes.ORDERS_NAVIGATION, {
                      screen: routes.ORDERS_PATIENT_ORDER_FORM_SCREEN,
                      params: { event, type: "self" },
                    });
                  }
                },
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </NestedProvider>
    </View>
  );
};

export default DistributionEventDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listItem: {
    marginVertical: 2,
  },
  title: {
    paddingHorizontal: 10,
  },
});
