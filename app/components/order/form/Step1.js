import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Button, List, RadioButton, Text, useTheme } from "react-native-paper";
import { screenWidth } from "../../../utils/contants";
import moment from "moment/moment";
import { useFormikContext } from "formik";
import { FormItemPicker } from "../../forms";

const Step1 = ({ onNext, appointment, event }) => {
  const { colors, roundness } = useTheme();
  const { values, setFieldValue, validateForm, setFieldTouched } =
    useFormikContext();
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={require("../../../assets/fast-dev.png")}
          resizeMode="contain"
        />
      </View>
      <Text variant="headlineLarge">STEP 1: Patient Information</Text>
      <View style={styles.dataContainer}>
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
        {values["type"] === "other" && (
          <>
            <FormItemPicker
              name="careReceiver"
              icon="account"
              searchable
              label="Care receiver"
              data={[]}
              valueExtractor={({ _id }) => _id}
              labelExtractor={({ name }) => name}
              renderItem={({ item }) => (
                <List.Item
                  title={item.name}
                  style={styles.listItem}
                  left={(props) => <List.Icon {...props} icon="truck" />}
                />
              )}
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
            const fields = ["type", "careReceiver"];
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
  },
  listItem: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
  },
  dataContainer: {
    padding: 10,
  },
  itemContainer: {
    margin: 5,
  },
});
