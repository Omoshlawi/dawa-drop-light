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
import { AlertDialog, Dialog } from "../../components/dialog";

const validationSchema = Yup.object().shape({
  careReceiver: Yup.string().label("Care Receiver").required(),
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

const CareReceiverOrderForm = ({ navigation, route }) => {
  const { order, modes, timeSlots, methods, treatmentSurpoters } = route.params;
  const [wizardState, setWizardState] = useState({ step: 1 });
  const handleNext = () => {
    setWizardState({ ...wizardState, step: wizardState.step + 1 });
  };
  const handlePrevious = () => {
    if (wizardState.step > 1)
      setWizardState({ ...wizardState, step: wizardState.step - 1 });
  };

  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Order was Successfully!",
    mode: "success",
    onDismiss: null,
  });

  const handleSubmit = async (values, {}) => {};

  return (
    <View style={styles.screen}>
      <Form
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={
          order
            ? {
                careReceiver: order.careReceiver,
                deliveryAddress: order.deliveryAddress,
                deliveryTimeSlot: order.deliveryTimeSlot._id,
                deliveryMode: order.deliveryMode._id,
                phoneNumber: order.phoneNumber,
                deliveryMethod: order.deliveryMethod._id,
                careGiver:
                  order.careGiver.length > 0 ? order.careGiver[0]._id : "",
              }
            : {
                careReceiver: "",
                deliveryAddress: null,
                deliveryTimeSlot: "",
                deliveryMode: "",
                phoneNumber: "",
                deliveryMethod: "",
                careGiver: "",
              }
        }
      >
        {wizardState.step === 1 && (
          <CareReceiverStep1
            onNext={handleNext}
            onDialogInfoChange={setDialogInfo}
          />
        )}
        {wizardState.step === 2 && (
          <CareReceiverStep2
            onNext={handleNext}
            onPrevious={handlePrevious}
            onDialogInfoChange={setDialogInfo}
          />
        )}
        {wizardState.step === 3 && (
          <CareReceiverStep3
            onNext={handleNext}
            onPrevious={handlePrevious}
            methods={methods}
            treatmentSurpoters={treatmentSurpoters}
          />
        )}
        {wizardState.step === 4 && (
          <CareReceiverStep4 onPrevious={handlePrevious} />
        )}
        <Dialog
          visible={dialogInfo.show}
          onRequestClose={() => {
            setDialogInfo({ ...dialogInfo, show: false });
            if (dialogInfo.mode === "confirm") {
              previous();
            }
          }}
        >
          {dialogInfo.mode === "confirm" ? (
            <>
              {/* <OrderConfirmation
                deliveryModes={modes}
                onSubmit={() => {
                  previous();
                  setDialogInfo({ ...dialogInfo, show: false });
                }}
                deliveryTimeSlots={timeSlots}
                deliveryMethods={methods}
                treatmentSurpoters={treatmentSurpoters}
              /> */}
            </>
          ) : (
            <AlertDialog
              message={dialogInfo.message}
              mode={dialogInfo.mode}
              onButtonPress={() => {
                setDialogInfo({ ...dialogInfo, show: false });
                if (dialogInfo.onDismiss instanceof Function)
                  dialogInfo.onDismiss();
              }}
            />
          )}
        </Dialog>
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
