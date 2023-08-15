import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { useTheme, Text } from "react-native-paper";
import {
  Form,
  FormCheckBox,
  FormField,
  FormScanner,
  FormSubmitButton,
} from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { AlertDialog, Dialog } from "../../components/dialog";
import { useAuthorize, usePatient } from "../../api";
const initialValues = {
  careGiver: "",
  canPickUpDrugs: false,
  canOrderDrug: false,
};

const validationSchemer = Yup.object().shape({
  careGiver: Yup.string().label("Care giver").required(),
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
        mode: "success",
        message: "Treatment surporter added successfully",
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
                  careGiver: treatmentSurport.careGiver,
                  canPickUpDrugs: treatmentSurport.canPickUpDrugs,
                  canOrderDrug: treatmentSurport.canOrderDrug,
                }
              : initialValues
          }
          validationSchema={validationSchemer}
          onSubmit={handleSubmit}
        >
          <FormScanner label="Scan Caregiver code" name="careGiver" />
          <FormField
            name="careGiver"
            label="Care Giver"
            icon="account-outline"
          />
          <FormCheckBox name="canPickUpDrugs" label="Can pick up drugs?" />
          <FormCheckBox name="canOrderDrug" label="Can Order drugs?" />

          <FormSubmitButton
            title="Submit"
            mode="contained"
            loading={loading}
            disabled={loading}
            style={styles.btn}
          />
        </Form>
      </View>
      <Dialog
        visible={dialogInfo.show}
        swipable
        onRequestClose={() => {
          setDialogInfo({ ...dialogInfo, show: false });
        }}
      >
        <AlertDialog
          message={dialogInfo.message}
          mode={dialogInfo.mode}
          onButtonPress={() => {
            setDialogInfo({ ...dialogInfo, show: false });
            if (dialogInfo.mode === "success") {
              navigation.goBack();
            }
          }}
        />
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
