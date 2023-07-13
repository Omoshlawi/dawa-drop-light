import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeArea } from "../../components/layout";
import * as Yup from "yup";
import Logo from "../../components/Logo";
import { Form, FormField, FormSubmitButton } from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { useUser } from "../../api";

const initialValues = {
  username: "",
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const validationSchemer = Yup.object().shape({
  username: Yup.string().label("Username").required(),
  currentPassword: Yup.string().label("Current Password").required(),
  newPassword: Yup.string().label("New password").required(),
  confirmNewPassword: Yup.string().label("Confirm new password").required(),
});

const ChangePassword = ({ navigation }) => {
  const { changePassword, logout } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    const response = await changePassword(values);
    setLoading(false);
    if (response.ok) {
      logout();
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
      } else {
        console.log(response.data);
      }
    }
  };

  return (
    <SafeArea>
      <View style={styles.screen}>
        <Logo size={screenWidth * 0.55} />
        <View style={styles.form}>
          <Form
            initialValues={initialValues}
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <FormField
              placeholder="Enter Username"
              label="Username"
              name="username"
              icon="account"
              autoCapitalize="none"
            />
            <FormField
              placeholder="Enter current password"
              label="Current password"
              name="currentPassword"
              icon="lock"
              autoCapitalize="none"
              password
            />
            <FormField
              placeholder="Enter New password"
              label="New Password"
              name="newPassword"
              icon="lock"
              autoCapitalize="none"
            />
            <FormField
              placeholder="Retype Password"
              label="Confirm new Password"
              name="confirmNewPassword"
              icon="lock"
              password
              autoCapitalize="none"
            />
            <FormSubmitButton
              title="Change password"
              mode="contained"
              style={styles.btn}
              loading={loading}
              disabled={loading}
            />
          </Form>
        </View>
      </View>
    </SafeArea>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  form: {
    width: "100%",
    padding: 10,
  },
  btn: {
    marginVertical: 20,
  },
});
