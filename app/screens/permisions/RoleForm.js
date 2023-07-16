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

const validationSchemer = Yup.object().shape({
  name: Yup.string().label("Role Name").required(),
  description: Yup.string().label("Role Description").required(),
  menuOptions: Yup.array().label("Role Menu Options").required(),
  privileges: Yup.array().label("Role Privileges").required(),
});
const RoleForm = ({ navigation, route }) => {
  const { addRoles, updateRole } = useAuthorize();
  const [loading, setLoading] = useState(false);
  const { role: defaultValues, menuOptions, privileges } = route.params;
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Role Added Successfully!",
    success: true,
  });
  const { colors } = useTheme();

  const handleSubmit = async (values, { setErrors, errors }) => {
    console.log(values);
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
                ? pickX(
                    {
                      ...defaultValues,
                      privileges: defaultValues.privileges.map(
                        ({ _id }) => _id
                      ),
                      menuOptions: defaultValues.menuOptions.map(
                        ({ _id }) => _id
                      ),
                    },
                    ["name", "description", "privileges", "menuOptions"]
                  )
                : {
                    name: "",
                    description: "",
                    privileges: [],
                    menuOptions: [],
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
            <FormItemPicker
              name="privileges"
              data={privileges}
              labelExtractor={(item) => item.name}
              placeholder="Select Privileges"
              multiple
              valueExtractor={(item) => item._id}
              renderItem={({ item }) => <List.Item title={item.name} />}
              itemContainerStyle={styles.itemContainer}
              icon="format-list-checks"
              label="Role Privileges"
            />
            <FormItemPicker
              name="menuOptions"
              data={menuOptions}
              placeholder="Select Menu Options"
              labelExtractor={(item) => item.label}
              itemContainerStyle={styles.itemContainer}
              renderItem={({ item }) => <List.Item title={item.label} />}
              valueExtractor={(item) => item._id}
              multiple
              icon="format-list-checks"
              label="Role Menu Options"
            />
            <FormSubmitButton
              title={defaultValues ? "Update Role" : "Add Role"}
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
