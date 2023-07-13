import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Text, TextInput, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

const FormField = ({
  name,
  placeholder,
  label,
  password = false,
  icon,
  ...otherProps
}) => {
  const { setFieldTouched, handleChange, touched, errors, values } =
    useFormikContext();
  const {
    colors: { secondary, error },
  } = useTheme();
  const [hide, setHide] = useState(true);
  return (
    <View>
      <TextInput
        mode="outlined"
        label={label}
        placeholder={placeholder}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        value={values[name] ? `${values[name]}` : ""}
        error={Boolean(errors[name])}
        secureTextEntry={password && hide}
        left={
          icon ? <TextInput.Icon icon={icon} color={secondary} /> : undefined
        }
        right={
          password ? (
            <TextInput.Icon
              icon={hide ? "eye" : "eye-off"}
              onPress={() => setHide(!hide)}
              color={secondary}
            />
          ) : undefined
        }
        {...otherProps}
      />
      {errors[name] && touched && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </View>
  );
};

export default FormField;
