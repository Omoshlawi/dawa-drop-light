import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useART } from "../../api";
import { NestedProvider } from "../../theme";
import { FAB, Portal, useTheme, Text, List, Avatar } from "react-native-paper";
import routes from "../../navigation/routes";
import { ScrollView } from "react-native";
import { getImageUrl } from "../../utils/helpers";
const ARTGroupDetail = ({ navigation, route }) => {
  const group = route.params;
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const { colors, roundness } = useTheme();
  const {
    title,
    description,
    leadUser: _leadUser,
    artModel: _artModel,
    enrolledUsers,
  } = group;
  const artModel = _artModel[0];
  const user = _leadUser[0];
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
                label: "Edit Group",
                // color: true ? colors.secondary : colors.disabled,
                // labelTextColor: true ? colors.secondary : colors.disabled,
                onPress: () => {
                  navigation.navigate(routes.ART_NAVIGATION, {
                    screen: routes.ART_GROUPS_FORM_SCREEN,
                    params: group,
                  });
                },
              },
              {
                icon: "account-plus",
                label: "Add new member",
                // color: true ? colors.secondary : colors.disabled,
                // labelTextColor: true ? colors.secondary : colors.disabled,
                onPress: () => {
                  navigation.navigate(routes.ART_NAVIGATION, {
                    screen: routes.ART_GROUP_ADD_NEW_MEMBER_FORM_SCREEN,
                    params: group,
                  });
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
