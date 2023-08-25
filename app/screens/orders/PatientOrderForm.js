import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  AlertDialog,
  Dialog,
  OrderConfirmation,
} from "../../components/dialog";
import { useTheme, Text, ActivityIndicator } from "react-native-paper";
import { useOrder, usePatient, useUser } from "../../api";
import { Step2, Step3 } from "../../components/order";
import { Form } from "../../components/forms";
import routes from "../../navigation/routes";

const validationSchema = Yup.object().shape({
  deliveryAddress: Yup.object({
    latitude: Yup.number().required().label("Latitude"),
    longitude: Yup.number().required().label("Longitude"),
    address: Yup.string().label("Address"),
  }).label("Delivery address"),
  deliveryTimeSlot: Yup.string().required().label("Time slot"),
  deliveryMode: Yup.string().required().label("Delivery mode"),
  phoneNumber: Yup.string().max(14).min(9).label("Phone number"),
  careGiver: Yup.object({
    fullName: Yup.number().required().label("Full name"),
    nationalId: Yup.number().required().label("National Id"),
    phoneNumber: Yup.string().label("Phone number"),
  }).label("Delivery person"),
  deliveryMethod: Yup.string()
    .required("You must specify how you want your drug delivered to you")
    .label("Delivery Method"),
});

const PatientOrderForm = ({ navigation, route }) => {
  const order = route.params;
  const { getTreatmentSurport, getUserId } = useUser();
  const { getDeliveryModes, getDeliveryTimeSlots, getDeliveryMethods } =
    useOrder();
  const [modes, setModes] = useState([]);
  const [methods, setMethods] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [treatmentSurpoters, seTtreatmentSurpoters] = useState([]);
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Order was Successfully!",
    mode: "success",
  });
  const userId = getUserId();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [loadEligibility, setLoadEligibility] = useState(false);
  const [step, setStep] = useState(2);
  const { addOrder, updateOrder } = usePatient();
  const handleFetch = async () => {
    setLoadEligibility(true);
    const dResp = await getDeliveryModes();
    const tResp = await getDeliveryTimeSlots();
    const mResp = await getDeliveryMethods();
    const sResp = await getTreatmentSurport({
      canPickUpDrugs: true,
      onlyCareGiver: true,
    });
    setLoadEligibility(false);
    if (dResp.ok) {
      setModes(dResp.data.results);
    }
    if (tResp.ok) {
      setTimeSlots(tResp.data.results);
    }
    if (mResp.ok) {
      setMethods(mResp.data.results);
    }
    if (sResp.ok) {
      seTtreatmentSurpoters(
        sResp.data.results.filter((item) => {
          const { careGiver: careGiver_, careReceiver: careReceiver_ } = item;
          // asociation fully established and user is caregiver
          return careReceiver_ && careGiver_ && careGiver_ !== userId;
        })
      );
    }
  };

  useEffect(() => {
    handleFetch();
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

  useEffect(() => {
    if (step > 3) {
      setDialogInfo({ ...dialogInfo, mode: "confirm", show: true });
    }
  }, [step]);

  if (loadEligibility) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size={50} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Form
        validationSchema={validationSchema}
        initialValues={
          order
            ? {
                deliveryAddress: order.deliveryAddress,
                deliveryTimeSlot: order.deliveryTimeSlot._id,
                deliveryMode: order.deliveryMode._id,
                phoneNumber: order.phoneNumber,
                deliveryMethod: order.deliveryMethod._id,
                careGiver:
                  order.careGiver.length > 0 && treatmentSurpoters
                    ? treatmentSurpoters.find(
                        (careGiver_) =>
                          careGiver_.careGiver === order.careGiver[0]._id
                      )
                    : "",
              }
            : {
                deliveryAddress: null,
                deliveryTimeSlot: "",
                deliveryMode: "",
                phoneNumber: "",
                deliveryMethod: "",
                careGiver: null,
              }
        }
        onSubmit={handleSubmit}
      >
        {step === 2 && (
          <Step2
            onNext={next}
            onPrevious={previous}
            methods={methods}
            treatmentSurpoters={treatmentSurpoters}
          />
        )}
        {step === 3 && (
          <Step3
            onNext={next}
            onPrevious={previous}
            modes={modes}
            timeSlots={timeSlots}
            loading={loading}
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
            <OrderConfirmation
              deliveryModes={modes}
              onSubmit={() => {
                previous();
                setDialogInfo({ ...dialogInfo, show: false });
              }}
              deliveryTimeSlots={timeSlots}
              deliveryMethods={methods}
              careGiverSurporters={treatmentSurpoters}
            />
          ) : (
            <AlertDialog
              message={dialogInfo.message}
              mode={dialogInfo.mode}
              onButtonPress={() => {
                setDialogInfo({ ...dialogInfo, show: false });
                if (dialogInfo.mode === "success")
                  navigation.navigate(routes.ORDERS_NAVIGATION, {
                    screen: routes.ORDERS_ORDERS_SCREEN,
                  });
                else if (dialogInfo.mode === "error") navigation.goBack();
              }}
            />
          )}
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
