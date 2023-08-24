import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useART, useAuthorize } from "../../api";
import { Avatar, Card, FAB, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const GroupLeads = ({ navigation }) => {
  const { getARTGroupsLeads, getARTModels } = useART();
  const { getUsers } = useAuthorize();
  const [groupLeads, setGroupLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [artModels, setARTModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFetch = async () => {
    setLoading(true);
    const response = await getARTGroupsLeads();
    const userResponse = await getUsers();
    const modelsResponse = await getARTModels();
    setLoading(false);
    if (response.ok) setGroupLeads(response.data.results);
    if (userResponse.ok) setUsers(userResponse.data.results);
    if (modelsResponse.ok) setARTModels(modelsResponse.data.results);
  };

  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  const { colors, roundness } = useTheme();
  return (
    <View style={styles.screen}>
      <FlatList
        data={groupLeads}
        refreshing={loading}
        onRefresh={handleFetch}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => {
          const {
            user: _user,
            artModel: _artModel,
            registeredBy: _registeredBy,
          } = item;
          const user = _user[0];
          const artModel = _artModel[0];
          const registeredBy = _registeredBy[0];
          const title = user
            ? user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.username
            : undefined;
          const description = artModel ? artModel.name : undefined;
          return (
            <TouchableOpacity
              style={{ marginVertical: 2 }}
              onPress={() => {
                navigation.navigate(routes.ART_NAVIGATION, {
                  screen: routes.ART_GROUP_LEAD_DETAIL_SCREEN,
                  params: { artModels, users, artGroupLead: item },
                });
              }}
            >
              <Card.Title
                style={{ backgroundColor: colors.surface }}
                title={title}
                subtitle={description}
                left={(props) => (
                  <Avatar.Icon {...props} icon="account-outline" />
                )}
              />
            </TouchableOpacity>
          );
        }}
      />
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.secondary }]}
        color={colors.onPrimary}
        onPress={() =>
          navigation.navigate(routes.ART_NAVIGATION, {
            screen: routes.ART_GROUP_LEADS_FORM_SCREEN,
            params: { artModels, users },
          })
        }
      />
    </View>
  );
};

export default GroupLeads;

const styles = StyleSheet.create({
  screen: {
    paddingTop: 5,
    flex: 1,
  },
  listItem: {
    marginBottom: 5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
