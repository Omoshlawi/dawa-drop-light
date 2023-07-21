import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import { useTheme } from "react-native-paper";
import { LocationPicker } from "../map";

const FormLocationPicker = ({ name }) => {
  const { setFieldValue, errors, values, touched, handleChange } =
    useFormikContext();
  const {
    colors: { error },
  } = useTheme();
  return (
    <View>
      <LocationPicker
        location={values[name]}
        onLocationChange={(value) => {
          setFieldValue(name, value);
          //   handleChange(name)(value);
        }}
      />
      {errors[name] && touched[name] && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </View>
  );
};

export default FormLocationPicker;

const styles = StyleSheet.create({});
