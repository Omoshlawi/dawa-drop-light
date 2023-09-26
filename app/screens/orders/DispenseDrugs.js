import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SearchHeader } from "../../components/input";
import { CodeScanner } from "../../components/scanner";
import { useProvidor } from "../../api";
import {
  ActivityIndicator,
  Text,
  useTheme,
  FAB,
  List,
} from "react-native-paper";
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
  const [order, setOrder] = useState([]);
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
      setOrder(response.data.results);
    } else {
      setOrder([]);
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
      {order.length > 0 && (
        <>
          <Text variant="titleLarge" style={{ padding: 5 }}>
            Pending Orders search Results
          </Text>
          <FlatList
            data={order}
            keyExtractor={({ _id }) => _id}
            renderItem={({ item }) => {
              const {
                appointment: {
                  appointment_type,
                  next_appointment_date,
                  createdAt,
                },
                patient: _patient,
              } = item;
              const patient = _patient[0];
              return (
                <List.Item
                  style={[styles.listItem, { backgroundColor: colors.surface }]}
                  onPress={() => {
                    navigation.navigate(routes.ORDERS_NAVIGATION, {
                      screen:
                        routes.ORDERS_PROVIDOR_DISPENSE_DRUGS_DETAIL_SCREEN,
                      params: item,
                    });
                  }}
                  left={(props) => <List.Icon {...props} icon={"cart"} />}
                  right={(props) => (
                    <List.Icon {...props} icon={"chevron-right"} />
                  )}
                  title={`${moment(next_appointment_date).format(
                    "Do ddd MMM yyyy"
                  )}'s ${appointment_type} Appointment`}
                  description={`${moment(createdAt).format(
                    "Do ddd MMM yyyy"
                  )} | ${patient.cccNumber}`}
                />
              );
            }}
          />
        </>
      )}
      {order.length === 0 && !loading && (
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  listItem: {
    marginBottom: 5,
  },
});
