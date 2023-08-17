import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { useTheme, Text } from "react-native-paper";
import { Form, FormCheckBox, FormSubmitButton } from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { AlertDialog, Dialog } from "../../components/dialog";
import { useAuthorize, usePatient } from "../../api";
import Logo from "../../components/Logo";
import { CodeDisplayCopy } from "../../components/scanner";
const initialValues = {
  canPickUpDrugs: false,
  canOrderDrug: false,
};

const validationSchemer = Yup.object().shape({
  canPickUpDrugs: Yup.bool().label("Can pick up drugs?"),
  canOrderDrug: Yup.bool().label("Can order drugs?"),
});

const CareGiverForm = ({ navigation, route }) => {
  const treatmentSurport = route.params;
  const [loading, setLoading] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Care giver added successfully",
    mode: "success",
  });
  const { addCareGiver, updateCareGiver } = usePatient();
  const { colors, roundness } = useTheme();
  const { getUsers } = useAuthorize();
  const handleSubmit = async (values, { setErrors, errors }) => {
    console.log(values);
    let response;
    setLoading(true);
    if (treatmentSurport)
      response = await updateCareGiver(treatmentSurport._id, values);
    else response = await addCareGiver(values);
    setLoading(false);
    if (response.ok) {
      setDialogInfo({
        ...dialogInfo,
        show: response.ok,
        mode: "qr",
        message: response.data._id,
      });
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
    <View style={styles.screen}>
      <View style={styles.form}>
        <Form
          initialValues={
            treatmentSurport
              ? {
                  canPickUpDrugs: treatmentSurport.canPickUpDrugs,
                  canOrderDrug: treatmentSurport.canOrderDrug,
                }
              : initialValues
          }
          validationSchema={validationSchemer}
          onSubmit={handleSubmit}
        >
          <View style={{ alignItems: "center" }}>
            <Logo />
            <Text variant="headlineLarge">Add Caregiver</Text>
          </View>
          <FormCheckBox name="canPickUpDrugs" label="Can pick up drugs?" />
          <FormCheckBox name="canOrderDrug" label="Can Order drugs?" />

          <FormSubmitButton
            title="Get invitation code"
            mode="contained"
            loading={loading}
            disabled={loading}
            style={styles.btn}
          />
        </Form>
      </View>
      <Dialog
        visible={dialogInfo.show}
        onRequestClose={() => {
          setDialogInfo({ ...dialogInfo, show: false });
          if (dialogInfo.mode === "qr") {
            navigation.goBack();
          }
        }}
      >
        {dialogInfo.mode === "qr" && (
          <CodeDisplayCopy message={dialogInfo.message} />
        )}
        {(dialogInfo.mode === "success" || dialogInfo.mode === "error") && (
          <AlertDialog
            mode={dialogInfo.mode}
            message={dialogInfo.message}
            onButtonPress={() => {
              setDialogInfo({ ...dialogInfo, show: false });
              if (dialogInfo.mode === "success") {
                navigation.goBack();
              }
            }}
          />
        )}
      </Dialog>
    </View>
  );
};

export default CareGiverForm;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    paddingTop: 10,
  },
  form: {
    width: "100%",
    padding: 10,
  },
  btn: {
    marginVertical: 20,
  },
  dialog: {
    width: screenWidth * 0.75,
  },
});
