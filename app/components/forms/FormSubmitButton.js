import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, useTheme } from "react-native-paper";
import { useFormikContext } from "formik";

const FormSubmitButton = ({
  title,
  loading = false,
  disabled = false,
  ...otherProps
}) => {
  const { handleSubmit } = useFormikContext();
  const { colors } = useTheme();
  return (
    <Button
      loading={loading}
      onPress={disabled ? () => {} : handleSubmit}
      buttonColor={disabled ? colors.disabled : undefined}
      {...otherProps}
      mode="contained"
    >
      {title}
    </Button>
  );
};

export default FormSubmitButton;
