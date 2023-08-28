import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Text, TextInput, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

const DistributionVenueInput = ({
  name,
  placeholder,
  label,
  password = false,
  icon,
  ...otherProps
}) => {
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
  const [hide, setHide] = useState(true);
  return (
    <View>
      <TextInput
        mode="outlined"
        label={label}
        placeholder={placeholder}
        onBlur={() => setFieldTouched(name)}
        onChangeText={(venue) =>
          setFieldValue(name, { ...values[name], address: venue })
        }
        value={values[name] ? `${values[name].address}` : ""}
        error={Boolean(errors[name] && touched[name])}
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
      {errors[name] && touched[name] && (
        <Text style={{ color: error, paddingLeft: 5 }}>
          {typeof errors[name] === "object"
            ? Object.values(errors[name]).join(", ")
            : `${errors[name]}`}
        </Text>
      )}
    </View>
  );
};

export default DistributionVenueInput;

const styles = StyleSheet.create({});
