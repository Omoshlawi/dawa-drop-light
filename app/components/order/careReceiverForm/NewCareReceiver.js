import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";
import { usePatient } from "../../../api";

const NewCareReceiver = ({ onPostVeryfy }) => {
  const [formState, setFormState] = useState({
    cccNumber: "",
    firstName: "",
    upiNo: "",
  });
  const [errors, setErrors] = useState({
    cccNumber: "",
    firstName: "",
    upiNo: "",
  });
  const [loading, setLoading] = useState(false);

  const { verifyPatientAndAddAsCareReceiver } = usePatient();

  const handleVerify = async () => {
    resetFormErrors;
    setLoading(true);
    const response = await verifyPatientAndAddAsCareReceiver(formState);
    setLoading(false);
    if (response.ok) {
      if (onPostVeryfy instanceof Function)
        onPostVeryfy({
          dialog: {
            show: true,
            mode: "success",
            message: "Care receiver provided is valid and added to you network",
          },
          careReceiver: response.data,
        });
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
      } else {
        if (onPostVeryfy instanceof Function)
          onPostVeryfy({
            dialog: {
              show: true,
              mode: "error",
              message: response.data.detail,
            },
          });
      }
    }
  };

  const resetFormErrors = (field) => {
    if (!field) setErrors({ cccNumber: "", firstName: "", upiNo: "" });
    else if (errors[field] !== undefined) setErrors({ ...errors, [field]: "" });
  };
  return (
    <View>
      <View>
        <TextInput
          placeholder="Enter Patient ccc Number"
          label="Patient ccc Number"
          left={<TextInput.Icon icon="identifier" />}
          mode="outlined"
          onChangeText={(cccNumber) => {
            setFormState({ ...formState, cccNumber });
            resetFormErrors("cccNumber");
          }}
          error={errors.cccNumber}
        />
        {errors.cccNumber && (
          <HelperText type="error" visible={errors.cccNumber}>
            {errors.cccNumber}
          </HelperText>
        )}
      </View>
      <View>
        <TextInput
          placeholder="Enter patient first name"
          label="Fist name"
          left={<TextInput.Icon icon="account" />}
          mode="outlined"
          onChangeText={(firstName) => {
            setFormState({ ...formState, firstName });
            resetFormErrors("firstName");
          }}
          error={errors.firstName}
        />
        {errors.firstName && (
          <HelperText type="error" visible={errors.firstName}>
            {errors.firstName}
          </HelperText>
        )}
      </View>
      <View>
        <TextInput
          placeholder="Enter patient UPI no"
          label="Patient UPI Number(Optional)"
          left={<TextInput.Icon icon="identifier" />}
          mode="outlined"
          onChangeText={(upiNo) => {
            setFormState({ ...formState, upiNo });
            resetFormErrors("upiNo");
          }}
          error={errors.upiNo}
        />
        {errors.upiNo && (
          <HelperText type="error" visible={errors.upiNo}>
            {errors.upiNo}
          </HelperText>
        )}
      </View>
      <Button onPress={handleVerify} loading={loading} disabled={loading}>
        Verify
      </Button>
    </View>
  );
};

export default NewCareReceiver;

const styles = StyleSheet.create({});
