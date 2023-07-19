import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import { ModalPicker } from "../input";
import { useTheme } from "react-native-paper";

const FormModalPicker = ({ name, ...otherProps }) => {
  const { setFieldValue, errors, values, touched, handleChange } =
    useFormikContext();
  const {
    colors: { error },
  } = useTheme();
  return (
    <>
      <ModalPicker
        value={values[name] ? `${values[name]}` : ""}
        onSelectItem={handleChange(name)}
        {...otherProps}
      />
      {errors[name] && touched[name] && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </>
  );
};

export default FormModalPicker;

const styles = StyleSheet.create({});
