import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeArea } from "../../components/layout";
import { Avatar, Card, FAB, useTheme } from "react-native-paper";
import { useOrder, usePatient } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import routes from "../../navigation/routes";
import moment from "moment";

const Orders = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { getOrders } = usePatient();
  const { getDeliveryModes } = useOrder();
  const [modes, setModes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    const response = await getOrders();
    const dResp = await getDeliveryModes();
    setLoading(false);
    if (response.ok) {
      setOrders(response.data.results);
    }
    if (dResp.ok) {
      setModes(dResp.data.results);
    }
  };
  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  return (
    <SafeArea>
      <FlatList
        data={orders}
        refreshing={loading}
        onRefresh={handleFetch}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => {
          const { _id, created, drug } = item;
          return (
            <Card.Title
              title={drug}
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              left={(props) => <Avatar.Icon {...props} icon="cart" />}
              subtitle={`${moment(created).format(
                "Do dddd MMM YYYY hh:mm"
              )} hrs`}
              subtitleStyle={{ color: colors.disabled }}
            />
          );
        }}
      />
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.secondary }]}
        color={colors.surface}
        label="Order Now"
        onPress={() => {
          navigation.navigate(routes.ORDERS_NAVIGATION, {
            screen: routes.ORDERS_PATIENT_ORDER_FORM_SCREEN,
            params: { modes },
          });
        }}
      />
    </SafeArea>
  );
};

export default Orders;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  listItem: {
    marginBottom: 10,
  },
});
