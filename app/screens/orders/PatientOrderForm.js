import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { Dialog, getDialogIcon } from "../../components/dialog";
import { SafeArea } from "../../components/layout";
import {
  Form,
  FormField,
  FormItemPicker,
  FormSubmitButton,
} from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { getFormFileFromUri, getImageUrl, pickX } from "../../utils/helpers";
import Logo from "../../components/Logo";
import { useTheme, Button, Text, List } from "react-native-paper";
import { usePatient } from "../../api";

const validationSchema = Yup.object().shape({
  deliveryAddress: Yup.object({
    latitude: Yup.number().required().label("Latitude"),
    longitude: Yup.number().required().label("Longitude"),
    address: Yup.string().label("Address"),
  }).label("Delivery address"),
  deliveryTimeSlot: Yup.object({
    startTime: Yup.date().required().label("Start time"),
    endTime: Yup.date().required().label("End time"),
  }).label("Time between"),
  deliveryMode: Yup.string().required().label("Delivery mode"),
  phoneNumber: Yup.string().max(14).min(9).label("Phone number"),
});

const PatientOrderForm = ({ navigation, route }) => {
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "menu Option Added Successfully!",
    success: true,
  });
  const { colors } = useTheme();

  const [loading, setLoading] = useState(false);

  const { addOrder, updateOrder } = usePatient();
  const { modes, mode: order } = route.params;

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
      <View style={styles.screen}>
        <Logo size={screenWidth * 0.4} />
        <View style={styles.form}>
          <Form
            initialValues={
              order
                ? pickX(order, [
                    "deliveryAddress",
                    "deliveryTimeSlot",
                    "deliveryMode",
                    "phoneNumber",
                  ])
                : {
                    deliveryAddress: null,
                    deliveryTimeSlot: null,
                    deliveryMode: "",
                    phoneNumber: "",
                  }
            }
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <FormField
              placeholder="Enter Phon enumber"
              label="Phone number"
              name="phoneNumber"
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

            <FormSubmitButton
              title={order ? "Update Order" : "Add Order"}
              mode="contained"
              style={styles.btn}
              loading={loading}
              disabled={loading}
            />
            <View style={{ flex: 1 }} />
          </Form>
        </View>
      </View>
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
});
