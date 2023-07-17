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

const MenuOptionDetail = ({ navigation, route }) => {
  const menuOption = route.params;
  const [roles, setRoles] = useState([]);
  const { getRoles } = useAuthorize();
  const { label, description, link, image } = menuOption;
  const { colors } = useTheme();

  const handleGetRoles = async () => {
    const response = await getRoles({ privilege: menuOption._id });
    if (response.ok) {
      setRoles(response.data.results);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetRoles();
    }, [])
  );

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
            title={label}
            titleVariant="titleLarge"
            subtitle={`Link: ${link}`}
            subtitleStyle={{ color: colors.disabled }}
            left={(props) => (
              <Avatar.Image {...props} source={{ uri: getImageUrl(image) }} />
            )}
          />
          <Card.Content>
            <Text>{description}</Text>
            <List.Section>
              <List.Accordion
                title="Roles With this menu"
                left={(props) => <List.Icon {...props} icon="account-group" />}
              >
                {roles.map(({ _id, name, description }) => (
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
                  screen: routes.PERMISIONS_MENU_OPTION_FORM_SCREEN,
                  params: menuOption,
                })
              }
            >
              Edit
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeArea>
  );
};

export default MenuOptionDetail;

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
