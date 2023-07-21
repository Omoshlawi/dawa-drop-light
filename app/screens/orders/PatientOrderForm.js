import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Dialog, getDialogIcon } from "../../components/dialog";
import { SafeArea } from "../../components/layout";
import {
  Form,
  FormDateTimePicker,
  FormField,
  FormItemPicker,
  FormLocationPicker,
  FormSubmitButton,
} from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { getFormFileFromUri, getImageUrl, pickX } from "../../utils/helpers";
import Logo from "../../components/Logo";
import { useTheme, Button, Text, List, Modal } from "react-native-paper";
import { usePatient } from "../../api";
import TimeRangePicker from "../../components/time/TimeRangePicker";
import { LocationPicker } from "../../components/map";
import moment from "moment";

const validationSchema = Yup.object().shape({
  deliveryAddress: Yup.object({
    latitude: Yup.number().required().label("Latitude"),
    longitude: Yup.number().required().label("Longitude"),
    address: Yup.string().label("Address"),
  }).label("Delivery address"),
  // deliveryTimeSlot: Yup.object({
  //   startTime: Yup.date().required().label("Start time"),
  //   endTime: Yup.date().required().label("End time"),
  // }).label("Time between"),
  deliveryMode: Yup.string().required().label("Delivery mode"),
  phoneNumber: Yup.string().max(14).min(9).label("Phone number"),
});

const PatientOrderForm = ({ navigation, route }) => {
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Order was Successfully!",
    success: true,
  });
  const { colors } = useTheme();

  const [loading, setLoading] = useState(false);
  const [eligible, setEligible] = useState(null);
  const [loadEligibility, setLoadEligibility] = useState(null);

  const { addOrder, updateOrder, checkEligibility } = usePatient();
  const { modes, mode: order } = route.params;

  const handleCheckEligible = async () => {
    setLoadEligibility(true);
    const response = await checkEligibility();
    setLoadEligibility(false);
    if (response.ok) {
      setEligible(response.data);
    }
  };

  useEffect(() => {
    handleCheckEligible();
  }, []);

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    let response;
    if (order) {
      response = await updateOrder(order._id, values);
    } else {
      response = await addOrder(values);
    }
    setLoading(false);
    if (response.ok) {
      setDialogInfo({ ...dialogInfo, show: response.ok, success: response.ok });
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
        console.log(response.data);
      } else {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          success: false,
          message: response.data.detail
            ? response.data.detail
            : "Unknow Error Occured",
        });
        console.log(response.data);
      }
    }
  };
  return (
    <SafeArea>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loadEligibility}
            onRefresh={handleCheckEligible}
          />
        }
      >
        {eligible && (
          <View style={styles.screen}>
            <Logo size={screenWidth * 0.3} />
            {eligible && (
              <View style={styles.data}>
                <List.Item
                  title={`${eligible.appointment.appointment_type} Appointment`}
                  description={moment(
                    new Date(
                      eligible.appointment.appointment
                        .split("-")
                        .reverse()
                        .join("-")
                    )
                  ).format("ddd Do MMM yyyy")}
                  style={[
                    styles.listItem,
                    {
                      backgroundColor: colors.surface,
                    },
                  ]}
                  descriptionStyle={{ color: colors.disabled }}
                />
                <List.Item
                  title="Regimen"
                  description={eligible.currentRegimen.regimen}
                  style={[
                    styles.listItem,
                    {
                      backgroundColor: colors.surface,
                    },
                  ]}
                  descriptionStyle={{ color: colors.disabled }}
                />
                <List.Item
                  title="Patient name"
                  description={`${eligible.currentRegimen.firstname} ${eligible.currentRegimen.middlename} ${eligible.currentRegimen.lastname}`}
                  style={[
                    styles.listItem,
                    {
                      backgroundColor: colors.surface,
                    },
                  ]}
                  descriptionStyle={{ color: colors.disabled }}
                />
                <List.Item
                  title="Patient CCC number"
                  description={`${eligible.currentRegimen.ccc_no}`}
                  style={[
                    styles.listItem,
                    {
                      backgroundColor: colors.surface,
                    },
                  ]}
                  descriptionStyle={{ color: colors.disabled }}
                />
              </View>
            )}
            <View style={styles.form}>
              <Form
                initialValues={
                  order
                    ? pickX(order, [
                        "deliveryAddress",
                        // "deliveryTimeSlot",
                        "deliveryMode",
                        "phoneNumber",
                      ])
                    : {
                        deliveryAddress: null,
                        // deliveryTimeSlot: null,
                        deliveryMode: "",
                        phoneNumber: "",
                      }
                }
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <FormField
                  name="phoneNumber"
                  placeholder="Enter Phon enumber"
                  label="Phone number"
                  icon="phone"
                />
                <FormItemPicker
                  name="deliveryMode"
                  icon="truck-delivery"
                  label="Delivery mode"
                  data={modes}
                  valueExtractor={({ _id }) => _id}
                  labelExtractor={({ name }) => name}
                  renderItem={({ item }) => (
                    <List.Item
                      title={item.name}
                      left={(props) => (
                        <List.Icon {...props} icon="truck-delivery" />
                      )}
                    />
                  )}
                  itemContainerStyle={{ marginBottom: 5 }}
                />
                <TimeRangePicker />

                <FormLocationPicker name="deliveryAddress" />

                <FormSubmitButton
                  title={order ? "Update Order" : "Add Order"}
                  mode="contained"
                  style={styles.btn}
                  loading={loading}
                  disabled={
                    loading || Boolean(eligible) === false || loadEligibility
                  }
                />
                <View style={{ flex: 1 }} />
              </Form>
            </View>
          </View>
        )}
      </ScrollView>
      <Dialog
        visible={dialogInfo.show}
        title={dialogInfo.success ? "Success!" : "Failure!"}
      >
        <View style={styles.dialog}>
          <Image
            style={styles.img}
            source={getDialogIcon(dialogInfo.success ? "success" : "error")}
          />
          <Text style={styles.text}>{dialogInfo.message}</Text>
          <Button
            mode="outlined"
            onPress={() => {
              setDialogInfo({ ...dialogInfo, show: false });
              if (dialogInfo.success) navigation.goBack();
            }}
          >
            Ok
          </Button>
        </View>
      </Dialog>
    </SafeArea>
  );
};

export default PatientOrderForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  form: {
    width: "100%",
    padding: 10,
    flex: 1,
  },
  btn: {
    marginVertical: 20,
  },
  dialog: {
    width: screenWidth * 0.75,
  },
  img: {
    alignSelf: "center",
    width: 100,
    height: 100,
  },
  text: {
    textAlign: "center",
    padding: 10,
  },
  itemContainer: {
    marginBottom: 5,
    // padding: 10,
  },
  data: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    width: "47%",
    margin: 3,
  },
});
