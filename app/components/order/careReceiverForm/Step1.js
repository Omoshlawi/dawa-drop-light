import { StyleSheet, View, Image } from "react-native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Button,
  List,
  RadioButton,
  Text,
  useTheme,
} from "react-native-paper";
import { useUser } from "../../../api";
import { screenHeight, screenWidth } from "../../../utils/contants";
import { useFocusEffect } from "@react-navigation/native";
import { FormField, FormItemPicker } from "../../forms";
import { TouchableOpacity } from "react-native";
import NewCareReceiver from "./NewCareReceiver";
import { useFormikContext } from "formik";
/**
 * Choose the care receiver or search carereceiver by cccNumber and create relations
 * STEPS:
 * 1. Get all careReceivers with can Order privileges
 * 2.
 * @returns
 */
const Step1 = ({ onNext, onDialogInfoChange }) => {
  const { getTreatmentSurport, getUserId } = useUser();
  const { validateForm } = useFormikContext();
  const [careReceivers, setCareReceivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState("select");
  const userId = getUserId();
  const { values, setFieldValue, setFieldTouched } = useFormikContext();
  const handleFetch = async () => {
    setLoading(true);
    const resp = await getTreatmentSurport({ canOrderDrug: true });
    setLoading(false);
    if (resp.ok) {
      setCareReceivers(
        resp.data.results.filter((item) => {
          const { careGiver: careGiver_, careReceiver: careReceiver_ } = item;
          // asociation fully established and user is caregiver
          return careReceiver_ && careGiver_ && careGiver_ === userId;
        })
      );
    }
  };
  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  const { colors, roundness } = useTheme();
  return (
    <View style={styles.screen}>
      <View style={styles.img}>
        <Image
          style={styles.img}
          source={require("./../../../assets/surport.png")}
          resizeMode="contain"
        />
      </View>
      <Text style={{ textAlign: "center" }} variant="headlineSmall">
        Step 1: Care Receiver Information
      </Text>
      <View style={styles.content}>
        {loading && <ActivityIndicator />}
        <View style={styles.form}>
          <View
            style={{
              backgroundColor: colors.surface,
              padding: 20,
              borderRadius: roundness,
            }}
          >
            <Text variant="titleMedium">Who are you ordering for?</Text>
            <RadioButton.Group onValueChange={setChecked} value={checked}>
              <RadioButton.Item
                label="Select from existing relations"
                value="select"
                labelVariant="bodySmall"
              />
              <RadioButton.Item
                label="Add new patient care receiver"
                value="add"
                labelVariant="bodySmall"
              />
            </RadioButton.Group>
          </View>

          {!loading && checked === "select" && (
            <>
              <FormItemPicker
                name="careReceiver"
                icon="account"
                searchable
                label="Select CareReceiver"
                data={careReceivers}
                valueExtractor={({ _id }) => _id}
                labelExtractor={(careReceiver) => {
                  const name = `${
                    careReceiver.userCareReceiver[0].firstName &&
                    careReceiver.userCareReceiver[0].lastName
                      ? careReceiver.userCareReceiver[0].firstName +
                        " " +
                        careReceiver.userCareReceiver[0].lastName
                      : `${careReceiver.userCareReceiver[0].username}(${careReceiver.userCareReceiver[0].phoneNumber})`
                  }`;
                  return name;
                }}
                renderItem={({ item }) => {
                  const {
                    patientCareReceiver,
                    userCareGiver,
                    careGiver: careGiver_,
                    careReceiver: careReceiver_,
                    userCareReceiver,
                    _id,
                  } = item;
                  const careReceiver = patientCareReceiver[0];
                  const careGiver = userCareGiver[0];
                  const careReceiverUser = userCareReceiver[0];
                  const name = careReceiverUser
                    ? careReceiverUser.firstName && careReceiverUser.lastName
                      ? `${careReceiverUser.firstName} ${careReceiverUser.lastName}`
                      : `${careReceiverUser.username}`
                    : `${careReceiver.firstName} ${careReceiver.lastName}(${careReceiver.cccNumber})`;
                  const description = careReceiverUser
                    ? `${careReceiverUser.phoneNumber} | ${careReceiverUser.email}`
                    : undefined;
                  return (
                    <List.Item
                      title={name}
                      style={styles.listItem}
                      left={(props) => <List.Icon {...props} icon="account" />}
                      description={description}
                      descriptionStyle={{ color: colors.disabled }}
                    />
                  );
                }}
                itemContainerStyle={[
                  styles.itemContainer,
                  { borderRadius: roundness },
                ]}
              />
            </>
          )}
          {!loading && checked === "add" && (
            <NewCareReceiver
              onPostVeryfy={({ dialog, careReceiver }) => {
                onDialogInfoChange((dialogInfo) => ({
                  ...dialogInfo,
                  ...dialog,
                }));
                if (dialog.mode === "success") {
                  handleFetch();
                  setChecked("select");
                  setFieldValue("careReceiver", careReceiver._id);
                }
              }}
            />
          )}
        </View>
        <Button
          onPress={async () => {
            let valid = true;
            const errors = await validateForm(values);
            if (errors["careReceiver"]) {
              setFieldTouched("careReceiver", true);
              valid = false;
            }

            if (valid) onNext();
          }}
          mode="contained"
          style={styles.navBtn}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  img: {
    width: "100%",
    height: screenHeight * 0.2,
  },
  navBtn: {
    marginVertical: 5,
  },
  content: {
    padding: 10,
  },
  listItem: {
    padding: 10,
  },
  itemContainer: {
    margin: 5,
  },
  radio: {
    flexDirection: "row",
  },
  form: {
    padding: 20,
  },
});
