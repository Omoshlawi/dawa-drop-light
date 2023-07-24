import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeArea } from "../../components/layout";
import * as Yup from "yup";
import { useOrder } from "../../api";
import Logo from "../../components/Logo";
import {
  Form,
  FormDateTimePicker,
  FormDropDown,
  FormField,
  FormImagePicker,
  FormItemPicker,
  FormModalPicker,
  FormSubmitButton,
} from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { getFormFileFromUri, getImageUrl, pickX } from "../../utils/helpers";
import { Dialog, getDialogIcon } from "../../components/dialog";
import { Button, List, Text, useTheme } from "react-native-paper";
import { DropDown, ItemPicker, ModalPicker } from "../../components/input";
import routes from "../../navigation/routes";
import moment from "moment/moment";

const validationSchemer = Yup.object().shape({
  label: Yup.string().label("Label").required(),
  startTime: Yup.date().label("Start time").required(),
  endTime: Yup.date().label("End time").required(),
  capacity: Yup.number().label("Capacity").required(),
});

const DeliveryTimeSlotForm = ({ navigation, route }) => {
  const { addDeliveryTimeSlot, updateDeliveryTimeSlot } = useOrder();
  const timeSlot = route.params;
  const [loading, setLoading] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Time slot mordified Successfully!",
    mode: "success",
  });
  const { colors } = useTheme();

  const handleSubmit = async (values, { setErrors, errors }) => {
    console.log(values);
    let response;
    if (timeSlot) {
      response = await updateDeliveryTimeSlot(timeSlot._id, values);
    } else {
      response = await addDeliveryTimeSlot(values);
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
  return (
    <SafeArea>
      <View style={styles.screen}>
        <View style={styles.form}>
          <Form
            initialValues={
              timeSlot
                ? pickX({ ...timeSlot, image: getImageUrl(timeSlot.image) }, [
                    "label",
                    "startTime",
                    "endTime",
                    "capacity",
                  ])
                : {
                    label: "",
                    startTime: "",
                    endTime: "",
                    capacity: "",
                  }
            }
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <View style={{ alignItems: "center", padding: 10 }}>
              <Logo size={150} />
            </View>
            <FormField
              placeholder="Enter Time slot Label"
              label="Time Slot Label"
              name="label"
              icon="label"
            />
            <FormDateTimePicker
              name="startTime"
              icon="timer-sand"
              formarter={(value) => moment(value).format("HH:mm")}
            />
            <FormDateTimePicker
              name="endTime"
              icon="timer-sand-complete"
              formarter={(value) => moment(value).format("HH:mm")}
            />
            <FormField
              placeholder="Enter time slot capacilty"
              label="Time slot capacity"
              name="capacity"
              icon="size-s"
              inputMode="numeric"
            />

            <FormSubmitButton
              title={
                timeSlot ? "Update Time slot option" : "Add time slot option"
              }
              mode="contained"
              style={styles.btn}
              loading={loading}
              disabled={loading}
            />
            <View style={{ flex: 1 }} />
          </Form>
        </View>
      </View>
      <Dialog
        visible={dialogInfo.show}
        title={dialogInfo.success ? "Success!" : "Failure!"}
      >
        <View style={styles.dialog}>
          <Image
            style={styles.img}
            source={getDialogIcon(dialogInfo.success ? "success" : "error")}
          />
          <Text style={styles.text}>{dialogInfo.message}</Text>
          <Button
            mode="outlined"
            onPress={() => {
              setDialogInfo({ ...dialogInfo, show: false });
              if (dialogInfo.success) navigation.goBack();
            }}
          >
            Ok
          </Button>
        </View>
      </Dialog>
    </SafeArea>
  );
};

export default DeliveryTimeSlotForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  form: {
    width: "100%",
    padding: 10,
    flex: 1,
  },
  btn: {
    marginVertical: 20,
  },
  dialog: {
    width: screenWidth * 0.75,
  },
  img: {
    alignSelf: "center",
    width: 100,
    height: 100,
  },
  text: {
    textAlign: "center",
    padding: 10,
  },
  itemContainer: {
    marginBottom: 5,
    // padding: 10,
  },
});
