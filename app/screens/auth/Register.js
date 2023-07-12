import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Logo from "../../components/Logo";
import { screenWidth } from "../../utils/contants";
import { Form, FormField, FormSubmitButton } from "../../components/forms";
import * as Yup from "yup";
import { useAuth } from "../../api";
import { useUserContext } from "../../context/hooks";
import LinkedText from "../../components/LinkedText";
import routes from "../../navigation/routes";

const initialValues = {
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const validationSchemer = Yup.object().shape({
  username: Yup.string().label("Username").required(),
  email: Yup.string().label("Email").required(),
  phoneNumber: Yup.string().label("Phone number").required(),
  password: Yup.string().label("Password").required(),
  confirmPassword: Yup.string().label("Confirm Password").required(),
});
const Register = ({ navigation }) => {
  const { register } = useAuth();
  const { setToken } = useUserContext();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    const response = await register(values);
    setLoading(false);
    if (response.ok) {
      const token = response.headers["x-auth-token"];
      setToken(token);
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
      } else {
        console.log(response.data);
      }
    }
  };
  return (
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
            placeholder="Enter email"
            label="Email Address"
            name="email"
            icon="email"
            autoCapitalize="none"
            inputMode="email"
          />
          <FormField
            placeholder="Enter Phone number"
            label="Phone Number"
            name="phoneNumber"
            icon="phone"
            autoCapitalize="none"
            inputMode="tel"
          />
          <FormField
            placeholder="Enter Password"
            label="Password"
            name="password"
            icon="lock"
            password
            autoCapitalize="none"
          />
          <FormField
            placeholder="Retype Password"
            label="Confirm Password"
            name="confirmPassword"
            icon="lock"
            password
            autoCapitalize="none"
          />
          <FormSubmitButton
            title="Sign Up"
            mode="contained"
            style={styles.btn}
            loading={loading}
            disabled={loading}
          />
          <LinkedText
            text="Already have an account? "
            link="Login"
            onPress={() => navigation.navigate(routes.AUTH_LOGIN_SCREEN)}
          />
        </Form>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    paddingTop: 10,
  },
  form: {
    width: "100%",
    padding: 10,
  },
  btn: {
    marginVertical: 20,
  },
});
