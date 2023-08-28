import { StyleSheet, View, Image } from "react-native";
import React from "react";
import {
  Button,
  HelperText,
  List,
  RadioButton,
  Text,
  useTheme,
} from "react-native-paper";
import { screenWidth } from "../../../utils/contants";
import moment from "moment/moment";
import { useFormikContext } from "formik";
import { FormItemPicker } from "../../forms";

const Step1 = ({ onNext, appointment, event, careReceivers }) => {
  const { colors, roundness } = useTheme();
  const {
    values,
    setFieldValue,
    validateForm,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext();
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={require("../../../assets/fast-dev.png")}
          resizeMode="contain"
        />
      </View>
      <Text variant="headlineLarge">STEP 1: Get started</Text>
      <View style={styles.dataContainer}>
        <RadioButton.Group
          onValueChange={(value) => {
            setFieldValue("type", value);
          }}
          value={values["type"]}
        >
          <RadioButton.Item
            label="Order for self"
            value="self"
            labelVariant="bodySmall"
          />
          <RadioButton.Item
            label="Order for another"
            value="other"
            labelVariant="bodySmall"
          />
        </RadioButton.Group>
        {errors["type"] && (
          <HelperText type="error" visible={errors["type"] && touched["type"]}>
            {errors["type"]}
          </HelperText>
        )}
        {values["type"] === "self" && (
          <>
            {appointment && (
              <List.Item
                style={[
                  styles.listItem,
                  { backgroundColor: colors.surface, borderRadius: roundness },
                ]}
                title={`${appointment.appointment_type} Appointment`}
                description={moment(appointment.next_appointment_date).format(
                  "Do dddd MMMM yyy"
                )}
                descriptionStyle={{ color: colors.disabled }}
                left={(props) => <List.Icon {...props} icon="calendar-clock" />}
              />
            )}
            {event && (
              <List.Item
                style={[
                  styles.listItem,
                  { backgroundColor: colors.surface, borderRadius: roundness },
                ]}
                title={event.title}
                description={moment(event.distributionTime).format(
                  "Do dddd MMMM yyy"
                )}
                descriptionStyle={{ color: colors.disabled }}
                left={(props) => <List.Icon {...props} icon="calendar-clock" />}
              />
            )}
          </>
        )}
        {errors["event"] && (
          <HelperText
            type="error"
            visible={errors["event"] && touched["event"]}
          >
            {errors["event"]}
          </HelperText>
        )}
        {errors["appointment"] && (
          <HelperText
            type="error"
            visible={errors["appointment"] && touched["appointment"]}
          >
            {errors["appointment"]}
          </HelperText>
        )}

        {values["type"] === "other" && (
          <>
            <FormItemPicker
              name="careReceiver"
              icon="account"
              searchable
              label="Care receiver"
              data={careReceivers}
              valueExtractor={({ _id }) => _id}
              labelExtractor={(item) => {
                const {
                  patientCareReceiver,
                  userCareGiver,
                  careGiver: careGiver_,
                  careReceiver: careReceiver_,
                  userCareReceiver,
                  _id,
                } = item;
                const careReceiver = patientCareReceiver[0];
                const careReceiverUser = userCareReceiver[0];
                const name = careReceiverUser
                  ? careReceiverUser.firstName && careReceiverUser.lastName
                    ? careReceiverUser.firstName +
                      " " +
                      careReceiverUser.lastName
                    : careReceiverUser.username
                  : `${careReceiver.firstName} ${careReceiver.lastName}`;
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
                const careReceiverUser = userCareReceiver[0];
                const name = careReceiverUser
                  ? careReceiverUser.firstName && careReceiverUser.lastName
                    ? careReceiverUser.firstName +
                      " " +
                      careReceiverUser.lastName
                    : careReceiverUser.username
                  : `${careReceiver.firstName} ${careReceiver.lastName}`;

                return (
                  <List.Item
                    title={name}
                    style={styles.listItem}
                    left={(props) => <List.Icon {...props} icon="account" />}
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
        {values["careReceiver"] && (
          <>
            <FormItemPicker
              name="careReceiver"
              icon="account"
              searchable
              label="Care receiver"
              data={careReceivers}
              valueExtractor={({ _id }) => _id}
              labelExtractor={(item) => {
                const {
                  patientCareReceiver,
                  userCareGiver,
                  careGiver: careGiver_,
                  careReceiver: careReceiver_,
                  userCareReceiver,
                  _id,
                } = item;
                const careReceiver = patientCareReceiver[0];
                const careReceiverUser = userCareReceiver[0];
                const name = careReceiverUser
                  ? careReceiverUser.firstName && careReceiverUser.lastName
                    ? careReceiverUser.firstName +
                      " " +
                      careReceiverUser.lastName
                    : careReceiverUser.username
                  : `${careReceiver.firstName} ${careReceiver.lastName}`;
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
                const careReceiverUser = userCareReceiver[0];
                const name = careReceiverUser
                  ? careReceiverUser.firstName && careReceiverUser.lastName
                    ? careReceiverUser.firstName +
                      " " +
                      careReceiverUser.lastName
                    : careReceiverUser.username
                  : `${careReceiver.firstName} ${careReceiver.lastName}`;

                return (
                  <List.Item
                    title={name}
                    style={styles.listItem}
                    left={(props) => <List.Icon {...props} icon="account" />}
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
        <Button
          mode="contained"
          style={{ marginTop: 10 }}
          onPress={async () => {
            const fields = ["type", "careReceiver", "appointment", "event"];
            const errors = await validateForm(values);
            const invalidFields = Object.keys(errors);
            let valid = true;
            for (const field of fields) {
              const inValid = invalidFields.includes(field);
              if (inValid) {
                valid = !inValid;
                setFieldTouched(field, true);
              }
            }
            if (valid) onNext();
          }}
        >
          PROCEED TO NEXT STEP
        </Button>
      </View>
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({
  img: {
    height: screenWidth * 0.5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  listItem: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
  },
  dataContainer: {
    padding: 10,
    width: "100%",
  },
  itemContainer: {
    margin: 5,
  },
});
