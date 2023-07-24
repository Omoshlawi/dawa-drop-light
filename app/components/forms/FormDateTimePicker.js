import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import { DateTimePicker } from "../input";
import { useTheme } from "react-native-paper";

const FormDateTimePicker = ({ name, ...otherProps }) => {
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
    <>
      <DateTimePicker
        value={values[name]}
        onChangeValue={(value) => {
          console.log(values);
          setFieldValue(name, new Date(value).toISOString());
        }}
        {...otherProps}
      />
      {errors[name] && touched[name] && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </>
  );
};

export default FormDateTimePicker;

const styles = StyleSheet.create({});
