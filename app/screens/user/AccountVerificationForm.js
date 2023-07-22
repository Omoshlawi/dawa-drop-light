import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { SafeArea } from "../../components/layout";
import { useTheme, Text } from "react-native-paper";
import { usePatient } from "../../api";
import { AlertDialog, Dialog } from "../../components/dialog";
import { screenWidth } from "../../utils/contants";
import { Form, FormField, FormSubmitButton } from "../../components/forms";
import Logo from "../../components/Logo";
import routes from "../../navigation/routes";

const validationSchemer = Yup.object().shape({
  code: Yup.string().label("OTP Code").required(),
});
const initalValues = {
  code: "",
};

const AccountVerificationForm = ({ navigation, route }) => {
  const message = route.params;
  const { colors } = useTheme();
  const { verifySelf } = usePatient();
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Account verification success",
    mode: "success",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    const response = await verifySelf(values);
    setLoading(false);
    if (response.ok) {
      setDialogInfo({
        ...dialogInfo,
        show: response.ok,
        mode: "success",
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
        <Text variant="titleLarge" style={{ textAlign: "center", padding: 10 }}>
          {message}
        </Text>
        <View style={styles.form}>
          <Form
            initialValues={initalValues}
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <FormField
              name="code"
              placeholder="Enter verification code here"
              label="code"
              icon="phone"
            />
            <FormSubmitButton
              title="Submitt"
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
            if (dialogInfo.mode === "success")
              navigation.navigate(routes.BTAB_NAVIGATION, {
                screen: routes.BTAB_HOME_SCREEN,
              });
          }}
        />
      </Dialog>
    </SafeArea>
  );
};

export default AccountVerificationForm;

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
