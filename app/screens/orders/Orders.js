import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeArea } from "../../components/layout";
import { Card, FAB, useTheme } from "react-native-paper";
import { usePatient } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import routes from "../../navigation/routes";

const Orders = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { getOrders } = usePatient();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFetch = async () => {
    const response = await getOrders();
    if (response.ok) {
      setOrders(response.data.results);
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
          const { _id } = item;
          return <Card.Title title={_id} />;
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
});
