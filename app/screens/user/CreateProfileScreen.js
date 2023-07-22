import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { SafeArea } from "../../components/layout";
import { useTheme } from "react-native-paper";
import { usePatient } from "../../api";
import { AlertDialog, Dialog } from "../../components/dialog";
import { screenWidth } from "../../utils/contants";
import { Form, FormField, FormSubmitButton } from "../../components/forms";
import Logo from "../../components/Logo";
import routes from "../../navigation/routes";
import { TextInputField } from "../../components/input";

const validationSchemer = Yup.object().shape({
  cccNumber: Yup.string().label("CCC Number").required(),
  firstName: Yup.string().label("First Name").required(),
  upiNo: Yup.string().label("Unique Patient Number(Optional)"),
});
const initalValues = {
  cccNumber: "",
  firstName: "",
  upiNo: "",
};

const CreateProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { createProfile } = usePatient();
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Profile created successfully!",
    mode: "success",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    const response = await createProfile(values);
    setLoading(false);
    if (response.ok) {
      navigation.navigate(routes.USER_NAVIGATION, {
        screen: routes.USER_ACCOUNT_VERIFY_SCREEN,
        params: response.data.message,
      });
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
      } else {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          mode: "error",
          message: response.data.detail
            ? response.data.detail
            : "Unknow Error Occured",
        });
        console.log(response.data);
      }
    }
  };

  return (
    <SafeArea>
      <View style={styles.screen}>
        <Logo size={screenWidth * 0.3} />
        <View style={styles.form}>
          <Form
            initialValues={initalValues}
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <FormField
              name="cccNumber"
              placeholder="Enter ccc number"
              label="CCC Number"
              icon="phone"
            />
            <FormField
              name="firstName"
              placeholder="Enter first name"
              label="First name"
              icon="account"
            />
            <FormField
              name="upiNo"
              placeholder="Enter UPI Number"
              label="UPI Number"
              icon="account"
            />
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
      <Dialog
        visible={dialogInfo.show}
        // title={dialogInfo.success ? "Success!" : "Failure!"}
      >
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

export default CreateProfileScreen;

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
