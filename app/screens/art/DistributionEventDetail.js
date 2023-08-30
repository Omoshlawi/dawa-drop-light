import { StyleSheet, ScrollView, View, Alert } from "react-native";
import React, { useState } from "react";
import { useTheme, List, Text, Avatar, Portal, FAB } from "react-native-paper";
import moment from "moment/moment";
import { getImageUrl } from "../../utils/helpers";
import { NestedProvider } from "../../theme";
import routes from "../../navigation/routes";
import { useART, useUser } from "../../api";
import { AlertDialog, Dialog } from "../../components/dialog";
const DistributionEventDetail = ({ navigation, route }) => {
  const { event, groups } = route.params;
  const { confirmDistributionEventAttendance } = useART();
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
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    mode: "form",
    message: "",
  });
  const hideConfirmAttendance =
    user?._id === userId || // 1.hide if curr user is the leader
    feedBacks[myFeedBackIndex]?.confirmedAttendance === true; // 3.if already confirmed
  const hideRequestHomeDelivery =
    user?._id === userId || // 1.hide if curr user is the leader
    feedBacks[myFeedBackIndex]?.confirmedAttendance === false; // 3.if already requested delivery
  const handleConfirmAttendance = async () => {
    const response = await confirmDistributionEventAttendance(event._id);
    if (response.ok) {
      setDialogInfo({
        ...dialogInfo,
        show: true,
        mode: "success",
        message: response.data.detail,
      });
    } else {
      setDialogInfo({
        ...dialogInfo,
        show: true,
        mode: "error",
        message: response.data.detail
          ? response.data.detail
          : "Unkown error occured",
      });
    }
    console.log(response.data);
  };
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
          <List.Accordion
            title="FeedBacks"
            left={(props) => <List.Icon {...props} icon="account-group" />}
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={`${feedBacks.length}`}
          >
            <List.Item
              title={"Confirmed Attendance"}
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              description={`${
                feedBacks.filter((fb) => fb.confirmedAttendance).length
              }`}
              left={(props) => <List.Icon {...props} icon="account" />}
            />
            <List.Item
              title={"Requested Home deliveries"}
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              description={`${
                feedBacks.filter((fb) => !fb.confirmedAttendance).length
              }`}
              left={(props) => <List.Icon {...props} icon="account" />}
            />
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
                visible: user?._id === userId,
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
                visible: true,
                icon: "wechat",
                label: "group chats",
                onPress: () => {},
              },
              {
                visible: !(
                  user?._id === userId || // 1.hide if curr user is the leader
                  feedBacks[myFeedBackIndex]?.confirmedAttendance === true
                ), // 3.if already confirmed,
                icon: "check-all",
                label: "Confirm Attendance",
                onPress: () => {
                  //sumbit form
                  Alert.alert(
                    "Confirmation",
                    "Are you sure you want to confirm you attendance now for the event?",
                    [
                      { text: "Confirm", onPress: handleConfirmAttendance },
                      { text: "Cancel" },
                    ]
                  );
                },
              },

              {
                visible: !(
                  user?._id === userId || // 1.hide if curr user is the leader
                  feedBacks[myFeedBackIndex]?.confirmedAttendance === false
                ), // 3.if already requested delivery,
                icon: "truck-delivery",
                label: "Request home Delivery",
                onPress: () => {
                  //sumbit form
                  navigation.navigate(routes.ORDERS_NAVIGATION, {
                    screen: routes.ORDERS_PATIENT_ORDER_FORM_SCREEN,
                    params: {
                      event,
                      type: "self",
                      careReceiverAppointments: [],
                      myAppointments: [],
                    },
                  });
                },
              },
            ].filter((action) => action.visible)}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </NestedProvider>
      <Dialog visible={dialogInfo.show}>
        {(dialogInfo.mode === "success" || dialogInfo.mode === "error") && (
          <AlertDialog
            mode={dialogInfo.mode}
            message={dialogInfo.message}
            onButtonPress={() => {
              setDialogInfo({ ...dialogInfo, show: false });
              navigation.goBack();
            }}
          />
        )}
      </Dialog>
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
