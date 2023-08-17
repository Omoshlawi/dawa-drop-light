import { StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeArea } from "../../components/layout";
import { Avatar, Card, FAB, useTheme, Text } from "react-native-paper";
import { useOrder, usePatient, useUser } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import routes from "../../navigation/routes";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { getOrderStatus } from "../../utils/helpers";
import { SectionList } from "react-native";

const Orders = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { getOrders } = usePatient();
  const { getTreatmentSurport, getUserId } = useUser();
  const { getDeliveryModes, getDeliveryTimeSlots, getDeliveryMethods } =
    useOrder();
  const [modes, setModes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [treatmentSurpoters, seTtreatmentSurpoters] = useState([]);
  const userId = getUserId();
  const handleFetch = async () => {
    setLoading(true);
    const response = await getOrders();
    const dResp = await getDeliveryModes();
    const tResp = await getDeliveryTimeSlots();
    const mResp = await getDeliveryMethods();
    const sResp = await getTreatmentSurport({
      canPickUpDrugs: true,
      onlyCareGiver: true,
    });
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
    if (sResp.ok) {
      seTtreatmentSurpoters(
        sResp.data.results.filter((item) => {
          const { careGiver: careGiver_, careReceiver: careReceiver_ } = item;
          // asociation fully established and user is caregiver
          return careReceiver_ && careGiver_ && careGiver_ !== userId;
        })
      );
    }
  };
  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );

  const ordersToSectionListData = (orders = []) => {
    const onTransit = orders.filter(
      ({ deliveries }) => getOrderStatus(deliveries) === "On Transit"
    );
    const cancelled = orders.filter(
      ({ deliveries }) => getOrderStatus(deliveries) === "Canceled"
    );
    const delivered = orders.filter(
      ({ deliveries }) => getOrderStatus(deliveries) === "Delivered"
    );
    const pending = orders.filter(
      ({ deliveries }) => getOrderStatus(deliveries) === "Pending"
    );
    return [
      {
        title: "Pending Orders",
        data: pending,
      },
      {
        title: "On Transit Orders",
        data: onTransit,
      },
      {
        title: "Cancelled Orders",
        data: cancelled,
      },
      {
        title: "Delivered Orders",
        data: delivered,
      },
    ];
  };
  return (
    <View style={styles.screen}>
      <SectionList
        sections={ordersToSectionListData(orders)}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length ? <Text style={styles.title}>{title}</Text> : null
        }
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
                right={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="chevron-right"
                    color={colors.primary}
                    style={{ backgroundColor: colors.surface }}
                  />
                )}
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
            params: { modes, timeSlots, methods, treatmentSurpoters },
          });
        }}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  screen: {
    paddingTop: 5,
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  listItem: {
    marginBottom: 5,
  },
  title: {
    textTransform: "capitalize",
    padding: 10,
    fontWeight: "bold",
  },
});
