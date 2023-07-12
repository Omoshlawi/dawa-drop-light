import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import { TextInput } from "react-native-paper";

const FormField = ({
  name,
  placeholder,
  label,
  password = false,
  ...otherProps
}) => {
  const { setFieldTouched, handleChange, touched, errors, values } =
    useFormikContext();
  const [hide, setHide] = useState(true);
  console.log(errors);
  return (
    <TextInput
      mode="outlined"
      label={label}
      placeholder={placeholder}
      onBlur={() => setFieldTouched(name)}
      onChangeText={handleChange(name)}
      value={values[name] ? `${values[name]}` : ""}
      error={Boolean(errors[name])}
      secureTextEntry={password && hide}
      right={
        password ? (
          <TextInput.Icon
            icon={hide ? "eye" : "eye-off"}
            onPress={() => setHide(!hide)}
          />
        ) : undefined
      }
      {...otherProps}
    />
  );
};

export default FormField;

const styles = StyleSheet.create({});
