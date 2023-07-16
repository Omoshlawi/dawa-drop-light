import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Text, TextInput, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { ItemPicker } from "../input";

const FormItemPicker = ({ name, ...otherProps }) => {
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
      <ItemPicker
        value={values[name]}
        onValueChange={(value) => setFieldValue(name, value)}
        // onValueChange={(value) => console.log(value)}
        {...otherProps}
      />
      {errors[name] && touched && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </View>
  );
};

export default FormItemPicker;

const styles = StyleSheet.create({});
