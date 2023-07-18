import { FlatList, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SafeArea } from "../../components/layout";
import {
  Avatar,
  List,
  Switch,
  Text,
  FAB,
  useTheme,
  Button,
} from "react-native-paper";
import { getImageUrl } from "../../utils/helpers";
import { screenWidth } from "../../utils/contants";
import { useAuthorize } from "../../api";
import { Dialog, getDialogIcon } from "../../components/dialog";

const UserRoleAssignmentForm = ({ navigation, route }) => {
  const { asignUserRoles } = useAuthorize();
  const [loading, setLoading] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Roles assigned Successfully!",
    success: true,
  });
  const {
    user: {
      image,
      username,
      email,
      phoneNumber,
      firstName,
      lastName,
      roles: userRoles,
      _id: userId,
    },
    roles,
  } = route.params;
  const fullName = firstName ? `(${firstName} ${lastName})` : "";
  const [assignedRoles, setAssignedRoles] = useState(
    userRoles ? userRoles : []
  );
  const { colors } = useTheme();

  const handleSubmitt = async () => {
    setLoading(true);
    const response = await asignUserRoles(userId, { roles: assignedRoles });
    setLoading(false);
    if (response.ok) {
      setDialogInfo({ ...dialogInfo, show: response.ok, success: response.ok });
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
      } else {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          success: false,
          message: response.data.detail
            ? response.data.detail
            : "Unknow Error Occured",
        });
        console.log(response.data);
      }
    }
  };

  return (
    <SafeArea style={styles.screen}>
      {image ? (
        <Avatar.Image
          source={{ uri: getImageUrl(image) }}
          size={screenWidth * 0.25}
        />
      ) : (
        <Avatar.Icon icon="account" />
      )}
      <View>
        <Text style={styles.text}>{`${username}${fullName}`}</Text>
        <Text style={styles.text}>{email}</Text>
        <Text style={styles.text}>{phoneNumber}</Text>
      </View>
      <View style={styles.roles}>
        <FlatList
          data={roles}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => {
            const { _id, name, description, privileges, menuOptions } = item;
            return (
              <View>
                <View style={styles.section}>
                  <Text variant="titleMedium">{`${name} Role`}</Text>
                  <Switch
                    value={assignedRoles.includes(_id)}
                    onValueChange={() => {
                      if (assignedRoles.includes(_id)) {
                        // remove
                        setAssignedRoles(
                          assignedRoles.filter((id) => id !== _id)
                        );
                      } else {
                        // add
                        setAssignedRoles([...assignedRoles, _id]);
                      }
                    }}
                  />
                </View>
                <List.Accordion
                  title={`${name} privileges`}
                  left={(props) => (
                    <List.Icon {...props} icon="shield-lock-outline" />
                  )}
                >
                  {privileges.map(({ name, description }, index) => (
                    <List.Item
                      title={name}
                      description={description}
                      key={index}
                    />
                  ))}
                </List.Accordion>
                <List.Accordion
                  title={`${name} Menu Options`}
                  left={(props) => <List.Icon {...props} icon="apps" />}
                >
                  {menuOptions.map(({ label, image, description }, index) => (
                    <List.Item
                      title={label}
                      description={description}
                      key={index}
                    />
                  ))}
                </List.Accordion>
              </View>
            );
          }}
        />
      </View>
      <FAB
        icon="content-save"
        style={[styles.fab, { backgroundColor: colors.secondary }]}
        label="Save"
        color={colors.surface}
        onPress={handleSubmitt}
      />
      <Dialog
        visible={dialogInfo.show}
        title={dialogInfo.success ? "Success!" : "Failure!"}
      >
        <View style={styles.dialog}>
          <Image
            style={styles.img}
            source={getDialogIcon(dialogInfo.success ? "success" : "error")}
          />
          <Text style={styles.text}>{dialogInfo.message}</Text>
          <Button
            mode="outlined"
            onPress={() => {
              setDialogInfo({ ...dialogInfo, show: false });
              if (dialogInfo.success) navigation.goBack();
            }}
          >
            Ok
          </Button>
        </View>
      </Dialog>
    </SafeArea>
  );
};

export default UserRoleAssignmentForm;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
  roles: {
    flex: 1,
    width: "100%",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  dialog: {
    width: screenWidth * 0.75,
  },
  img: {
    alignSelf: "center",
    width: 100,
    height: 100,
  },
  text: {
    textAlign: "center",
    padding: 10,
  },
  btn: {
    marginVertical: 20,
  },
});
