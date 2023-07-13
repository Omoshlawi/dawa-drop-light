import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageInputList } from "../input";
import AppErrorMessage from "./AppErrorMessage";
import { useFormikContext } from "formik";
import { useTheme } from "react-native-paper";

const FormImagesPicker = ({ name }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const {
    colors: { secondary },
  } = useTheme();
  const {
    colors: { error },
  } = useTheme();
  return (
    <>
      <ImageInputList
        //   Onvert uri to local state objet with property uri
        localImagesList={values[name].map((uri) => ({ uri }))}
        // extract uri from localImage obj
        onImagesListChange={(imageLists) =>
          setFieldValue(
            name,
            imageLists.map(({ uri }) => uri)
          )
        }
      />
      {errors[name] && touched && (
        <Text style={{ color: error, paddingLeft: 5 }}>{errors[name]}</Text>
      )}
    </>
  );
};

export default FormImagesPicker;

const styles = StyleSheet.create({});
