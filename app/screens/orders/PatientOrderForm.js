import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  AlertDialog,
  Dialog,
  OrderConfirmation,
} from "../../components/dialog";
import { SafeArea } from "../../components/layout";
import {
  Form,
  FormField,
  FormItemPicker,
  FormLocationPicker,
} from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { getFormFileFromUri, getImageUrl, pickX } from "../../utils/helpers";
import Logo from "../../components/Logo";
import { useTheme, Button, Text, List } from "react-native-paper";
import { usePatient } from "../../api";
import TimeRangePicker from "../../components/time/TimeRangePicker";
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
    mode: "success",
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
      setDialogInfo({ ...dialogInfo, show: response.ok, mode: "success" });
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
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
    }
  };
  return <SafeArea></SafeArea>;
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
