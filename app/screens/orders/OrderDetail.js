import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeArea } from "../../components/layout";
import { CardTitle } from "../../components/common";
import { ActivityIndicator, useTheme } from "react-native-paper";
import moment from "moment/moment";
import { QRGenerator } from "../../components/scanner";
import QRCodeStyled from "react-native-qrcode-styled";

const OrderDetail = ({ navigation, route }) => {
  const { modes, timeSlots, methods, order } = route.params;
  const { colors, roundness } = useTheme();

  return (
    <ScrollView style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.order, { bordderRadius: roundness }]}>
        <QRCodeStyled
          data={order._id}
          style={{ backgroundColor: "white" }}
          color={colors.primary}
          // pieceBorderRadius={10}
          padding={10}
          pieceSize={8}
        />
      </View>
      <CardTitle text="Order id" subText={order._id} icon="cart" />
      <CardTitle
        text={"Date Ordered"}
        subText={moment(order.created).format("dddd Do MMMM yyy hh:mm")}
        icon="clock"
      />
      <CardTitle text={"Drug ordered"} subText={order.drug} icon="pill" />

      <CardTitle
        text={"Phone number"}
        subText={order.phoneNumber}
        icon="phone"
      />
      <CardTitle
        text={`${order.appointment.appointment_type} Appointment`}
        subText={`${order.appointment.appointment_date}`}
        icon="calendar"
      />
      <CardTitle
        text={"Delivery Preference"}
        subText={order.deliveryMethod.name}
        icon="truck"
      />
      <CardTitle
        text={"Adress"}
        subText={`${order.deliveryAddress.address}(${order.deliveryAddress.latitude},${order.deliveryAddress.longitude})`}
        icon="google-maps"
      />

      <CardTitle
        text={"Delivere Through"}
        subText={order.deliveryMode.name}
        icon="bicycle"
      />
      <CardTitle
        text={"Delivery time"}
        subText={order.deliveryTimeSlot.label}
        icon="timelapse"
      />
    </ScrollView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  order: {
    padding: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  screen: {
    paddingHorizontal: 5,
  },
});
