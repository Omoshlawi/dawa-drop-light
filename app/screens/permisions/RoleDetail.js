import { StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { Avatar, Text, Card, useTheme, Button, List } from "react-native-paper";
import { SafeArea } from "../../components/layout";
import { ScrollView } from "react-native";
import { getImageUrl } from "../../utils/helpers";
import { getDialogIcon } from "../../components/dialog";
import { screenWidth } from "../../utils/contants";
import { useAuthorize } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import routes from "../../navigation/routes";

const RoleDetail = ({ navigation, route }) => {
  const { role, privileges, menuOptions } = route.params;
  const {
    name,
    description,
    privileges: rolePrivileges,
    menuOptions: roleMenuOptions,
    assignPickupCareGivers,
    assignAllPatients,
    assignGroupLeads,
    assignGroupMembers,
    assignAllUsers,
  } = role;
  const { colors } = useTheme();
  const { getUsers } = useAuthorize();
  const [users, setUsers] = useState([]);

  useFocusEffect(
    useCallback(() => {
      handleGetUser();
    }, [])
  );

  const handleGetUser = async () => {
    const response = await getUsers({ roles: role._id });
    if (response.ok) {
      setUsers(response.data.results);
    }
  };
  return (
    <SafeArea>
      <ScrollView style={[styles.screen]}>
        <Card
          style={{
            backgroundColor: colors.surface,
            marginBottom: 10,
          }}
        >
          <Card.Title
            title={name}
            titleVariant="titleLarge"
            left={(props) => <Avatar.Icon {...props} icon="account-group" />}
          />
          <Card.Content>
            <List.Item
              title="Asigned to all patients?"
              style={{ backgroundColor: colors.background, marginVertical: 2 }}
              description={assignAllPatients ? "Yes" : "No"}
              left={(props) => (
                <List.Icon style={styles.img} {...props} icon={"shield"} />
              )}
            />
            <List.Item
              style={{ backgroundColor: colors.background, marginVertical: 2 }}
              title="Asigned to all pick up care givers?"
              description={assignPickupCareGivers ? "Yes" : "No"}
              left={(props) => (
                <List.Icon style={styles.img} {...props} icon={"shield"} />
              )}
            />
            <List.Item
              style={{ backgroundColor: colors.background, marginVertical: 2 }}
              title="Asigned to all art group leads?"
              description={assignGroupLeads ? "Yes" : "No"}
              left={(props) => (
                <List.Icon style={styles.img} {...props} icon={"shield"} />
              )}
            />
            <List.Item
              style={{ backgroundColor: colors.background, marginVertical: 2 }}
              title="Asigned to all user enroled in distribution group?"
              description={assignGroupMembers ? "Yes" : "No"}
              left={(props) => (
                <List.Icon style={styles.img} {...props} icon={"shield"} />
              )}
            />
            <List.Item
              style={{ backgroundColor: colors.background, marginVertical: 2 }}
              title="Asigned to all user ?"
              description={assignAllUsers ? "Yes" : "No"}
              left={(props) => (
                <List.Icon style={styles.img} {...props} icon={"shield"} />
              )}
            />
            <Text>{description}</Text>
            <List.Section>
              <List.Accordion
                title="Privileges/Permisions"
                left={(props) => <List.Icon {...props} icon="check-decagram" />}
              >
                {rolePrivileges.map(({ _id, name, description }) => (
                  <List.Item
                    title={name}
                    descriptionStyle={{ color: colors.disabled }}
                    key={_id}
                    description={description}
                    left={(props) => (
                      <List.Image
                        style={styles.img}
                        {...props}
                        source={getDialogIcon("success")}
                      />
                    )}
                  />
                ))}
              </List.Accordion>
              <List.Accordion
                title="Menu Options"
                left={(props) => <List.Icon {...props} icon="apps" />}
              >
                {roleMenuOptions.map(
                  ({ _id, label, description, image, link }) => (
                    <List.Item
                      title={label}
                      key={_id}
                      description={description}
                      descriptionStyle={{ color: colors.disabled }}
                      left={(props) => (
                        <List.Image
                          style={styles.img}
                          {...props}
                          source={{ uri: getImageUrl(image) }}
                        />
                      )}
                    />
                  )
                )}
              </List.Accordion>
            </List.Section>
          </Card.Content>

          <Card.Actions>
            <Button icon="trash-can" textColor={colors.error}>
              Delete
            </Button>
            <Button
              icon="square-edit-outline"
              onPress={() =>
                navigation.navigate(routes.PERMISIONS_NAVIGATION, {
                  screen: routes.PERMISIONS_ROLE_FORM_SCREEN,
                  params: { menuOptions, privileges, role },
                })
              }
            >
              Edit
            </Button>
          </Card.Actions>
        </Card>
        <Card
          style={{
            backgroundColor: colors.surface,
          }}
        >
          <Card.Title
            title={`Users Assigned(${users.length})`}
            titleVariant="titleLarge"
            left={(props) => <Avatar.Icon {...props} icon="account-group" />}
          />
          <Card.Content>
            <Text>{description}</Text>
            <List.Section>
              <List.Accordion
                title="Users"
                left={(props) => <List.Icon {...props} icon="apps" />}
              >
                {users.map(
                  ({
                    _id,
                    firstName,
                    lastName,
                    image,
                    phoneNumber,
                    email,
                    username,
                  }) => (
                    <List.Item
                      title={`${username} (${firstName} ${lastName})`}
                      key={_id}
                      description={`${phoneNumber} | ${email}`}
                      descriptionStyle={{ color: colors.disabled }}
                      left={(props) =>
                        image ? (
                          <List.Image
                            style={styles.img}
                            {...props}
                            source={{ uri: getImageUrl(image) }}
                          />
                        ) : (
                          <List.Icon
                            {...props}
                            icon="account"
                            style={styles.img}
                          />
                        )
                      }
                    />
                  )
                )}
              </List.Accordion>
            </List.Section>
          </Card.Content>

          <Card.Actions>
            <Button icon="trash-can" textColor={colors.error}>
              Delete
            </Button>
            <Button icon="square-edit-outline">Edit</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeArea>
  );
};

export default RoleDetail;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1,
  },
  img: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
  },
});
