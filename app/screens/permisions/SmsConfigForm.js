import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeArea } from "../../components/layout";
import * as Yup from "yup";
import { useAuthorize } from "../../api";
import Logo from "../../components/Logo";
import {
  Form,
  FormDropDown,
  FormField,
  FormItemPicker,
  FormModalPicker,
  FormSubmitButton,
} from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { pickX } from "../../utils/helpers";
import { Dialog, getDialogIcon } from "../../components/dialog";
import { Button, List, Text, useTheme } from "react-native-paper";
import { DropDown, ItemPicker, ModalPicker } from "../../components/input";
import routes from "../../navigation/routes";

const validationSchemer = Yup.object().shape({
  name: Yup.string().label("Config Name").required(),
  description: Yup.string().label("Config Description"),
  smsType: Yup.string().label("Sms Type").required().oneOf(["EVENT_REMINDER"]),
  smsTemplate: Yup.string().label("Sms Template").required(),
});

const SmsConfigForm = ({ navigation, route }) => {
  const { addSmsConfig, updateSmsConfig } = useAuthorize();
  const smsConf = route.params;
  const [loading, setLoading] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: `Sms Config ${smsConf ? "Updated" : "Added"} Successfully!`,
    success: true,
  });
  const { colors, roundness } = useTheme();

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    let response;
    if (smsConf) {
      response = await updateSmsConfig(smsConf._id, values);
    } else {
      response = await addSmsConfig(values);
    }
    setLoading(false);
    if (response.ok) {
      setDialogInfo({
        ...dialogInfo,
        show: response.ok,
        success: response.ok,
        message: `Sms Config ${smsConf ? "Updated" : "Added"} Successfully!`,
      });
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
      } else {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          success: false,
          message: response.data?.detail || "Unknow Error Occured",
        });
        console.log(response.data);
      }
    }
  };
  return (
    <SafeArea>
      <View style={styles.screen}>
        <Logo size={screenWidth * 0.4} />
        <View style={styles.form}>
          <Form
            initialValues={
              smsConf
                ? {
                    name: smsConf.name,
                    description: smsConf.description,
                    smsTemplate: smsConf.smsTemplate,
                    smsType: smsConf.smsType,
                  }
                : {
                    name: "",
                    description: "",
                    smsTemplate: "",
                    smsType: "",
                  }
            }
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <FormField
              placeholder="Enter Config name"
              label="Sms Config name"
              name="name"
              icon="account-group"
            />
            <FormField
              placeholder="Enter Config Description"
              label="Sms Config description"
              name="description"
              icon="information-variant"
              multiline
              numberOfLines={10}
            />

            <FormItemPicker
              name="smsType"
              icon="tag-text"
              searchable
              label="Sms Template type"
              data={[{ id: "EVENT_REMINDER", name: "Event Remider" }]}
              valueExtractor={(val) => val.id}
              labelExtractor={(val) => val.name}
              renderItem={({ item, selected }) => (
                <List.Item
                  title={item.name}
                  style={styles.listItem}
                  left={(props) => <List.Icon {...props} icon="tag-text" />}
                  right={(props) => (
                    <List.Icon {...props} icon={"chevron-right"} />
                  )}
                />
              )}
              itemContainerStyle={[
                styles.itemContainer,
                { borderRadius: roundness },
              ]}
            />

            <FormField
              placeholder="Enter SMS Template"
              label="Sms Config template"
              name="smsTemplate"
              icon="card-text"
              multiline
              numberOfLines={10}
            />

            <FormSubmitButton
              title={smsConf ? "Update SMS Config" : "Add SMS Config"}
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

export default SmsConfigForm;

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
