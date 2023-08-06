import { StyleSheet, View } from "react-native";
import React from "react";
import * as Yup from "yup";
import { Form, FormField, FormSubmitButton, FormUrlField } from "../forms";
import { screenWidth } from "../../utils/contants";
import { List, useTheme, Text } from "react-native-paper";

const validationSchemer = Yup.object().shape({
  streamUrl: Yup.string()
    .label("Stream URL")
    .required()
    .matches(/(https?:\/\/[^\s]+)/g, "Invalid url"),
  location: Yup.object({
    latitude: Yup.number().required().label("Latitude"),
    longitude: Yup.number().required().label("Longitude"),
  }).label("Adrress"),
});

const AcceptDeliveryTaskForm = ({ defaultValues, onSubmit, loading }) => {
  const { colors, roundness } = useTheme();
  return (
    <View style={styles.form}>
      <Text variant="titleLarge" style={{ padding: 10 }}>
        Delivery Information
      </Text>
      <Form
        validationSchema={validationSchemer}
        initialValues={defaultValues}
        onSubmit={onSubmit}
      >
        <FormUrlField
          name="streamUrl"
          icon="link-plus"
          placeholder="Enter location stream url here"
          label="Location Share Url"
        />
        <List.Item
          style={{
            backgroundColor: colors.background,
            marginTop: 10,
            borderRadius: roundness,
            borderWidth: 1,
          }}
          title="Your current Location"
          left={(props) => <List.Icon {...props} icon="crosshairs-gps" />}
        />
        <View style={{ padding: 10 }} />
        <FormSubmitButton title="Submit" loading={loading} disabled={loading} />
      </Form>
    </View>
  );
};

export default AcceptDeliveryTaskForm;

const styles = StyleSheet.create({
  form: {
    width: screenWidth * 0.8,
  },
});
