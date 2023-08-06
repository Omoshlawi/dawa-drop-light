import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeArea } from "../../components/layout";
import { CardTitle } from "../../components/common";
import {
  ActivityIndicator,
  useTheme,
  Text,
  Portal,
  FAB,
} from "react-native-paper";
import moment from "moment/moment";
import QRCodeStyled from "react-native-qrcode-styled";
import { screenWidth } from "../../utils/contants";
import Logo from "../../components/Logo";
import { NestedProvider } from "../../theme";
import { callNumber } from "../../utils/helpers";
import { Dialog } from "../../components/dialog";

const OrderDetail = ({ navigation, route }) => {
  const { modes, timeSlots, methods, order } = route.params;
  const { colors, roundness } = useTheme();
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });

  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    mode: "qr",
    message: "",
  });
  const { open } = state;

  return (
    <NestedProvider>
      <ScrollView style={styles.screen}>
        <View style={[styles.order, { bordderRadius: roundness }]}>
          <Logo size={screenWidth * 0.5} />
          <Text variant="headlineLarge">Order Detail</Text>
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
                  message: order._id,
                }),
              color: colors.secondary,
            },
            {
              icon: "account",
              onPress: () =>
                setDialogInfo({
                  ...dialogInfo,
                  show: true,
                  message: order.patient._id,
                }),
              color: colors.secondary,
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
