import { StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SearchHeader } from "../../components/input";
import { CodeScanner } from "../../components/scanner";
import { useProvidor } from "../../api";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import Logo from "../../components/Logo";
import { CardTitle } from "../../components/common";
import { screenWidth } from "../../utils/contants";
import moment from "moment/moment";
import { getOrderStatus } from "../../utils/helpers";

const DispenseDrugs = () => {
  const [params, setParams] = useState({ search: "" });
  const [order, setOrder] = useState(null);
  const { getDrugDispenseDetail } = useProvidor();
  const [loading, setLoading] = useState(false);
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
        <ScrollView style={styles.screen}>
          <CardTitle text="Order id" subText={order._id} icon="cart" />
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
      )}
      {!order && !loading && (
        <Text variant="headlineLarge" style={{ alignSelf: "center" }}>
          No Order...
        </Text>
      )}
    </View>
  );
};

export default DispenseDrugs;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
