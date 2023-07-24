import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeArea } from "../../components/layout";
import * as Yup from "yup";
import { useAuthorize } from "../../api";
import Logo from "../../components/Logo";
import {
  Form,
  FormDropDown,
  FormField,
  FormItemPicker,
  FormModalPicker,
  FormSubmitButton,
} from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { pickX } from "../../utils/helpers";
import { Dialog, getDialogIcon } from "../../components/dialog";
import { Button, List, Text, useTheme } from "react-native-paper";
import { DropDown, ItemPicker, ModalPicker } from "../../components/input";
import routes from "../../navigation/routes";

const validationSchemer = Yup.object().shape({
  name: Yup.string().label("Privilege Name").required(),
  description: Yup.string().label("Privilege Description").required(),
  action: Yup.string().label("Privilege Action code").required(),
});

const PrivilegeForm = ({ navigation, route }) => {
  const { addPrivilege, updatePrivilege } = useAuthorize();
  const privilege = route.params;
  const [loading, setLoading] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Privilege Added Successfully!",
    success: true,
  });
  const { colors } = useTheme();

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    let response;
    if (privilege) {
      response = await updatePrivilege(privilege._id, values);
    } else {
      response = await addPrivilege(values);
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
              privilege
                ? pickX(privilege, ["name", "description", "action"])
                : {
                    name: "",
                    description: "",
                    action: "",
                  }
            }
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <FormField
              placeholder="Enter Privilege name"
              label="Privilege name"
              name="name"
              icon="account-group"
            />
            <FormField
              placeholder="Enter Privilege Description"
              label="Previlege description"
              name="description"
              icon="information-variant"
              multiline
              numberOfLines={10}
            />
            <FormField
              placeholder="Enter Privilege Action id"
              label="Action Id"
              name="action"
              icon="checkbox-marked-circle"
            />

            <FormSubmitButton
              title={privilege ? "Update Privilege" : "Add Privilege"}
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
        title={dialogInfo.success ? "Success!" : "Failure!"}
      >
        <View style={styles.dialog}>
          <Image
            style={styles.img}
            source={getDialogIcon(dialogInfo.success ? "success" : "error")}
          />
          <Text style={styles.text}>{dialogInfo.message}</Text>
          <Button
            mode="outlined"
            onPress={() => {
              setDialogInfo({ ...dialogInfo, show: false });
              if (dialogInfo.success) navigation.navigate(routes.PERMISIONS_NAVIGATION, {screen: routes.PERMISIONS_PRIVILEGES_SCREEN});
            }}
          >
            Ok
          </Button>
        </View>
      </Dialog>
    </SafeArea>
  );
};

export default PrivilegeForm;

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
  itemContainer: {
    marginBottom: 5,
    // padding: 10,
  },
});
