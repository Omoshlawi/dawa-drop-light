import { StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SearchHeader } from "../../components/input";
import { CodeScanner } from "../../components/scanner";
import { useProvidor } from "../../api";
import { ActivityIndicator, Text, useTheme, FAB } from "react-native-paper";
import Logo from "../../components/Logo";
import { CardTitle } from "../../components/common";
import { screenWidth } from "../../utils/contants";
import moment from "moment/moment";
import { getOrderStatus } from "../../utils/helpers";
import { AlertDialog, Dialog } from "../../components/dialog";
import { DispenseDrugForm } from "../../components/order";
import routes from "../../navigation/routes";

const DispenseDrugs = ({ navigation }) => {
  const [params, setParams] = useState({ search: "" });
  const [order, setOrder] = useState(null);
  const { getDrugDispenseDetail } = useProvidor();
  const [loading, setLoading] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    mode: "form",
    message: "",
  });
  const handleSearch = async () => {
    setLoading(true);
    const response = await getDrugDispenseDetail(params);
    setLoading(false);
    if (response.ok) {
      setOrder(response.data);
    } else {
      setOrder(null);
    }
  };

  const { colors, roundness } = useTheme();
  useEffect(() => {
    handleSearch();
  }, [params]);
  return (
    <View style={styles.screen}>
      <CodeScanner
        onScaned={(search) => {
          setParams({ ...params, search });
        }}
        label="Scan Order or delivery QRCode"
      />
      <SearchHeader
        text={params.search}
        onSearch={handleSearch}
        onTextChange={(search) => {
          setParams({ ...params, search });
        }}
      />
      {loading && <ActivityIndicator />}
      {order && (
        <>
          <ScrollView style={styles.screen}>
            <CardTitle text="Order id" subText={order._id} icon="cart" />
            <CardTitle
              text="Patient name"
              subText={`${order.patient[0].firstName} ${order.patient[0].lastName} ${order.patient[0].surName}`}
              icon="account"
            />
            <CardTitle
              text="Patient CCC Number"
              subText={order.patient[0].cccNumber}
              icon="identifier"
            />
            <CardTitle
              text="Patient Primary Clinic MFL"
              subText={order.patient[0].primaryClinic}
              icon="hospital"
            />
            <CardTitle
              text={"Date Ordered"}
              subText={moment(order.created).format("dddd Do MMMM yyy hh:mm")}
              icon="clock"
            />
            <CardTitle
              text={"Status"}
              subText={getOrderStatus(order.deliveries)}
              icon="progress-clock"
            />
            <CardTitle
              text={"Dispensed"}
              subText={order.isDispensed ? "Complete" : "Pending"}
              icon="progress-clock"
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
          <FAB
            icon="check-all"
            style={[styles.fab, { backgroundColor: colors.secondary }]}
            color={colors.surface}
            label="Dispense"
            onPress={() => {
              // navigation.navigate(routes.ORDERS_NAVIGATION, {
              //   screen: routes.ORDERS_PROVIDOR_DISPENSE_DRUGS_FORM_SCREEN,
              //   params: order,
              // });
              setDialogInfo({ ...dialogInfo, show: true, mode: "form" });
            }}
          />
        </>
      )}
      {!order && !loading && (
        <Text variant="headlineLarge" style={{ alignSelf: "center" }}>
          No Order...
        </Text>
      )}
      <Dialog
        visible={dialogInfo.show}
        swipable
        onRequestClose={() => setDialogInfo({ ...dialogInfo, show: false })}
      >
        {dialogInfo.mode === "form" && (
          <DispenseDrugForm
            order={order}
            onSubmit={(result) => setDialogInfo({ ...dialogInfo, ...result })}
          />
        )}
        {(dialogInfo.mode === "success" || dialogInfo.mode === "error") && (
          <AlertDialog
            mode={dialogInfo.mode}
            message={dialogInfo.message}
            onButtonPress={() => setDialogInfo({ ...dialogInfo, show: false })}
          />
        )}
      </Dialog>
    </View>
  );
};

export default DispenseDrugs;

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
