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
import { useOrder, useProvidor } from "../../api";
import { AlertDialog, Dialog } from "../../components/dialog";
import Logo from "../../components/Logo";
import { screenWidth } from "../../utils/contants";
import { useLocation } from "../../components/map";
import { AcceptDeliveryTaskForm } from "../../components/order";
import { CodeDisplayCopy } from "../../components/scanner";
const DeliveryDetail = ({ navigation, route }) => {
  const theme = useTheme();
  const { colors, roundness } = theme;
  const _delivery = route.params;
  const [state, setState] = useState({ open: false });
  const [delivery, setDelivery] = useState(_delivery);
  const onStateChange = ({ open }) => setState({ open });
  const { getDelivery } = useOrder();
  const { updateDelivery } = useProvidor();
  const handleFetch = async () => {
    const response = await getDelivery(_delivery._id);
    if (response.ok) {
      setDelivery(response.data);
    }
  };
  const [loading, setLoading] = useState(false);

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
  const handleDeliveryJobUpdate = async (values, { setFieldError }) => {
    setLoading(true);
    const response = await updateDelivery(_delivery._id, values);
    setLoading(false);
    if (response.ok) {
      setDialogInfo({
        ...dialogInfo,
        show: true,
        mode: "success",
        message: "The delivery task has been Updated Successfully!",
      });
      await handleFetch();
    } else if (response.status === 400) {
      setDialogInfo({
        ...dialogInfo,
        show: true,
        mode: "error",
        message: JSON.stringify(response.data),
      });
      console.log(response.data);
    } else {
      setDialogInfo({
        ...dialogInfo,
        show: true,
        mode: "error",
        message: response.data.detail
          ? response.data.detail
          : "Unknow Error Occured",
      });
      console.log(response.data);
    }
  };
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
                  mode: "qr",
                  message: delivery.order._id,
                }),
              color: colors.secondary,
            },
            {
              icon: "square-edit-outline",
              label: "Edit",
              color:
                Boolean(delivery.status) && delivery.status === "pending"
                  ? colors.secondary
                  : colors.disabled,
              labelTextColor:
                Boolean(delivery.status) && delivery.status === "pending"
                  ? colors.secondary
                  : colors.disabled,
              onPress: () => {
                // navigation.navigate(routes.ORDERS_NAVIGATION, {
                //   screen: routes.ORDERS_PROVIDOR_DELIVERY_TRUCK_SCREEN,
                //   params: delivery,
                // });
                if (Boolean(delivery.status) && delivery.status === "pending") {
                  setDialogInfo({ ...dialogInfo, show: true, mode: "form" });
                }
              },
            },
            {
              label: "Patient",
              icon: "account",
              onPress: () =>
                setDialogInfo({
                  ...dialogInfo,
                  show: true,
                  mode: "qr",
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
                  mode: "qr",
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
        {dialogInfo.mode === "form" && (
          <AcceptDeliveryTaskForm
            loading={loading}
            onSubmit={handleDeliveryJobUpdate}
            defaultValues={{
              order: delivery.order._id,
              location:
                location || pickX(delivery.location, ["latitude", "longitude"]),
              deliveredBy: delivery.deliveredBy._id,
              streamUrl: delivery.streamUrl,
            }}
          />
        )}
        {dialogInfo.mode === "qr" && (
          <CodeDisplayCopy message={dialogInfo.message} />
        )}
        {(dialogInfo.mode === "success" || dialogInfo.mode === "error") && (
          <AlertDialog
            mode={dialogInfo.mode}
            message={dialogInfo.message}
            onButtonPress={() => setDialogInfo({ ...dialogInfo, show: false })}
          />
        )}
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
