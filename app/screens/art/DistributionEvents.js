import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useART, useAuthorize } from "../../api";
import { Avatar, Card, FAB, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment/moment";
const DistributionEvents = ({ navigation }) => {
  const { getDistrubutionEvents, getARTGroups } = useART();
  const [groups, setGroups] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFetch = async () => {
    setGroups;
    setLoading(true);
    const response = await getDistrubutionEvents();
    const groupResponse = await getARTGroups({});
    setLoading(false);
    if (response.ok) setEvents(response.data.results);
    if (groupResponse.ok) setGroups(groupResponse.data.results);
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
        data={events}
        refreshing={loading}
        onRefresh={handleFetch}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ marginVertical: 2 }}
              onPress={() => {
                navigation.navigate(routes.ART_NAVIGATION, {
                  screen: routes.ART_DISTRIBUTION_EVENTS_DETAIL_SCREEN,
                  params: { event: item, groups },
                });
              }}
            >
              <Card.Title
                style={{ backgroundColor: colors.surface }}
                title={item.title}
                subtitle={moment(item.distributionTime).format(
                  "dddd Do MMMM yyyy"
                )}
                left={(props) => <Avatar.Icon {...props} icon="calendar" />}
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
            screen: routes.ART_DISTRIBUTION_EVENTS_FORM_SCREEN,
            params: { groups },
          })
        }
      />
    </View>
  );
};

export default DistributionEvents;

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
