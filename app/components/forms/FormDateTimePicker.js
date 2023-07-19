import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import { DateTimePicker } from "../input";

const FormDateTimePicker = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, touched, errors, values } =
    useFormikContext();
  const {
    colors: { secondary, error },
  } = useTheme();
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
      {errors[name] && touched[name] && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </>
  );
};

export default FormDateTimePicker;

const styles = StyleSheet.create({});
