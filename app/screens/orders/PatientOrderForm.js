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
import { Step2, Step3, orderValidation, Step1 } from "../../components/order";
import { Form } from "../../components/forms";
import routes from "../../navigation/routes";
import { omit } from "lodash";
const validationSchema = orderValidation();

const PatientOrderForm = ({ navigation, route }) => {
  const {
    order,
    event,
    appointment,
    careReceivers,
    type,
    careReceiverAppointments,
    myAppointments,
  } = route.params;
  const { getTreatmentSurport, getUserId, getUser } = useUser();
  const { getCourrierServices, getDeliveryTimeSlots } = useOrder();
  const [courrierServices, setCourrierServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [supportCareGivers, seSetSurpportCareGivers] = useState([]);
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Order was Successfull!",
    mode: "success",
  });
  const userId = getUserId();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [loadEligibility, setLoadEligibility] = useState(false);
  const [wizardInfo, setWizardInfo] = useState({ step: 1, specific: "no" });
  const [user, setUser] = useState(null);
  const { addOrder, updateOrder } = useOrder();
  const handleFetch = async () => {
    setLoadEligibility(true);
    const dResp = await getCourrierServices();
    const tResp = await getDeliveryTimeSlots();
    const userResponse = await getUser();
    const sResp = await getTreatmentSurport({
      canPickUpDrugs: true,
      onlyCareGiver: true,
    });
    setLoadEligibility(false);

    if (dResp.ok) {
      setCourrierServices(dResp.data.results);
    }
    if (tResp.ok) {
      setTimeSlots(tResp.data.results);
    }
    if (sResp.ok) {
      seSetSurpportCareGivers(
        sResp.data.results.filter((item) => {
          const { careGiver: careGiver_, careReceiver: careReceiver_ } = item;
          // asociation fully established and user is caregiver
          return careReceiver_ && careGiver_ && careGiver_ !== userId;
        })
      );
    }

    if (userResponse.ok) {
      setUser(userResponse.data);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleSubmit = async (values, { setErrors, errors, setFieldValue }) => {
    setLoading(true);
    let response;
    if (order) {
      let formData = values;
      if (wizardInfo.specific === "no")
        formData = omit(formData, ["deliveryPerson"]);
      response = await updateOrder(order._id, formData);
    } else {
      let formData = values;
      if (
        values["deliveryMethod"] === "in-parcel" &&
        wizardInfo.specific === "no"
      )
        formData = omit(formData, ["deliveryPerson"]);
      response = await addOrder(formData);
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
      }
      console.log(response.data);
    }
  };

  const next = () => {
    if (wizardInfo.step === 3) {
      setDialogInfo({ ...dialogInfo, mode: "confirm", show: true });
    } else setWizardInfo({ ...wizardInfo, step: wizardInfo.step + 1 });
  };

  const previous = () => {
    setWizardInfo({ ...wizardInfo, step: wizardInfo.step - 1 });
  };

  if (loadEligibility || !user) {
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
        validationSchema={orderValidation(wizardInfo.specific)}
        initialValues={
          order
            ? {
                deliveryAddress: order.deliveryAddress,
                // deliveryTime: order.deliveryTime,
                phoneNumber: order.phoneNumber,
                deliveryMethod: order.deliveryMethod._id,
                deliveryPerson: order.deliveryPerson,
                courrierService: order.courrierService._id,
                event: order.event ? order.event._id : "",
                appointment: order.appointment ? `${order.appointment.id}` : "",
                type: order.type,
                careReceiver: order.careReceiver ? order.careReceiver : "",
              }
            : {
                deliveryAddress: null,
                // deliveryTime: "",
                phoneNumber: user?.phoneNumber || "",
                deliveryMethod: "in-person",
                deliveryPerson: null,
                courrierService: "",
                event: event ? event._id : "",
                appointment: appointment ? `${appointment.id}` : "",
                type: type || "self",
                careReceiver:
                  type === "other"
                    ? careReceivers.find(
                        (pat) => pat.cccNumber === appointment.cccNumber
                      )?._id
                    : "",
              }
        }
        onSubmit={handleSubmit}
      >
        {wizardInfo.step === 1 && (
          <Step1
            onNext={next}
            appointment={appointment}
            event={event}
            careReceivers={careReceivers}
            careReceiverAppointments={careReceiverAppointments}
            myAppointments={myAppointments}
            user={user}
          />
        )}
        {wizardInfo.step === 2 && (
          <Step2
            onNext={next}
            onPrevious={previous}
            courrierServices={courrierServices}
            specific={wizardInfo.specific}
            onWizardInfoChange={setWizardInfo}
          />
        )}
        {wizardInfo.step === 3 && (
          <Step3
            onNext={next}
            onPrevious={previous}
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
              onSubmit={() => {
                setDialogInfo({ ...dialogInfo, show: false });
              }}
              courrierServices={courrierServices}
              specific={wizardInfo.specific}
              appointment={appointment}
              event={event}
              careReceivers={careReceivers}
            />
          ) : (
            <AlertDialog
              message={dialogInfo.message}
              mode={dialogInfo.mode}
              onButtonPress={() => {
                setDialogInfo({ ...dialogInfo, show: false });
                if (dialogInfo.mode === "success")
                  navigation.navigate(routes.BTAB_NAVIGATION, {
                    screen: routes.BTAB_HOME_SCREEN,
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
