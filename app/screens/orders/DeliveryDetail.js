import { ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { CardTitle } from "../../components/common";
import { useTheme, FAB, Portal, Text, IconButton } from "react-native-paper";
import moment from "moment/moment";
import QRCodeStyled from "react-native-qrcode-styled";
import {
  callNumber,
  openGoogleMapsDirections,
  pickX,
} from "../../utils/helpers";
import { NestedProvider } from "../../theme";
import routes from "../../navigation/routes";
import { useFocusEffect } from "@react-navigation/native";
import { useOrder } from "../../api";
import { Dialog } from "../../components/dialog";
import Logo from "../../components/Logo";
import { screenWidth } from "../../utils/contants";
import { useLocation } from "../../components/map";
const DeliveryDetail = ({ navigation, route }) => {
  const theme = useTheme();
  const { colors, roundness } = theme;
  const _delivery = route.params;
  const [state, setState] = useState({ open: false });
  const [delivery, setDelivery] = useState(_delivery);
  const onStateChange = ({ open }) => setState({ open });
  const { getDelivery } = useOrder();
  const handleFetch = async () => {
    const response = await getDelivery(_delivery._id);
    if (response.ok) {
      setDelivery(response.data);
    }
  };
  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    mode: "qr",
    message: "",
  });
  const { open } = state;
  const location = useLocation();

  return (
    <NestedProvider>
      <ScrollView style={styles.screen}>
        <View style={[styles.delivery, { bordderRadius: roundness }]}>
          <Logo size={screenWidth * 0.5} />
          <Text variant="headlineLarge">Delivery Detail</Text>
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
          text={"Delivery Status"}
          subText={`${
            !delivery.status
              ? "Pending"
              : delivery.status === "pending"
              ? "On Transit"
              : delivery.status
          }`}
          icon="progress-clock"
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

      <Portal>
        <FAB.Group
          open={open}
          fabStyle={[styles.fab, { backgroundColor: colors.secondary }]}
          color={colors.surface}
          label={open ? "Close" : "Actions"}
          backdropColor={colors.backdrop}
          visible
          icon={open ? "close" : "dots-vertical"}
          actions={[
            {
              icon: "cart",
              onPress: () =>
                setDialogInfo({
                  ...dialogInfo,
                  show: true,
                  message: delivery.order._id,
                }),
              color: colors.secondary,
            },

            {
              icon: "map-marker-distance",
              label: "Truck",
              color: colors.secondary,
              onPress: () => {
                // navigation.navigate(routes.ORDERS_NAVIGATION, {
                //   screen: routes.ORDERS_PROVIDOR_DELIVERY_TRUCK_SCREEN,
                //   params: delivery,
                // });
                console.log(location);
                if (location)
                  openGoogleMapsDirections(
                    location,
                    pickX(delivery.order.deliveryAddress, [
                      "latitude",
                      "longitude",
                    ])
                  );
              },
            },
            {
              label: "Patient",
              icon: "account",
              onPress: () =>
                setDialogInfo({
                  ...dialogInfo,
                  show: true,
                  message: delivery.order.patient,
                }),
              color: colors.secondary,
            },
            {
              icon: "truck-delivery",
              label: "Delivery",
              onPress: () =>
                setDialogInfo({
                  ...dialogInfo,
                  show: true,
                  message: delivery._id,
                }),
              color: colors.secondary,
            },
            {
              icon: "cancel",
              label: "Cancel Delivery",
              color: colors.secondary,
              onPress: () => console.log("Pressed email"),
            },
            {
              icon: "phone-plus-outline",
              label: `Call ${delivery.order.phoneNumber}`,
              color: colors.secondary,
              onPress: () => callNumber(delivery.order.phoneNumber),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
      <Dialog
        visible={dialogInfo.show}
        swipable
        onRequestClose={() => setDialogInfo({ ...dialogInfo, show: false })}
      >
        <View style={[styles.delivery, { bordderRadius: roundness }]}>
          <QRCodeStyled
            data={dialogInfo.message}
            style={{ backgroundColor: "white" }}
            color={colors.primary}
            // pieceBorderRadius={10}
            padding={10}
            pieceSize={8}
          />
          <Text variant="titleMedium">{dialogInfo.message}</Text>
        </View>
      </Dialog>
    </NestedProvider>
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
    // paddingHorizontal: 5,
  },
  fab: {
    marginVertical: 3,
  },
});
