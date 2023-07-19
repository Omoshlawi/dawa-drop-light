import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DropDown } from "../input";
import { useFormikContext } from "formik";
import { useTheme } from "react-native-paper";

const FormDropDown = ({ name, ...otherprops }) => {
  const {
    values,
    handleChange,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
  } = useFormikContext();
  const {
    colors: { error },
  } = useTheme();
  return (
    <View style={styles.container}>
      <DropDown
        defaultValue={values[name]}
        onChangeValue={(value) => {
          setFieldValue(name, value);
        }}
        {...otherprops}
      />
      {errors[name] && touched[name] && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </View>
  );
};

export default FormDropDown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
});
