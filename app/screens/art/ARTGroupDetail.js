import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useART, useUser } from "../../api";
import { NestedProvider } from "../../theme";
import {
  FAB,
  Portal,
  useTheme,
  Text,
  List,
  Avatar,
  TextInput,
  Button,
  HelperText,
} from "react-native-paper";
import routes from "../../navigation/routes";
import { ScrollView } from "react-native";
import { getImageUrl } from "../../utils/helpers";
import { AlertDialog, Dialog } from "../../components/dialog";
const ARTGroupDetail = ({ navigation, route }) => {
  const group = route.params;
  const [state, setState] = useState({ open: false });
  const { getUserId } = useUser();
  const { changeIdentityInGroup } = useART();
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const { colors, roundness } = useTheme();
  const {
    title,
    description,
    leadUser: _leadUser,
    artModel: _artModel,
    enrolledUsers,
    enrollments,
    extraSubscribers,
  } = group;
  const artModel = _artModel[0];
  const user = _leadUser[0];
  const [dialogInfo, setDialogInfo] = useState({
    mode: "form",
    show: false,
    message: "",
  });

  const userId = getUserId();
  const myEnrolment = enrollments.find((en) => en.user === userId);
  const [formState, setFormState] = useState({
    name: myEnrolment?.publicName || "",
    loading: false,
    error: "",
  });
  const handleEnrolmentName = async () => {
    setFormState({ ...formState, error: "" });
    const response = await changeIdentityInGroup(myEnrolment?._id, {
      name: formState.name,
    });
    if (response.ok) {
      setDialogInfo({
        ...dialogInfo,
        show: true,
        mode: "success",
        message: "Name change successfully!",
      });
    } else {
      if (response.status === 400) {
        setFormState({ ...formState, error: response.data.errors.name });
      } else
        setDialogInfo({
          ...dialogInfo,
          show: true,
          mode: "error",
          message: response.data.detail
            ? response.data.detail
            : "Unknown error occured",
        });
    }
  };
  return (
    <View style={styles.screen}>
      <NestedProvider>
        <ScrollView>
          {user && (
            <>
              <Text style={styles.title} variant="titleMedium">
                Leader Information
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
          <Text style={styles.title} variant="titleMedium">
            Group Information
          </Text>
          <List.Item
            title="Title"
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={title}
            left={(props) => (
              <List.Icon {...props} icon="account-group-outline" />
            )}
          />
          <List.Item
            title="Decsription"
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={description}
            descriptionNumberOfLines={3}
            left={(props) => <List.Icon {...props} icon="information" />}
          />
          {artModel && (
            <>
              <List.Item
                title="Model"
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                description={artModel.name}
                left={(props) => (
                  <List.Icon {...props} icon="account-supervisor-outline" />
                )}
              />
            </>
          )}
          <List.Accordion
            title="Total Members"
            left={(props) => <List.Icon {...props} icon="account-group" />}
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={`${enrolledUsers.length}`}
          >
            {enrolledUsers.map((user, index) => {
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
            title="Extra subscribers"
            left={(props) => <List.Icon {...props} icon="account-group" />}
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={`${extraSubscribers.length}`}
          >
            {extraSubscribers.map((user, index) => {
              const { phoneNumber, name } = user;
              return (
                <List.Item
                  key={index}
                  title={name}
                  style={[styles.listItem, { backgroundColor: colors.surface }]}
                  description={phoneNumber}
                  left={(props) => <List.Icon {...props} icon="account" />}
                />
              );
            })}
          </List.Accordion>
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
                label: "Edit Group",
                onPress: () => {
                  navigation.navigate(routes.ART_NAVIGATION, {
                    screen: routes.ART_GROUPS_FORM_SCREEN,
                    params: group,
                  });
                },
              },
              {
                visible: user?._id === userId,
                icon: "account-plus",
                label: "Add new member",
                onPress: () => {
                  navigation.navigate(routes.ART_NAVIGATION, {
                    screen: routes.ART_GROUP_ADD_NEW_MEMBER_FORM_SCREEN,
                    params: group,
                  });
                },
              },
              {
                visible: Boolean(myEnrolment) === true,
                icon: "account-edit",
                label: "Edit my identity in group",
                onPress: () =>
                  setDialogInfo({ ...dialogInfo, show: true, mode: "form" }),
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
      <Dialog
        onRequestClose={() => setDialogInfo({ ...dialogInfo, show: false })}
        visible={dialogInfo.show}
      >
        {dialogInfo.mode === "form" && (
          <View>
            <Text>
              Edit your identity name in group.What other members will see
            </Text>
            <TextInput
              mode="outlined"
              label="Name"
              placeholder="Please enter name"
              value={formState.name}
              onChangeText={(name) => setFormState({ ...formState, name })}
            />
            {formState.error && (
              <HelperText type="error" visible={formState.error}>
                {formState.error}
              </HelperText>
            )}
            <Button
              style={{ marginTop: 10 }}
              mode="contained"
              onPress={handleEnrolmentName}
            >
              Submit
            </Button>
          </View>
        )}
        {(dialogInfo.mode === "success" || dialogInfo.mode === "error") && (
          <AlertDialog
            mode={dialogInfo.mode}
            message={dialogInfo.message}
            onButtonPress={() => {
              setDialogInfo({ ...dialogInfo, show: false });
              if (dialogInfo.mode === "success") {
                navigation.navigate(routes.ART_NAVIGATION, {
                  screen: routes.ART_GROUP_SCREEN,
                });
              }
            }}
          />
        )}
      </Dialog>
    </View>
  );
};

export default ARTGroupDetail;

const styles = StyleSheet.create({
  screen: {
    paddingTop: 5,
    flex: 1,
  },
  listItem: {
    marginVertical: 2,
  },
  title: {
    paddingHorizontal: 10,
  },
  fab: {
    marginVertical: 3,
  },
});
