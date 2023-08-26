import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DateTimeListPicker } from "../input";
import { useFormikContext } from "formik";
import { useTheme } from "react-native-paper";

const FormDatesListPicker = ({ name, ...otherProps }) => {
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
      <DateTimeListPicker
        value={
          values[name].length > 0 ? values[name].map((v) => new Date(v)) : []
        }
        onChangeValue={(value) => {
          setFieldValue(
            name,
            value.map((v) => new Date(v).toISOString())
          );
        }}
        {...otherProps}
      />
      {errors[name] && touched[name] && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </View>
  );
};

export default FormDatesListPicker;

const styles = StyleSheet.create({});
