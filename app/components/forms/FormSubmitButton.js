import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { useFormikContext } from "formik";

const FormSubmitButton = ({ title, loading = false, disabled=false, ...otherProps }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <Button loading={loading} onPress={handleSubmit} {...otherProps}>
      {title}
    </Button>
  );
};

export default FormSubmitButton;
