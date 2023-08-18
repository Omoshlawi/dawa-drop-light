import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { FAB, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";
import { useOrder, useUser } from "../../api";
import { useFocusEffect } from "@react-navigation/native";

const CareReceiverOrders = ({ navigation }) => {
  const { colors, roundness } = useTheme();

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
    const dResp = await getDeliveryModes();
    const tResp = await getDeliveryTimeSlots();
    const mResp = await getDeliveryMethods();
    const sResp = await getTreatmentSurport({
      canPickUpDrugs: true,
      onlyCareGiver: true,
    });
    setLoading(false);
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

  return (
    <View style={styles.screen}>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.secondary }]}
        color={colors.surface}
        label="New Order"
        onPress={() => {
          navigation.navigate(routes.ORDERS_NAVIGATION, {
            screen: routes.ORDERS_ORDER_FOR_ANOTHER_FORM_SCREEN,
            params: {},
          });
        }}
      />
    </View>
  );
};

export default CareReceiverOrders;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
