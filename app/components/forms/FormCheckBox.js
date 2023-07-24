import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Text, TextInput, useTheme } from "react-native-paper";
import { View } from "react-native";
import { CheckBox } from "../input";

const FormCheckBox = ({ name, label }) => {
  const {
    setFieldTouched,
    handleChange,
    touched,
    errors,
    values,
    setFieldValue,
  } = useFormikContext();
  const {
    colors: { secondary, error },
  } = useTheme();
  return (
    <View>
      <CheckBox
        text={label}
        value={values[name]}
        onValueChange={(value) => {
          setFieldValue(name, value);
        }}
      />
      {errors[name] && touched[name] && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </View>
  );
};

export default FormCheckBox;

const styles = StyleSheet.create({});
