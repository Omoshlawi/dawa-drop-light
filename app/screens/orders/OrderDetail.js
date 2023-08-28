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
import { callNumber, getOrderStatus, getStreamUrl } from "../../utils/helpers";
import { Dialog } from "../../components/dialog";
import { Linking } from "react-native";
import { CodeDisplayCopy } from "../../components/scanner";

const OrderDetail = ({ navigation, route }) => {
  const { modes, timeSlots, methods, order, userId } = route.params;
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
    <>
      <ScrollView style={styles.screen}>
        <View style={[styles.order, { bordderRadius: roundness }]}>
          <Logo size={screenWidth * 0.5} />
          <Text variant="headlineLarge">Order Detail</Text>
        </View>
        <CardTitle text="Order id" subText={order._id} icon="cart" />
        {order.patient.length > 0 && order.patient[0].user !== userId && (
          <CardTitle
            text={"Ordered for ?"}
            subText={`${order.patient[0].firstName} ${order.patient[0].lastName}`}
            icon="account"
          />
        )}
        <CardTitle
          text={"Date Ordered"}
          subText={moment(order.created).format("dddd Do MMMM yyy hh:mm")}
          icon="clock"
        />

        <CardTitle
          text={"Phone number"}
          subText={order.phoneNumber}
          icon="phone"
        />
        {order.appointment && (
          <CardTitle
            text={`${order.appointment.appointment_type} Appointment`}
            subText={`${moment(order.appointment.appointment_date).format(
              "Do ddd MMM yyyy"
            )}`}
            icon="calendar"
          />
        )}
        {order.event && (
          <CardTitle
            text={order.event.title}
            subText={`${moment(order.event.distributionDate).format(
              "Do ddd MMM yyyy"
            )}`}
            icon="calendar"
          />
        )}
        <CardTitle
          text={"Delivery Preference"}
          subText={order.deliveryMethod.name}
          icon="truck"
        />
        {order.deliveryPerson && (
          <>
            <CardTitle
              text={"Who will deliver the drugs?"}
              subText={`${order.deliveryPerson.fullName} (${order.deliveryPerson.phoneNumber})`}
              icon="account"
            />
            <CardTitle
              text={"Pick up time?"}
              subText={`${moment(order.deliveryPerson.pickUpTime).format(
                "HH:mm"
              )} hrs`}
              icon="account"
            />
          </>
        )}
        <CardTitle
          text={"Adress"}
          subText={`${order.deliveryAddress.address}`}
          icon="google-maps"
        />

        {order.courrierService && (
          <CardTitle
            text={"Courrier service"}
            subText={order.courrierService.name}
            icon="bicycle"
          />
        )}
      </ScrollView>
      <Dialog
        visible={dialogInfo.show}
        swipable
        onRequestClose={() => setDialogInfo({ ...dialogInfo, show: false })}
      >
        {dialogInfo.mode === "qr" && (
          <CodeDisplayCopy message={dialogInfo.message} />
        )}
      </Dialog>
    </>
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
