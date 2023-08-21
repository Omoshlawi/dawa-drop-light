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
import {
  AlertDialog,
  Dialog,
  OrderConfirmation,
} from "../../components/dialog";
import { usePatient } from "../../api";
import routes from "../../navigation/routes";

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
  const [careReceiverSurporters, setCareReceiverSupporters] = useState([]);
  const [wizardState, setWizardState] = useState({ step: 1 });
  const { orderForCareReceiver } = usePatient();
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    let response;
    if (order) {
      response = await updateOrder(order._id, values);
    } else {
      response = await orderForCareReceiver(values);
    }
    setLoading(false);
    if (response.ok) {
      setDialogInfo({
        ...dialogInfo,
        show: response.ok,
        mode: "success",
        message: "Order wa successfull!",
        onDismiss: () => {
          navigation.navigate(routes.ORDERS_NAVIGATION, {
            screen: routes.ORDERS_ORDER_FOR_ANOTHER_SCREEN,
          });
        },
      });
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
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
            careReceivers={careReceiverSurporters}
            onCareReceiversChange={setCareReceiverSupporters}
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
          <CareReceiverStep4
            onPrevious={handlePrevious}
            modes={modes}
            timeSlots={timeSlots}
            loading={loading}
            onSubmit={() => {
              setDialogInfo({ ...dialogInfo, mode: "confirm", show: true });
            }}
          />
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
              <OrderConfirmation
                deliveryModes={modes}
                onSubmit={() => {
                  setDialogInfo({ ...dialogInfo, show: false });
                }}
                deliveryTimeSlots={timeSlots}
                deliveryMethods={methods}
                careGiverSurporters={treatmentSurpoters}
                careReceiverSuppoters={careReceiverSurporters}
              />
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
