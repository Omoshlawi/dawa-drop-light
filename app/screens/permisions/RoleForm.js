import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeArea } from "../../components/layout";
import * as Yup from "yup";
import { useAuthorize } from "../../api";
import Logo from "../../components/Logo";
import { Form, FormField, FormSubmitButton } from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { pickX } from "../../utils/helpers";
import { Dialog, getDialogIcon } from "../../components/dialog";
import { Button, Text } from "react-native-paper";

const validationSchemer = Yup.object().shape({
  name: Yup.string().label("Role Name").required(),
  description: Yup.string().label("Role Description").required(),
});
const RoleForm = ({ navigation, route }) => {
  const { addRoles, updateRole } = useAuthorize();
  const [loading, setLoading] = useState(false);
  const defaultValues = route.params;
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Role Added Successfully!",
    success: true,
  });

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    let response;
    if (defaultValues) {
      response = await updateRole(defaultValues._id, values);
    } else {
      response = await addRoles(values);
    }
    setLoading(false);
    if (response.ok) {
      setDialogInfo({ ...dialogInfo, show: response.ok, success: response.ok });
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
      } else {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          success: false,
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
        <Logo size={screenWidth * 0.4} />
        <View style={styles.form}>
          <Form
            initialValues={
              defaultValues
                ? pickX(defaultValues, ["name", "description"])
                : {
                    name: "",
                    description: "",
                  }
            }
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <FormField
              placeholder="Enter Role name"
              label="Role name"
              name="name"
              icon="account-group"
            />
            <FormField
              placeholder="Enter Role Description"
              label="Role description"
              name="description"
              icon="information-variant"
              multiline
              numberOfLines={10}
            />
            <FormSubmitButton
              title={defaultValues ? "Update Role" : "Add Role"}
              mode="contained"
              style={styles.btn}
              loading={loading}
              disabled={loading}
            />
          </Form>
        </View>
      </View>
      <Dialog
        visible={dialogInfo.show}
        title={dialogInfo.success ? "Success!" : "Failure!"}
      >
        <View style={styles.dialog}>
          <Image
            style={styles.img}
            source={getDialogIcon(dialogInfo.success ? "success" : "error")}
          />
          {console.log({ getDialogIcon })}
          <Text style={styles.text}>{dialogInfo.message}</Text>
          <Button
            mode="outlined"
            onPress={() => {
              setDialogInfo({ ...dialogInfo, show: false });
              if (dialogInfo.success) navigation.goBack();
            }}
          >
            Ok
          </Button>
        </View>
      </Dialog>
    </SafeArea>
  );
};

export default RoleForm;

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
  dialog: {
    width: screenWidth * 0.75,
  },
  img: {
    alignSelf: "center",
    width: 100,
    height: 100,
  },
  text: {
    textAlign: "center",
    padding: 10,
  },
});
