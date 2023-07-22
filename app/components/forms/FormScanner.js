import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import { useTheme } from "react-native-paper";
import { CodeScanner } from "../scanner";

const FormScanner = ({ name }) => {
  const { setFieldValue, errors, values, touched, handleChange } =
    useFormikContext();
  const {
    colors: { error },
  } = useTheme();
  return (
    <View>
      <CodeScanner onScaned={(value) => setFieldValue(name, value)} />
      {errors[name] && touched[name] && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </View>
  );
};

export default FormScanner;

const styles = StyleSheet.create({});