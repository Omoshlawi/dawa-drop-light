import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "react-native-paper";
import * as Yup from "yup";
import Logo from "../../components/Logo";
import {
  Form,
  FormField,
  FormImagePicker,
  FormSubmitButton,
} from "../../components/forms";
import { useUser } from "../../api";
import { screenWidth } from "../../utils/contants";
import { getFormFileFromUri, getImageUrl, pickX } from "../../utils/helpers";

const validationSchemer = Yup.object().shape({
  username: Yup.string().required().max(30).min(4).label("Username"),
  email: Yup.string().email().required().label("Email Address"),
  firstName: Yup.string().max(20).label("First name"),
  lastName: Yup.string().max(20).label("Last name"),
  phoneNumber: Yup.string().min(9).max(14).label("Phone Number").required(),
  image: Yup.string().label("Image"),
});
const ProfileUpdate = ({ navigation, route }) => {
  const user = route.params;
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useUser();
  const handleSubmit = async (values, { setErrors, errors }) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(
        key,
        key === "image" ? getFormFileFromUri(values[key]) : values[key]
      );
    }
    setLoading(true);
    const response = await updateProfile(formData);
    setLoading(false);
    if (response.ok) {
      navigation.goBack();
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
      } else {
        console.log(response.problem, response.data);
      }
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <Form
          initialValues={{
            ...pickX(user, [
              "username",
              "email",
              "firstName",
              "lastName",
              "phoneNumber",
              "image",
            ]),
            image: getImageUrl(user.image, ""),
          }}
          validationSchema={validationSchemer}
          onSubmit={handleSubmit}
        >
          <View style={styles.img}>
            <FormImagePicker name="image" />
          </View>
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
            placeholder="Enter first name"
            label="First name"
            name="firstName"
            icon="lock"
          />
          <FormField
            placeholder="Enter last name"
            label="Last name"
            name="lastName"
            icon="lock"
          />
          <FormSubmitButton
            title="Update"
            mode="contained"
            style={styles.btn}
            loading={loading}
            disabled={loading}
          />
        </Form>
      </View>
    </View>
  );
};

export default ProfileUpdate;

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
  img: {
    alignItems: "center",
    padding: 20,
  },
});
