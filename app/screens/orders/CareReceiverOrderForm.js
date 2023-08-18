import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  CareReceiverStep1,
  CareReceiverStep2,
  CareReceiverStep3,
  CareReceiverStep4,
} from "../../components/order";

const CareReceiverOrderForm = ({ navigation }) => {
  const [wizardState, setWizardState] = useState({ step: 1 });
  const handleNext = () => {
    setWizardState({ ...wizardState, step: wizardState.step + 1 });
  };
  const handlePrevious = () => {
    if (wizardState.step > 1)
      setWizardState({ ...wizardState, step: wizardState.step - 1 });
  };

  if (wizardState.step === 1) {
    return <CareReceiverStep1 onNext={handleNext} />;
  } else if (wizardState.step === 2) {
    return (
      <CareReceiverStep2 onNext={handleNext} onPrevious={handlePrevious} />
    );
  } else if (wizardState.step === 3) {
    return (
      <CareReceiverStep3 onNext={handleNext} onPrevious={handlePrevious} />
    );
  } else {
    return <CareReceiverStep4 onPrevious={handlePrevious} />;
  }
};

export default CareReceiverOrderForm;

const styles = StyleSheet.create({});
