import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useART, useAuthorize } from "../../api";
import { Avatar, Card, FAB, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const ARTGroups = ({ navigation }) => {
  const { getARTGroups } = useART();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFetch = async () => {
    setLoading(true);
    const response = await getARTGroups();
    setLoading(false);
    if (response.ok) setGroups(response.data.results);
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
        data={groups}
        refreshing={loading}
        onRefresh={handleFetch}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ marginVertical: 2 }}
              onPress={() => {
                navigation.navigate(routes.ART_NAVIGATION, {
                  screen: routes.ART_GROUP_DETAIL_SCREEN,
                  params: item,
                });
              }}
            >
              <Card.Title
                style={{ backgroundColor: colors.surface }}
                title={item.title}
                subtitle={item.description}
                left={(props) => (
                  <Avatar.Icon {...props} icon="account-group" />
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
            screen: routes.ART_GROUPS_FORM_SCREEN,
          })
        }
      />
    </View>
  );
};

export default ARTGroups;

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
