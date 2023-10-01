import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { SafeArea } from "../../components/layout";
import { IconButton, useTheme } from "react-native-paper";
import { usePatient } from "../../api";
import { AlertDialog, Dialog } from "../../components/dialog";
import { screenWidth } from "../../utils/contants";
import {
  Form,
  FormField,
  FormRatingBar,
  FormSubmitButton,
  FormScanner,
} from "../../components/forms";
import routes from "../../navigation/routes";

const validationSchemer = Yup.object().shape({
  delivery: Yup.string().label("Delivery Code").required(),
  review: Yup.string().label("Review").required(),
  rating: Yup.number().required().label("Rating"),
});
const initalValues = {
  delivery: "",
  review: "",
  rating: 4,
};
const FeedBackForm = ({ navigation }) => {
  const { colors } = useTheme();
  const { checkoutDelivery } = usePatient();
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message:
      "Thank you for the review \nIt will be used to improve delivery service!",
    mode: "success",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    const response = await checkoutDelivery(values);
    setLoading(false);
    if (response.ok) {
      setDialogInfo({
        ...dialogInfo,
        show: true,
        mode: "success",
        message:
          "Thank you for the review \nIt will be used to improve delivery service!",
      });
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
      } else {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          mode: "error",
          message: response.data?.detail || "Unknow Error Occured",
        });
        console.log(response.data);
      }
    }
  };

  return (
    <SafeArea>
      <View style={styles.screen}>
        <View style={styles.form}>
          <Form
            initialValues={initalValues}
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <FormScanner name="delivery" />
            <FormField
              name="delivery"
              placeholder="Enter/Scan delivery code"
              label="Delivery Code"
              icon="data-matrix-scan"
            />
            <FormField
              name="review"
              placeholder="Enter review"
              label="Delivery review"
              icon="comment-processing"
            />
            <FormRatingBar name="rating" />
            <FormSubmitButton
              title="Submit"
              mode="contained"
              style={styles.btn}
              loading={loading}
              disabled={loading}
            />

            <View style={{ flex: 1 }} />
          </Form>
        </View>
      </View>
      <Dialog visible={dialogInfo.show}>
        <AlertDialog
          message={dialogInfo.message}
          mode={dialogInfo.mode}
          onButtonPress={() => {
            setDialogInfo({ ...dialogInfo, show: false });
            if (dialogInfo.mode === "success") navigation.goBack();
          }}
        />
      </Dialog>
    </SafeArea>
  );
};

export default FeedBackForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  form: {
    width: "100%",
    padding: 10,
    flex: 1,
  },
  btn: {
    marginVertical: 20,
  },
});
