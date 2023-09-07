import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { useART } from "../../api";
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
  MemberFeedBack,
  validateDeliveryForm,
} from "../../components/order";

const DistributionEventServiceForm = ({ navigation, route }) => {
  const { addDistributionEvent, updateDistributionEvent } = useART();
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
  const { colors, roundness } = useTheme();

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
                    title: delivery.title,
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
                    title: "",
                    distributionTime: "",
                    distributionLocation: null,
                    remarks: "",
                    remiderNortificationDates: [],
                    services: [],
                    patientDeliveryPrefence: false,
                    deliveryType: "self",
                  }
            }
            validationSchema={validateDeliveryForm(event)}
            onSubmit={handleSubmit}
          >
            {wizardState.step === 1 && (
              <DeliveryServiceStep1 event={event} onNext={next} />
            )}

            {/* <FormItemPicker
              name="services"
              icon="medical-bag"
              searchable
              multiple
              label="Extra services"
              data={[
                { name: "FP Screening" },
                { name: "TB Screening" },
                { name: "STI Screening" },
                { name: "Pregnancy Intention" },
                { name: "Triage" },
              ]}
              valueExtractor={(val) => val.name}
              labelExtractor={(val) => val.name}
              renderItem={({ item, selected }) => (
                <List.Item
                  title={item.name}
                  style={styles.listItem}
                  left={(props) => <List.Icon {...props} icon="medical-bag" />}
                  right={(props) => (
                    <List.Icon
                      {...props}
                      icon={selected ? "radiobox-marked" : "radiobox-blank"}
                    />
                  )}
                />
              )}
              itemContainerStyle={[
                styles.itemContainer,
                { borderRadius: roundness },
              ]}
            /> */}
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
