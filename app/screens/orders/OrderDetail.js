import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeArea } from "../../components/layout";
import { CardTitle } from "../../components/common";
import { ActivityIndicator } from "react-native-paper";

const OrderDetail = ({ navigation, route }) => {
  const { modes, timeSlots, methods, order } = route.params;
  const [loading, setLoading] = useState(false);
  const [currOrder, setCurrOrder] = useState(null);

  return (
    <SafeArea>
      <CardTitle text="Order id" subText={order._id} icon="cart" />
    </SafeArea>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({});
