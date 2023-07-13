import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageInput } from "../input";
import { useFormikContext } from "formik";

const FormImagePickerer31 = ({ name }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const {
    colors: { secondary, error },
  } = useTheme();
  return (
    <>
      <ImageInput
        localImage={values[name] ? { uri: values[name] } : null}
        onImageChange={(image) => {
          if (image) {
            setFieldValue(name, image.uri);
          } else {
            setFieldValue(name, "");
          }
        }}
      />
      {errors[name] && touched && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </>
  );
};

export default FormImagePickerer31;

const styles = StyleSheet.create({});
