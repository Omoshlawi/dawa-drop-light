import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Logo from "../../components/Logo";
import { screenWidth } from "../../utils/contants";
import { Form, FormField, FormSubmitButton } from "../../components/forms";
import * as Yup from "yup";
import { useAuthenticate } from "../../api";
import { useUserContext } from "../../context/hooks";
import routes from "../../navigation/routes";
import { LinkedText } from "../../components/display";

const initialValues = {
  username: "",
  password: "",
};

const validationSchemer = Yup.object().shape({
  username: Yup.string().label("Username").required(),
  password: Yup.string().label("Password").required(),
});

const Login = ({ navigation }) => {
  const { login } = useAuthenticate();
  const { setToken } = useUserContext();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    const response = await login(values);
    setLoading(false);
    if (response.ok) {
      const token = response.headers["x-auth-token"];
      setToken(token);
    } else {
      if (response.status === 400) {
        setFieldError("username", " ");
        setFieldError("password", response.data.detail);
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
            placeholder="Enter Password"
            label="Password"
            name="password"
            icon="lock"
            password
            autoCapitalize="none"
          />
          <FormSubmitButton
            title="Sign In"
            mode="contained"
            loading={loading}
            disabled={loading}
            style={styles.btn}
          />
          <LinkedText
            text="Dont have an account? "
            link="Create"
            onPress={() => navigation.navigate(routes.AUTH_REGISTER_SCREEN)}
          />
        </Form>
      </View>
    </View>
  );
};

export default Login;

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
