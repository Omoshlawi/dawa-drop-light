import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  CareReceiverStep1,
  CareReceiverStep2,
  CareReceiverStep3,
  CareReceiverStep4,
} from "../../components/order";
import { Form } from "../../components/forms";
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
  deliveryAddress: Yup.object({
    latitude: Yup.number().required().label("Latitude"),
    longitude: Yup.number().required().label("Longitude"),
    address: Yup.string().label("Address"),
  }).label("Delivery address"),
  deliveryTimeSlot: Yup.string().required().label("Time slot"),
  deliveryMode: Yup.string().required().label("Delivery mode"),
  phoneNumber: Yup.string().max(14).min(9).label("Phone number"),
  careGiver: Yup.string().label("Care giver"),
  deliveryMethod: Yup.string()
    .required("You must specify how you want your drug delivered to you")
    .label("Delivery Method"),
});

const CareReceiverOrderForm = ({ navigation }) => {
  const [wizardState, setWizardState] = useState({ step: 1 });
  const handleNext = () => {
    setWizardState({ ...wizardState, step: wizardState.step + 1 });
  };
  const handlePrevious = () => {
    if (wizardState.step > 1)
      setWizardState({ ...wizardState, step: wizardState.step - 1 });
  };

  const handleSubmit = async (values, {}) => {};

  return (
    <View style={styles.screen}>
      <Form onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={{}}>
        {wizardState.step === 1 && <CareReceiverStep1 onNext={handleNext} />}
        {wizardState.step === 2 && (
          <CareReceiverStep2 onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {wizardState.step === 3 && (
          <CareReceiverStep3 onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {wizardState.step === 4 && (
          <CareReceiverStep4 onPrevious={handlePrevious} />
        )}
      </Form>
    </View>
  );
};

export default CareReceiverOrderForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
