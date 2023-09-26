import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useProvidor, useUser } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { SafeArea } from "../../components/layout";
import { Avatar, Card, useTheme } from "react-native-paper";
import moment from "moment/moment";
import routes from "../../navigation/routes";

const MyDeliveries = ({ navigation }) => {
  const { getDeliveryHistory } = useProvidor();
  const { getUserId } = useUser();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const userId = getUserId();
  const handFetch = async () => {
    const respo = await getDeliveryHistory();
    if (respo.ok) {
      setDeliveries(respo.data.results);
    }
  };

  const deliveryToSectionListData = (deliveries = []) => {
    const patientsByCCCNumber = deliveries.reduce((acc, curr) => {
      const cccNumber = curr.patient[0].cccNumber;
      if (!acc[cccNumber]) {
        acc[cccNumber] = {
          title: cccNumber,
          data: [],
          patientInfo: curr.patient[0], // Store patient information
        };
      }
      acc[cccNumber].data.push(curr);
      return acc;
    }, {});

    // Convert the patientsByCCCNumber object into an array of sections
    const sections = Object.values(patientsByCCCNumber).map((section) => ({
      title:
        section.patientInfo.user === userId
          ? "My Deliveries"
          : `${section.patientInfo.firstName} ${section.patientInfo.lastName} (${section.title})'s Deliveries`,
      data: section.data,
    }));

    return sections;
  };

  useFocusEffect(
    useCallback(() => {
      handFetch();
    }, [])
  );
  return (
    <View style={styles.screen}>
      <SectionList
        refreshing={loading}
        onRefresh={handFetch}
        sections={deliveryToSectionListData(deliveries)}
        renderSectionHeader={({ section: { title, data } }) =>
          data.length ? <Text style={styles.title}>{title}</Text> : null
        }
        renderItem={({ item }) => {
          const { created, feedBack, deliveryAddress, deliveryServiceRequest } =
            item;
          return (
            <TouchableOpacity
              style={{ marginBottom: 5 }}
              onPress={() => {
                navigation.navigate(routes.ORDERS_NAVIGATION, {
                  screen: routes.ORDERS_PROVIDOR_DELIVERY_DETAIL_SCREEN,
                  params: item,
                });
              }}
            >
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
                )} | Status: ${feedBack.length > 0 ? "Delivered" : "pending"}`}
                left={(props) => <Avatar.Icon {...props} icon="truck-fast" />}
                right={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="chevron-right"
                    color={colors.primary}
                    style={{ backgroundColor: colors.surface }}
                  />
                )}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default MyDeliveries;

const styles = StyleSheet.create({
  title: {
    textTransform: "capitalize",
    padding: 10,
    fontWeight: "bold",
  },
  screen: {
    flex: 1,
  },
});
