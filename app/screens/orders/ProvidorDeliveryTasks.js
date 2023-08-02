import { StyleSheet, Text, View, SectionList } from "react-native";
import React, { useCallback, useState } from "react";
import { useProvidor } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { SafeArea } from "../../components/layout";
import { Avatar, Card, useTheme } from "react-native-paper";
import moment from "moment/moment";

const ProvidorDeliveryTasks = ({ naavigation }) => {
  const { getDeliveryHistory } = useProvidor();
  const [deliveries, setDeliveries] = useState([]);
  const { colors } = useTheme();

  const handFetch = async () => {
    const respo = await getDeliveryHistory();
    if (respo.ok) {
      setDeliveries(respo.data.results);
    }
  };

  const deliveryToSectionListData = (deliveries = []) => {
    const pending = deliveries.filter(({ status }) => status === "pending");
    const cancelled = deliveries.filter(({ status }) => status === "canceled");
    const delivered = deliveries.filter(({ status }) => status === "delivered");
    return [
      {
        title: "Pending Deliveries",
        data: pending,
      },
      {
        title: "Cancelled Deliveries",
        data: cancelled,
      },
      {
        title: "Delivered Deliveries",
        data: delivered,
      },
    ];
  };

  useFocusEffect(
    useCallback(() => {
      handFetch();
    }, [])
  );
  return (
    <SafeArea>
      <SectionList
        sections={deliveryToSectionListData(deliveries)}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length ? <Text style={styles.title}>{title}</Text> : null
        }
        renderItem={({ item }) => {
          const {
            created,
            status,
            order: { deliveryAddress },
          } = item;
          return (
            <Card.Title
              style={{ backgroundColor: colors.surface }}
              title={`${
                deliveryAddress.address
                  ? deliveryAddress.address
                  : "(" +
                    deliveryAddress.latitude +
                    ", " +
                    deliveryAddress.longitude +
                    ")"
              }`}
              subtitle={`Date: ${moment(created).format(
                "ddd Do MMM yyy"
              )} | Status: ${status}`}
              left={(props) => <Avatar.Icon {...props} icon="truck" />}
              right={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="chevron-right"
                  color={colors.primary}
                  style={{ backgroundColor: colors.surface }}
                />
              )}
            />
          );
        }}
      />
    </SafeArea>
  );
};

export default ProvidorDeliveryTasks;

const styles = StyleSheet.create({
  title: {
    textTransform: "capitalize",
    padding: 10,
    fontWeight: "bold",
  },
});
