import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeArea } from "../../components/layout";
import { usePatient } from "../../api";
import { CardTitle } from "../../components/common";
import { ActivityIndicator } from "react-native-paper";

const OrderDetail = ({ navigation, route }) => {
  const { modes, timeSlots, methods, order } = route.params;
  const { getAppointment, getOrder } = usePatient();
  const [loading, setLoading] = useState(false);
  const [currOrder, setCurrOrder] = useState(null);

  const fetch = async () => {
    setLoading(true);
    const promises = Promise.all([
      getOrder(order._id),
      getAppointment(order.appointment),
    ]);
    const results = await promises;
    const success = results.every((resp) => resp.ok);
    setLoading(false);
    if (success) {
      setCurrOrder({ ...results[0].data, appointment: results[1].data });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <SafeArea>
      {loading ? (
        <>
          <ActivityIndicator size={80} />
        </>
      ) : (
        <>
          {currOrder && (
            <>
              {console.log(currOrder)}
              <CardTitle icon="cart" text="Order Id" subText={currOrder._id} />
              <CardTitle icon="cart" text="Order Id" subText={currOrder._id} />
              <CardTitle icon="cart" text="Order Id" subText={currOrder._id} />
            </>
          )}
        </>
      )}
    </SafeArea>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({});
