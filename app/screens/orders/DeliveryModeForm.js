import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeArea } from "../../components/layout";
import * as Yup from "yup";
import { useAuthorize, useOrder } from "../../api";
import Logo from "../../components/Logo";
import { Form, FormField, FormSubmitButton } from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { getFormFileFromUri, getImageUrl, pickX } from "../../utils/helpers";
import { Dialog, getDialogIcon } from "../../components/dialog";
import { Button, List, Text, useTheme } from "react-native-paper";

const validationSchemer = Yup.object().shape({
  name: Yup.string().label("Delivery mode").required(),
});

const DeliveryModeForm = ({ navigation, route }) => {
  const mode = route.params;

  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Delivery Mode Added Successfully!",
    success: true,
  });
  const { colors } = useTheme();

  const [loading, setLoading] = useState(false);

  const { updateDeliveryMode, addDeliveryMode } = useOrder();

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    let response;
    if (mode) {
      response = await updateDeliveryMode(mode._id, values);
    } else {
      response = await addDeliveryMode(values);
    }
    setLoading(false);
    if (response.ok) {
      setDialogInfo({ ...dialogInfo, show: response.ok, success: response.ok });
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
              mode
                ? pickX(mode, ["name"])
                : {
                    name: "",
                  }
            }
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <FormField
              placeholder="Enter Delivery mode name"
              label="Delivery mode"
              name="name"
              icon="truck-delivery"
            />

            <FormSubmitButton
              title={mode ? "Update delivery mode" : "Add Delivery mode"}
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

export default DeliveryModeForm;

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
