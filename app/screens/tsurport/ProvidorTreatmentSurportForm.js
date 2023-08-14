import { StyleSheet, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Logo from "../../components/Logo";
import { Text, useTheme, List } from "react-native-paper";
import * as Yup from "yup";
import {
  Form,
  FormCheckBox,
  FormItemPicker,
  FormSubmitButton,
} from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { useProvidor } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { AlertDialog, Dialog } from "../../components/dialog";
import { pickX } from "../../utils/helpers";
const initialValues = {
  careGiver: "",
  careReceiver: "",
  canPickUpDrugs: false,
  canOrderDrug: false,
};

const validationSchemer = Yup.object().shape({
  careGiver: Yup.string().label("Username").required(),
  careReceiver: Yup.string().label("Password").required(),
  canPickUpDrugs: Yup.bool().label("Can pick up drugs?"),
  canOrderDrug: Yup.bool().label("Can order drugs?"),
});

const ProvidorTreatmentSurportForm = ({ navigation, route }) => {
  const { treatmentSurport } = route.params;
  const [loading, setLoading] = useState(false);
  const [careReceivers, setCareReceivers] = useState([]);
  const [careGivers, setCareGivers] = useState([]);

  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Treatment surporter added successfully",
    mode: "success",
  });
  const {
    getPatients,
    getUsers,
    addTreatmentSurporter,
    updateTreatmentSurporter,
  } = useProvidor();
  const { colors, roundness } = useTheme();
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
  const handleFetch = async () => {
    let response = await getPatients();
    if (response.ok) {
      setCareReceivers(response.data.results);
    }
    response = await getUsers();
    if (response.ok) {
      setCareGivers(response.data.results);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  return (
    <View style={styles.screen}>
      <Logo />
      <Text variant="headlineLarge">Add Treatment Surporter</Text>
      <View style={styles.form}>
        <Form
          initialValues={
            treatmentSurport
              ? {
                  careGiver: treatmentSurport.careGiver,
                  careReceiver: treatmentSurport.careReceiver,
                  canPickUpDrugs: treatmentSurport.canPickUpDrugs,
                  canOrderDrug: treatmentSurport.canOrderDrug,
                }
              : initialValues
          }
          validationSchema={validationSchemer}
          onSubmit={handleSubmit}
        >
          <FormItemPicker
            name="careGiver"
            searchable
            data={careGivers}
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
          <FormItemPicker
            name="careReceiver"
            data={careReceivers}
            searchable
            labelExtractor={(item) =>
              `${item.surName} ${item.firstName} ${item.lastName} (${item.cccNumber})`
            }
            placeholder="Select Care giver"
            valueExtractor={(item) => item._id}
            renderItem={({ item, selected }) => {
              const name = `${item.surName} ${item.firstName} ${item.lastName} (${item.cccNumber})`;
              return (
                <List.Item
                  title={name}
                  left={(props) => <List.Icon {...props} icon="account" />}
                />
              );
            }}
            itemContainerStyle={[
              styles.itemContainer,
              { borderRadius: roundness },
            ]}
            icon="format-list-checks"
            label="Care receiver"
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

export default ProvidorTreatmentSurportForm;

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
    margin: 5,
    // padding: 10,
  },
});
