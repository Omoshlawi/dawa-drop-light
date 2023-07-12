import { StyleSheet, View } from "react-native";
import React from "react";
import Logo from "../../components/Logo";
import { screenWidth } from "../../utils/contants";
import { Form, FormField, FormSubmitButton } from "../../components/forms";
import * as Yup from "yup";
import { Text } from "react-native-paper";

const initialValues = {
  username: "",
  password: "",
};

const validationSchemer = Yup.object().shape({
  username: Yup.string().label("Username").required(),
  password: Yup.string().label("Password").required(),
});

const Login = ({ navigation }) => {
  const handleSubmit = async (values, { setFieldError }) => {
    console.log(values);
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
          />
          <FormField
            placeholder="Enter Password"
            label="Password"
            name="password"
            icon="lock"
            password
          />
          <FormSubmitButton
            title="Sign In"
            mode="contained"
            style={styles.btn}
          />

          <Text>Don't have an account?</Text>
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
