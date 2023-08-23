import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { useAuthorize } from "../../api";
import Logo from "../../components/Logo";
import { Form, FormField, FormSubmitButton } from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { AlertDialog, Dialog } from "../../components/dialog";
import { useTheme } from "react-native-paper";

const validationSchemer = Yup.object().shape({
  name: Yup.string().label("Model Name").required(),
  description: Yup.string().label("Model Description"),
  modelCode: Yup.string().label("Model Code").required(),
});

const ARTModelForm = ({ navigation, route }) => {
  const { addARTModels, updateARTModels } = useAuthorize();
  const [loading, setLoading] = useState(false);
  const artModel = route.params;
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: `ART model ${artModel ? "Updated" : "Added"} Successfully!`,
    mode: "success",
  });
  const { colors, roundness } = useTheme();

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    let response;
    if (artModel) {
      response = await updateARTModels(artModel._id, values);
    } else {
      response = await addARTModels(values);
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
      }
      console.log(response.data);
    }
  };
  return (
    <View style={styles.screen}>
      <Logo size={screenWidth * 0.4} />
      <View style={styles.form}>
        <Form
          initialValues={
            artModel
              ? {
                  name: artModel.name,
                  description: artModel.description,
                  modelCode: artModel.modelCode,
                }
              : {
                  name: "",
                  description: "",
                  modelCode: "",
                }
          }
          validationSchema={validationSchemer}
          onSubmit={handleSubmit}
        >
          <FormField
            placeholder="Enter Model name"
            label="Model name"
            name="name"
            icon="account-group"
          />
          <FormField
            placeholder="Enter Model Description"
            label="Model description"
            name="description"
            icon="information-variant"
            multiline
            numberOfLines={10}
          />

          <FormField
            placeholder="Enter Model Code"
            label="Model desccodeription"
            name="modelCode"
            icon="identifier"
          />

          <FormSubmitButton
            title={artModel ? "Update Role" : "Add Role"}
            mode="contained"
            style={styles.btn}
            loading={loading}
            disabled={loading}
          />
          <View style={{ flex: 1 }} />
        </Form>
      </View>
      <Dialog visible={dialogInfo.show}>
        <AlertDialog
          mode={dialogInfo.mode}
          message={dialogInfo.message}
          onButtonPress={() => {
            navigation.goBack();
          }}
        />
      </Dialog>
    </View>
  );
};

export default ARTModelForm;

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
});
