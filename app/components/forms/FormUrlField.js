import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Text, TextInput, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import * as Clipboard from "expo-clipboard";

/** expo install expo-clipboard
 */

const FormUrlField = ({
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
  const handlePasteFromClipboard = async () => {
    const content = await Clipboard.getStringAsync();
    setFieldValue(name, extractUrlFromText(content));
  };

  return (
    <View>
      <TextInput
        mode="outlined"
        label={label}
        placeholder={placeholder}
        onBlur={() => {
          setFieldTouched(name);
          setFieldValue(name, values[name]);
        }}
        onChangeText={handleChange(name)}
        value={values[name] ? `${values[name]}` : ""}
        error={Boolean(errors[name] && touched[name])}
        left={
          icon ? <TextInput.Icon icon={icon} color={secondary} /> : undefined
        }
        right={
          <TextInput.Icon
            icon={"content-paste"}
            onPress={handlePasteFromClipboard}
            color={secondary}
          />
        }
        {...otherProps}
      />
      {errors[name] && touched[name] && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </View>
  );
};

export default FormUrlField;

const extractUrlFromText = (text) => {
  // Regular expression to match URLs in the text
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex);
  const url = urls ? urls[0] : "";
  return url;
};

const styles = StyleSheet.create({});
