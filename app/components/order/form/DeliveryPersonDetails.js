import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import { usePatient } from "../../../api";
import { useFormikContext } from "formik";

const DeliveryPersonDetails = ({
  onFormStateChange,
  value,
  name = "careGiver",
}) => {
  const formState = value || {
    fullName: "",
    nationalId: "",
    phoneNumber: "",
  };

  const [loading, setLoading] = useState(false);
  const { setFieldValue, errors } = useFormikContext();
  useEffect(() => {
    if (onFormStateChange instanceof Function) {
      onFormStateChange(formState);
    }
  }, [formState]);

  const resetFormErrors = (field) => {
    if (!field) setErrors({ fullName: "", nationalId: "", phoneNumber: "" });
    else if (errors[field] !== undefined) setErrors({ ...errors, [field]: "" });
  };
  return (
    <View>
      <TextInput
        placeholder="Enter Full name"
        label="Name"
        left={<TextInput.Icon icon="account" />}
        mode="outlined"
        onChangeText={(fullName) => {
          setFieldValue(name, { ...formState, fullName });
          resetFormErrors("fullName");
        }}
      />
      <TextInput
        placeholder="Enter National Id"
        label="National id"
        left={<TextInput.Icon icon="identifier" />}
        mode="outlined"
        onChangeText={(nationalId) => {
          setFieldValue(name, { ...formState, nationalId });
          resetFormErrors("nationalId");
        }}
      />
      <TextInput
        placeholder="Enter Phone number"
        label="Phone number"
        left={<TextInput.Icon icon="phone" />}
        mode="outlined"
        onChangeText={(phoneNumber) => {
          setFieldValue(name, { ...formState, phoneNumber });
          resetFormErrors("phoneNumber");
        }}
      />
      {errors.phoneNumber && (
        <HelperText type="error" visible={errors[name]}>
          {errors[name]}
        </HelperText>
      )}
    </View>
  );
};

export default DeliveryPersonDetails;

const styles = StyleSheet.create({});
