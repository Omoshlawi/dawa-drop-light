import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DropDown } from "../input";
import { useFormikContext } from "formik";
import { useTheme } from "react-native-paper";

const FormDropDown = ({ name, ...otherprops }) => {
  const { values, handleChange, touched, errors, setFieldTouched } =
    useFormikContext();
  const {
    colors: { error },
  } = useTheme();
  console.log(values);
  return (
    <View style={styles.container}>
      <DropDown
        defaultValue={values[name]}
        onChangeValue={handleChange(name)}
        {...otherprops}
      />
      {errors[name] && touched && (
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
