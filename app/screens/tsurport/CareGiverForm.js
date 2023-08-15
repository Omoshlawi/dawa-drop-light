import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { useTheme, Text } from "react-native-paper";
import Logo from "../../components/Logo";
import {
  Form,
  FormCheckBox,
  FormItemPicker,
  FormSubmitButton,
} from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { AlertDialog, Dialog } from "../../components/dialog";
import { RemoteItemPicker } from "../../components/input";
import { useAuthorize, useUser } from "../../api";
const initialValues = {
  careGiver: "",
  canPickUpDrugs: false,
  canOrderDrug: false,
};

const validationSchemer = Yup.object().shape({
  careGiver: Yup.string().label("Username").required(),
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
  const { colors, roundness } = useTheme();
  const { getUsers } = useAuthorize();
  const handleSubmit = async (values, { setErrors, errors }) => {
    let response;
    setLoading(true);
    if (treatmentSurport)
      response = await updateTreatmentSurporter(treatmentSurport._id, values);
    else response = await addTreatmentSurporter(values);
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
      <Logo />
      <Text variant="headlineLarge">Add Caregiver</Text>
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
          <RemoteItemPicker
            name="careGiver"
            searchable
            remoteConfig={{
              get: getUsers,
              paramKey: "q",
              responseResultsExtractor: (response) => response.results,
              isRequestSuccessfull: (response) => response.ok,
            }}
            labelExtractor={(item) =>
              `${item.firstName} ${item.lastName} (${item.email})`
            }
            placeholder="Select Care giver"
            valueExtractor={(item) => item._id}
            renderItem={({ item, selected }) => (
              <List.Item
                title={`${item.firstName} ${item.lastName} (${item.email})`}
                left={(props) => (
                  <List.Icon {...props} icon="shield-lock-outline" />
                )}
              />
            )}
            itemContainerStyle={[
              styles.itemContainer,
              { borderRadius: roundness },
            ]}
            icon="format-list-checks"
            label="Care giver"
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
