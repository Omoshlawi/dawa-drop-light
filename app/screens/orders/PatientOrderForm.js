import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { AlertDialog, Dialog } from "../../components/dialog";
import {
  useTheme,
  Button,
  Text,
  List,
  ActivityIndicator,
} from "react-native-paper";
import { usePatient } from "../../api";
import { Step1, Step2, Step3 } from "../../components/order";
import { Form } from "../../components/forms";
import { pickX } from "../../utils/helpers";

const validationSchema = Yup.object().shape({
  deliveryAddress: Yup.object({
    latitude: Yup.number().required().label("Latitude"),
    longitude: Yup.number().required().label("Longitude"),
    address: Yup.string().label("Address"),
  }).label("Delivery address"),
  deliveryTimeSlot: Yup.string().required().label("Time slot"),
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
  const [loadEligibility, setLoadEligibility] = useState(false);
  const [step, setStep] = useState(1);
  const { addOrder, updateOrder, checkEligibility } = usePatient();
  const { modes, order, timeSlots } = route.params;

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

  const next = () => {
    setStep(step + 1);
  };

  const previous = () => {
    setStep(step - 1);
  };

  if (loadEligibility) {
    return (
      <View
        style={[
          styles.screen,
          { backgroundColor: colors.background, padding: 20 },
        ]}
      >
        <ActivityIndicator size={50} />
        <Text>Checking Eligibility...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Form
        validationSchema={validationSchema}
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
                deliveryTimeSlot: "",
                deliveryMode: "",
                phoneNumber: "",
              }
        }
        onSubmit={handleSubmit}
      >
        {step === 1 && eligible && (
          <Step1
            onNext={next}
            appointment={eligible.appointment}
            regimen={eligible.currentRegimen}
          />
        )}
        {step === 2 && eligible && (
          <Step2
            onNext={next}
            onPrevious={previous}
            modes={modes}
            timeSlots={timeSlots}
          />
        )}
        {step === 3 && eligible && (
          <Step3 onNext={next} onPrevious={previous} />
        )}
        <Dialog visible={dialogInfo.show}>
          <AlertDialog
            message={dialogInfo.message}
            mode={dialogInfo.mode}
            onButtonPress={() => {
              setDialogInfo({ ...dialogInfo, show: false });
              if (dialogInfo.mode === "success") navigation.goBack();
              else if (dialogInfo.mode === "error") navigation.goBack();
            }}
          />
        </Dialog>
      </Form>
    </View>
  );
};

export default PatientOrderForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
});
