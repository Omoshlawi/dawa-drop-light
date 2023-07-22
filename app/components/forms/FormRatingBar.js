import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RatingBar } from "../ratingbar";
import { useFormikContext } from "formik";
import { useTheme } from "react-native-paper";

const FormRatingBar = ({ name }) => {
  const { setFieldValue, errors, values, touched, handleChange } =
    useFormikContext();
  const {
    colors: { error },
  } = useTheme();
  return (
    <View>
      <RatingBar
        defaultRating={values[name]}
        onRatingChange={(rating) => setFieldValue(name, rating)}
      />
    </View>
  );
};

export default FormRatingBar;

const styles = StyleSheet.create({});