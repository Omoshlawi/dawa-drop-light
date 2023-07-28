import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeArea } from "../../components/layout";
import { Avatar, Card, FAB, useTheme } from "react-native-paper";
import { useOrder, usePatient } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import routes from "../../navigation/routes";
import moment from "moment";
import { TouchableOpacity } from "react-native";

const Orders = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { getOrders } = usePatient();
  const { getDeliveryModes, getDeliveryTimeSlots, getDeliveryMethods } =
    useOrder();
  const [modes, setModes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);

  const handleFetch = async () => {
    setLoading(true);
    const response = await getOrders();
    const dResp = await getDeliveryModes();
    const tResp = await getDeliveryTimeSlots();
    const mResp = await getDeliveryMethods();
    setLoading(false);
    if (response.ok) {
      setOrders(response.data.results);
    }
    if (dResp.ok) {
      setModes(dResp.data.results);
    }
    if (tResp.ok) {
      setTimeSlots(tResp.data.results);
    }
    if (mResp.ok) {
      setMethods(mResp.data.results);
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.ORDERS_NAVIGATION, {
                  screen: routes.ORDERS_ORDER_DETAIL_SCREEN,
                  params: { modes, timeSlots, methods, order: item },
                })
              }
            >
              <Card.Title
                title={drug}
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                left={(props) => <Avatar.Icon {...props} icon="cart" />}
                subtitle={`${moment(created).format(
                  "Do dddd MMM YYYY hh:mm"
                )} hrs`}
                subtitleStyle={{ color: colors.disabled }}
              />
            </TouchableOpacity>
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
            params: { modes, timeSlots, methods },
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
