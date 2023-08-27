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
import { Step2, Step3, orderValidation } from "../../components/order";
import { Form } from "../../components/forms";
import routes from "../../navigation/routes";

const validationSchema = orderValidation();

const PatientOrderForm = ({ navigation, route }) => {
  const {order, event, appointment} = route.params;
  const { getTreatmentSurport, getUserId, getUser } = useUser();
  const { getCourrierServices, getDeliveryTimeSlots, getDeliveryMethods } =
    useOrder();
  const [courrierServices, setCourrierServices] = useState([]);
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
  const [wizardInfo, setWizardInfo] = useState({ step: 2, specific: "no" });
  const [user, setUser] = useState(null);
  const { addOrder, updateOrder } = usePatient();
  const handleFetch = async () => {
    setLoadEligibility(true);
    const dResp = await getCourrierServices();
    const tResp = await getDeliveryTimeSlots();
    const mResp = await getDeliveryMethods();
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
    if (userResponse.ok) {
      setUser(userResponse.data);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleSubmit = async (values, { setErrors, errors, setFieldValue }) => {
    const currMethod = methods.find(
      ({ _id }) => _id === values["deliveryMethod"]
    );
    if (currMethod?.blockOnTimeSlotFull === true) {
      setFieldValue("deliveryPerson", null);
      setFieldValue("courrierService", "");
    }
    if (wizardInfo.specific === "yes") setFieldValue("deliveryPerson", null);
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
      }
      console.log(response.data);
    }
  };

  const next = () => {
    setWizardInfo({ ...wizardInfo, step: wizardInfo.step + 1 });
  };

  const previous = () => {
    setWizardInfo({ ...wizardInfo, step: wizardInfo.step - 1 });
  };

  useEffect(() => {
    if (wizardInfo.step > 3) {
      setDialogInfo({ ...dialogInfo, mode: "confirm", show: true });
    }
  }, [wizardInfo]);

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
        validationSchema={orderValidation(methods, wizardInfo.specific)}
        initialValues={
          order
            ? {
                deliveryAddress: order.deliveryAddress.address,
                // deliveryTime: order.deliveryTime,
                phoneNumber: order.phoneNumber,
                deliveryMethod: order.deliveryMethod._id,
                deliveryPerson: order.deliveryPerson,
                courrierService: order.courrierService._id,
              }
            : {
                deliveryAddress: null,
                // deliveryTime: "",
                phoneNumber: user?.phoneNumber || "",
                deliveryMethod: "",
                deliveryPerson: null,
                courrierService: "",
              }
        }
        onSubmit={handleSubmit}
      >
        {wizardInfo.step === 2 && (
          <Step2
            onNext={next}
            onPrevious={previous}
            methods={methods}
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
                previous();
                setDialogInfo({ ...dialogInfo, show: false });
              }}
              deliveryMethods={methods}
              courrierServices={courrierServices}
              specific={wizardInfo.specific}
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
