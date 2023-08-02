import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeArea } from "../../components/layout";
import { CardTitle } from "../../components/common";
import { ActivityIndicator, useTheme } from "react-native-paper";
import moment from "moment/moment";
import QRCodeStyled from "react-native-qrcode-styled";
const DeliveryDetail = ({ navigation, route }) => {
  const { colors, roundness } = useTheme();
  const delivery = route.params;
  return (
    <ScrollView style={styles.screen}>
      <View style={[styles.delivery, { bordderRadius: roundness }]}>
        <QRCodeStyled
          data={delivery._id}
          style={{ backgroundColor: "white" }}
          color={colors.primary}
          // pieceBorderRadius={10}
          padding={10}
          pieceSize={8}
        />
      </View>
      <CardTitle text="Delivery id" subText={delivery._id} icon="cart" />
      <CardTitle
        text={"Date accepted"}
        subText={moment(delivery.created).format("dddd Do MMMM yyy hh:mm")}
        icon="clock"
      />
      <CardTitle
        text={"Phone number"}
        subText={delivery.order.phoneNumber}
        icon="phone"
      />
      <CardTitle
        text={"Adress"}
        subText={`${delivery.order.deliveryAddress.address}(${delivery.order.deliveryAddress.latitude},${delivery.order.deliveryAddress.longitude})`}
        icon="google-maps"
      />

      <CardTitle
        text={"Delivere Through"}
        subText={delivery.order.deliveryMode.name}
        icon="bicycle"
      />
      <CardTitle
        text={"Delivery time"}
        subText={delivery.order.deliveryTimeSlot.label}
        icon="timelapse"
      />
    </ScrollView>
  );
};

export default DeliveryDetail;

const styles = StyleSheet.create({
  delivery: {
    padding: 10,
    alignItems: "center",
    overflow: "hidden",
  },
  screen: {
    paddingHorizontal: 5,
  },
});
