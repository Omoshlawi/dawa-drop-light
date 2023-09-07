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
  validateDeliveryForm,
} from "../../components/order";
import { useEffect } from "react";

const DistributionEventServiceForm = ({ navigation, route }) => {
  const { addDistributionEvent, updateDistributionEvent } = useART();
  const { getCourrierServices } = useOrder();
  const [loading, setLoading] = useState(false);
  const [wizardState, setWizardState] = useState({ step: 1 });
  const { event, delivery } = route.params;
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
      response = await addDistributionEvent(values);
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
          success: false,
          message: response.data.detail
            ? response.data.detail
            : "Unknow Error Occured",
        });
      }
      console.log(response.data);
    }
  };

  const next = () => {
    setWizardState({ ...wizardState, step: wizardState.step + 1 });
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
                    distributionTime: delivery.distributionTime,
                    distributionLocation: {
                      latitude: delivery.distributionLocation.latitude,
                      longitude: delivery.distributionLocation.longitude,
                      address: delivery.distributionLocation.address,
                    },
                    remarks: delivery.remarks,
                    remiderNortificationDates:
                      delivery.remiderNortificationDates,
                    services: [],
                    deliveryType: "self",
                  }
                : {
                    member: "",
                    services: [],
                    deliveryType: "self",
                    courrierService: "",
                    deliveryPerson: null,
                    deliveryAddress: null,
                    remarks: "",
                    remiderNortificationDates: [],
                    patientDeliveryPrefence: false,
                  }
            }
            validationSchema={validateDeliveryForm(event)}
            onSubmit={handleSubmit}
          >
            {wizardState.step === 1 && (
              <DeliveryServiceStep1 event={event} onNext={next} />
            )}
            {wizardState.step === 2 && (
              <DeliveryServiceStep2
                courrierServices={courrierServices}
                onNext={next}
                onPrevious={previous}
              />
            )}
          </Form>
        </View>
      </ScrollView>
      <Dialog visible={dialogInfo.show}>
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
      </Dialog>
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
