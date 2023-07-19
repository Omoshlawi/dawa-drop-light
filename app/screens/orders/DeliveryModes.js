import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useOrder } from "../../api";
import { SafeArea } from "../../components/layout";
import { FlatList } from "react-native";
import { FAB, List, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";

const DeliveryModes = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  const { getDeliveryModes } = useOrder();
  const [deliveryModes, setDeliveryModes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const handleFetch = async () => {
    setLoading(true);
    const response = await getDeliveryModes();
    setLoading(false);
    if (response.ok) {
      setDeliveryModes(response.data.results);
    } else {
      console.log(response.problem, response.data);
    }
  };
  return (
    <SafeArea>
      <FlatList
        refreshing={loading}
        onRefresh={handleFetch}
        data={deliveryModes}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => {
          const { _id, name } = item;
          return (
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              title={name}
              left={(props) => <List.Icon {...props} icon="truck-delivery" />}
              onPress={() => {
                navigation.navigate(routes.ORDERS_NAVIGATION, {
                  screen: routes.ORDERS_DELIVERY_MODES_FORM_SCREEN,
                  params: item,
                });
              }}
            />
          );
        }}
      />
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.secondary }]}
        color={colors.surface}
        onPress={() => {
          navigation.navigate(routes.ORDERS_NAVIGATION, {
            screen: routes.ORDERS_DELIVERY_MODES_FORM_SCREEN,
          });
        }}
      />
    </SafeArea>
  );
};

export default DeliveryModes;

const styles = StyleSheet.create({
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
