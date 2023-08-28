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
import { screenWidth } from "../../utils/contants";
import { AlertDialog, Dialog } from "../../components/dialog";
import { List, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";
import moment from "moment/moment";
import { ScrollView } from "react-native";
import { MyTestComponent } from "../../components/input";
import ExtraSubscribersForm from "../../components/ExtraSubscribersForm";
import DistributionVenueInput from "../../components/DistributionVenueInput";

const validationSchemer = Yup.object().shape({
  title: Yup.string().label("Evennt title").required(),
  distributionTime: Yup.date().label("Event Date"),
  distributionLocation: Yup.object({
    latitude: Yup.number().label("Latitude"),
    longitude: Yup.number().label("Longitude"),
    address: Yup.string().label("Address"),
  }).label("Event address"),
  group: Yup.string().label("Distribution Group").required(),
  remarks: Yup.string().label("Event remarks").required(),
  remiderNortificationDates: Yup.array().label("Reminder dates"),
  extraSubscribers: Yup.array().label("Extra subscribers"),
});

const DistributionEventForm = ({ navigation, route }) => {
  const { addDistributionEvent, updateDistributionEvent } = useART();
  const [loading, setLoading] = useState(false);
  const { event, groups } = route.params;
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: `ART Distribution event ${
      event ? "Updated" : "Added"
    } Successfully!`,
    mode: "success",
  });
  const { colors, roundness } = useTheme();

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    let response;
    if (event) {
      response = await updateDistributionEvent(event._id, values);
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
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Logo size={screenWidth * 0.4} />
        </View>
        <View style={styles.form}>
          <Form
            initialValues={
              event
                ? {
                    title: event.title,
                    distributionTime: event.distributionTime,
                    distributionLocation: {
                      latitude: event.distributionLocation.latitude,
                      longitude: event.distributionLocation.longitude,
                      address: event.distributionLocation.address,
                    },
                    group: event.group._id,
                    remarks: event.remarks,
                    remiderNortificationDates: event.remiderNortificationDates,
                    extraSubscribers: event.extraSubscribers.map((user) => ({
                      name: user.name,
                      phoneNumber: user.phoneNumber,
                    })),
                  }
                : {
                    title: "",
                    distributionTime: "",
                    distributionLocation: null,
                    group: "",
                    remarks: "",
                    remiderNortificationDates: [],
                    extraSubscribers: [],
                  }
            }
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <FormField
              name="title"
              placeholder="Enter event title"
              label="Event title"
              icon="calendar"
            />
            <FormDateTimePicker
              defaultMode="datetime"
              name="distributionTime"
              icon="clock"
              formarter={(value) =>
                `${moment(value).format("ddd Do MMM yyy HH:mm")} hrs`
              }
              label={"Distribution Time"}
            />
            <FormDatesListPicker
              defaultMode="datetime"
              name="remiderNortificationDates"
              icon="clock"
              formarter={(value) =>
                `${moment(value).format("ddd Do MMM yyy HH:mm")} hrs`
              }
              label={"Reminder dates"}
            />
            <DistributionVenueInput
              name="distributionLocation"
              icon="google-maps"
              placeholder="Enter event venue"
              label="Event venue"
            />
            {/* <FormLocationPicker name="distributionLocation" /> */}
            <FormItemPicker
              name="group"
              icon="account-group"
              searchable
              label="Distribution group"
              data={groups}
              valueExtractor={({ _id }) => _id}
              labelExtractor={({ title }) => title}
              renderItem={({ item }) => (
                <List.Item
                  title={item.title}
                  style={styles.listItem}
                  left={(props) => (
                    <List.Icon {...props} icon="account-group" />
                  )}
                />
              )}
              itemContainerStyle={[
                styles.itemContainer,
                { borderRadius: roundness },
              ]}
            />
            <ExtraSubscribersForm
              name="extraSubscribers"
              icon="account-group"
            />
            <FormField
              placeholder="Enter Remarks"
              label="Event Remarks"
              name="remarks"
              icon="information-variant"
              multiline
              numberOfLines={10}
            />
            <FormSubmitButton
              title={
                event
                  ? "Update ART Distribution event"
                  : "Add ART Distribution event"
              }
              mode="contained"
              style={styles.btn}
              loading={loading}
              disabled={loading}
            />
            <View style={{ flex: 1 }} />
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

export default DistributionEventForm;

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
});
