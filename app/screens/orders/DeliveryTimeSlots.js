import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { useOrder } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { SafeArea } from "../../components/layout";
import { FlatList } from "react-native";
import { Avatar, Card, FAB, List, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";
import { getImageUrl } from "../../utils/helpers";
import moment from "moment/moment";

const DeliveryTimeSlots = ({ navigation }) => {
  const { getDeliveryTimeSlots } = useOrder();
  const [menuOptions, setMenuOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  useFocusEffect(
    useCallback(() => {
      handleFetchTimeSlots();
    }, [])
  );

  const handleFetchTimeSlots = async () => {
    setLoading(true);
    const response = await getDeliveryTimeSlots();
    setLoading(false);

    if (response.ok) {
      setMenuOptions(response.data.results);
    }
  };
  return (
    <SafeArea>
      <FlatList
        refreshing={loading}
        onRefresh={handleFetchTimeSlots}
        data={menuOptions}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => {
          const { label, startTime, endTime, capacity } = item;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.ORDERS_NAVIGATION, {
                  screen: routes.ORDERS_DELIVERY_TIMESLOTES_FORM_SCREEN,
                  params: item,
                })
              }
            >
              <Card.Title
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title={label}
                titleVariant="headlineSmall"
                subtitle={`Between ${moment(startTime).format(
                  "HH:mm"
                )} to ${moment(endTime).format("HH:mm")} Hrs`}
                subtitleVariant="bodyLarge"
                subtitleNumberOfLines={3}
                subtitleStyle={{ color: colors.disabled }}
                left={(props) => (
                  <Avatar.Icon icon="timer-sand-complete" {...props} />
                )}
                right={(props) => (
                  <Text
                    style={{
                      backgroundColor: colors.primary,
                      padding: 5,
                      borderRadius: 20,
                      color: colors.surface,
                    }}
                  >
                    {capacity}
                  </Text>
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
          navigation.navigate(routes.ORDERS_NAVIGATION, {
            screen: routes.ORDERS_DELIVERY_TIMESLOTES_FORM_SCREEN,
          })
        }
        color={colors.surface}
      />
    </SafeArea>
  );
};

export default DeliveryTimeSlots;

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
