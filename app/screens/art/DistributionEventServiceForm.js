import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { useART, useOrder } from "../../api";
import Logo from "../../components/Logo";
import {
  Form,
  FormDateTimePicker,
  FormDatesListPicker,
  FormField,
  FormItemPicker,
  FormLocationPicker,
  FormSubmitButton,
} from "../../components/forms";
import { screenHeight, screenWidth } from "../../utils/contants";
import { AlertDialog, Dialog } from "../../components/dialog";
import { List, RadioButton, useTheme, Text } from "react-native-paper";
import routes from "../../navigation/routes";
import moment from "moment/moment";
import { ScrollView } from "react-native";
import { MyTestComponent } from "../../components/input";
import ExtraSubscribersForm from "../../components/ExtraSubscribersForm";
import VenueFormInput from "../../components/VenueFormInput";
import {
  DeliveryServiceStep1,
  DeliveryServiceStep2,
  MemberFeedBack,
  ServiceConfirmationDialog,
  validateDeliveryForm,
} from "../../components/order";
import { useEffect } from "react";

const DistributionEventServiceForm = ({ navigation, route }) => {
  const { initiateDelivery, updateDistributionEvent } = useART();
  const { getCourrierServices } = useOrder();
  const [loading, setLoading] = useState(false);
  const [wizardState, setWizardState] = useState({ step: 1 });
  const { event, delivery, order } = route.params;
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: `ART Distribution event ${
      delivery ? "Updated" : "Added"
    } Successfully!`,
    mode: "success",
  });
  const [fetchingDependancies, setLoadFectDependancies] = useState(false);

  const [courrierServices, setCourrierServices] = useState([]);
  const { colors, roundness } = useTheme();

  const handleFetch = async () => {
    setLoadFectDependancies(true);
    const dResp = await getCourrierServices();
    setLoadFectDependancies(false);

    if (dResp.ok) {
      setCourrierServices(dResp.data.results);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    let response;
    if (delivery) {
      response = await updateDistributionEvent(delivery._id, values);
    } else {
      response = await initiateDelivery(event._id, values);
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
    if (wizardState.step === 2) {
      setDialogInfo({ ...dialogInfo, mode: "confirm", show: true });
    } else setWizardState({ ...wizardState, step: wizardState.step + 1 });
  };
  const previous = () => {
    setWizardState({ ...wizardState, step: wizardState.step - 1 });
  };
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.form}>
          <Form
            initialValues={
              delivery
                ? {
                    member: "",
                    services: [],
                    deliveryType: "self",
                    courrierService: "",
                    deliveryPerson: null,
                    deliveryAddress: null,
                  }
                : {
                    member: "",
                    services: [],
                    deliveryType: "self",
                    courrierService: "",
                    deliveryPerson: null,
                    deliveryAddress: null,
                    order: order?._id,
                    event: event?._id,
                  }
            }
            validationSchema={validateDeliveryForm(event)}
            onSubmit={handleSubmit}
          >
            {wizardState.step === 1 && (
              <DeliveryServiceStep1 event={event} order={order} onNext={next} />
            )}
            {wizardState.step === 2 && (
              <DeliveryServiceStep2
                courrierServices={courrierServices}
                onNext={next}
                onPrevious={previous}
                loading={loading}
              />
            )}
            <Dialog
              visible={dialogInfo.show}
              onRequestClose={() => {
                if (dialogInfo.mode === "confirm")
                  setDialogInfo({ ...dialogInfo, show: false });
              }}
            >
              {["success", "error"].includes(dialogInfo.mode) && (
                <AlertDialog
                  mode={dialogInfo.mode}
                  message={dialogInfo.message}
                  onButtonPress={() => {
                    if (dialogInfo.mode === "success")
                      navigation.navigate(routes.ART_NAVIGATION, {
                        screen: routes.ART_DISTRIBUTION_EVENTS_SCREEN,
                      });
                    else navigation.goBack();
                  }}
                />
              )}
              {dialogInfo.mode === "confirm" && (
                <ServiceConfirmationDialog
                  event={event}
                  order={order}
                  courrierServices={courrierServices}
                  onSubmit={() => {
                    setDialogInfo({ ...dialogInfo, show: false });
                  }}
                />
              )}
            </Dialog>
          </Form>
        </View>
      </ScrollView>
    </View>
  );
};

export default DistributionEventServiceForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    width: "100%",
    padding: 10,
    flex: 1,
  },
  btn: {
    marginVertical: 20,
  },
  itemContainer: {
    margin: 5,
  },
  listItem: {
    padding: 10,
  },
  img: {
    width: "100%",
    height: screenHeight * 0.2,
  },
});
