import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CardTitle } from "../../components/common";
import { useTheme, FAB, Portal } from "react-native-paper";
import moment from "moment/moment";
import QRCodeStyled from "react-native-qrcode-styled";
import { callNumber } from "../../utils/helpers";
import { NestedProvider } from "../../theme";
import routes from "../../navigation/routes";
const DeliveryDetail = ({ navigation, route }) => {
  const theme = useTheme();
  const { colors, roundness } = theme;
  const delivery = route.params;
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <NestedProvider>
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
          text={"Delivery Status"}
          subText={delivery.status}
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
              icon: "google-maps",
              onPress: () => console.log("Pressed add"),
              color: colors.secondary,
            },
            {
              icon: "truck",
              label: "Truck",
              color: colors.secondary,
              onPress: () => {
                navigation.navigate(routes.ORDERS_NAVIGATION, {
                  screen: routes.ORDERS_PROVIDOR_DELIVERY_TRUCK_SCREEN,
                  params: delivery,
                });
              },
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
    paddingHorizontal: 5,
  },
  fab: {
    marginVertical: 3,
  },
});
