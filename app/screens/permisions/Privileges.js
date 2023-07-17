import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { useAuthorize } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { SafeArea } from "../../components/layout";
import { FlatList } from "react-native";
import { Avatar, Card, FAB, List, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";

const Privileges = ({ navigation }) => {
  const { getPrivileges } = useAuthorize();
  const [privileges, setPrivileges] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  useFocusEffect(
    useCallback(() => {
      handleFetchRoles();
    }, [])
  );

  const handleFetchRoles = async () => {
    setLoading(true);
    const pResponse = await getPrivileges();
    setLoading(false);

    if (pResponse.ok) {
      setPrivileges(pResponse.data.results);
    }
  };
  return (
    <SafeArea>
      <FlatList
        refreshing={loading}
        onRefresh={handleFetchRoles}
        data={privileges}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => {
          const { name, description } = item;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.PERMISIONS_NAVIGATION, {
                  screen: routes.PERMISIONS_PRIVILEGE_DETAIL_SCREEN,
                  params: item,
                })
              }
            >
              <Card.Title
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title={name}
                titleVariant="headlineSmall"
                subtitle={description}
                subtitleVariant="bodyLarge"
                subtitleNumberOfLines={3}
                subtitleStyle={{ color: colors.disabled }}
                left={(props) => (
                  <Avatar.Icon {...props} icon="shield-lock-outline" />
                )}
                right={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="chevron-right"
                    color={colors.primary}
                    style={{ backgroundColor: colors.surface }}
                  />
                )}
              />
            </TouchableOpacity>
          );
        }}
      />
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.secondary }]}
        onPress={() =>
          navigation.navigate(routes.ACTION_NAVIGATION, {
            screen: routes.PERMISIONS_ROLE_FORM_SCREEN,
          })
        }
        color={colors.surface}
      />
    </SafeArea>
  );
};

export default Privileges;

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 5,
    padding: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
