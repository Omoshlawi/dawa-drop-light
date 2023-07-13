import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import AppErrorMessage from "./AppErrorMessage";
import { DateTimePicker } from "../input";

const FormDateTimePicker = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, touched, errors, values } =
    useFormikContext();
  return (
    <>
      <DateTimePicker
        value={values[name]}
        onChangeDate={(date) => {
          const selectedDate = new Date(date);
          handleChange(name)(selectedDate.toISOString());
        }}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormDateTimePicker;

const styles = StyleSheet.create({});
