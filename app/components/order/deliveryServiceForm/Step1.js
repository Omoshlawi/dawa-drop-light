import { StyleSheet, View, Image, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Button,
  HelperText,
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
import { useFormikContext } from "formik";
import MemberFeedBack from "./MemberFeedBack";
import { CardTitle } from "../../common";
import moment from "moment/moment";

const Step1 = ({ event, onNext, order }) => {
  const { colors, roundness } = useTheme();
  const { validateForm } = useFormikContext();
  const { values, setFieldValue, setFieldTouched, errors } = useFormikContext();
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.img}>
          <Image
            style={styles.img}
            source={require("./../../../assets/arrived.png")}
            resizeMode="contain"
          />
        </View>
        <Text style={{ textAlign: "center" }} variant="headlineSmall">
          Step 1: Get started
        </Text>
        <View style={styles.content}>
          <View style={styles.form}>
            {order && (
              <View
                style={{
                  backgroundColor: colors.surface,
                  padding: 10,
                  borderRadius: roundness,
                }}
              >
                <CardTitle text="Order id" subText={order._id} icon="cart" />
                {order.patient.length > 0 && (
                  <CardTitle
                    text={"Ordered for ?"}
                    subText={`${order.patient[0].firstName} ${order.patient[0].lastName}`}
                    icon="account"
                  />
                )}
                {order.appointment && (
                  <CardTitle
                    text={`${order.appointment.appointment_type} Appointment`}
                    subText={`${moment(
                      order.appointment.appointment_date
                    ).format("Do ddd MMM yyyy")}`}
                    icon="calendar"
                  />
                )}
              </View>
            )}
            {event && (
              <>
                <FormItemPicker
                  name="member"
                  icon="account-group"
                  searchable
                  label="Subscriber"
                  data={event.patientSubscribers.filter(
                    //Exlude patient who have their drugs delivered already
                    (pat) =>
                      event.deliveries.findIndex(
                        (d) => d.patient === pat._id
                      ) === -1
                  )}
                  valueExtractor={({ _id }) => _id}
                  labelExtractor={({ firstName, lastName, cccNumber }) =>
                    `${firstName} ${lastName} (${cccNumber})`
                  }
                  renderItem={({
                    item: { firstName, lastName, cccNumber },
                  }) => (
                    <List.Item
                      title={`${firstName} ${lastName} (${cccNumber})`}
                      style={styles.listItem}
                      left={(props) => (
                        <List.Icon {...props} icon="account-group" />
                      )}
                    />
                  )}
                  itemContainerStyle={[
                    styles.itemContainer,
                    { borderRadius: roundness },
                  ]}
                />
              </>
            )}
            <MemberFeedBack event={event} />

            <Button
              onPress={async () => {
                const fields = ["member", "deliveryType"];
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
              mode="contained"
              style={styles.navBtn}
            >
              Next
            </Button>
          </View>
        </View>
      </ScrollView>
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
    // padding: 20,
  },
});
