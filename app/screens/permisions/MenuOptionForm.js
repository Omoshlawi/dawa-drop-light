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
  FormImagePicker,
  FormItemPicker,
  FormModalPicker,
  FormSubmitButton,
} from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { getFormFileFromUri, getImageUrl, pickX } from "../../utils/helpers";
import { Dialog, getDialogIcon } from "../../components/dialog";
import { Button, List, Text, useTheme } from "react-native-paper";
import { DropDown, ItemPicker, ModalPicker } from "../../components/input";
import routes from "../../navigation/routes";

const validationSchemer = Yup.object().shape({
  label: Yup.string().label("Menu Name").required(),
  description: Yup.string().label("Menu Description").required(),
  image: Yup.string().label("Menu Icon").required(),
  link: Yup.string().label("Menu Link").required(),
});

const MenuOptionForm = ({ navigation, route }) => {
  const { addMenuOption, updateMenuOption } = useAuthorize();
  const menuOption = route.params;
  const [loading, setLoading] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: `Menu Option ${menuOption ? "Updated" : "Added"} Successfully!`,
    success: true,
  });
  const { colors } = useTheme();

  const handleSubmit = async (values, { setErrors, errors }) => {
    const formData = new FormData();
    for (const key in values) {
      console.log(values[key]);
      formData.append(
        key,
        key === "image" ? getFormFileFromUri(values[key]) : values[key]
      );
    }
    setLoading(true);
    let response;
    if (menuOption) {
      response = await updateMenuOption(menuOption._id, formData);
    } else {
      response = await addMenuOption(formData);
    }
    setLoading(false);
    if (response.ok) {
      setDialogInfo({
        ...dialogInfo,
        show: response.ok,
        success: response.ok,
        message: `Menu Option ${
          menuOption ? "Updated" : "Added"
        } Successfully!`,
      });
    } else {
      if (response.status === 400) {
        setErrors({ ...errors, ...response.data.errors });
      } else {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          success: false,
          message: response.data?.detail || "Unknow Error Occured",
        });
        console.log(response.problem);
      }
    }
  };
  return (
    <SafeArea>
      <View style={styles.screen}>
        <View style={styles.form}>
          <Form
            initialValues={
              menuOption
                ? {
                    label: menuOption.label,
                    description: menuOption.description,
                    image: getImageUrl(menuOption.image),
                    link: menuOption.link,
                  }
                : {
                    label: "",
                    description: "",
                    image: "",
                    link: "",
                  }
            }
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <View style={{ alignItems: "center", padding: 10 }}>
              <FormImagePicker name="image" />
              <Text>Menu Icon</Text>
            </View>
            <FormField
              placeholder="Enter Menu Label"
              label="Menu label"
              name="label"
              icon="apps"
            />
            <FormField
              placeholder="Enter Menu Description"
              label="Menu description"
              name="description"
              icon="information-variant"
              multiline
              numberOfLines={10}
            />

            <FormField
              placeholder="Enter menu link"
              label="Menu link"
              name="link"
              icon="link-variant"
            />

            <FormSubmitButton
              title={menuOption ? "Update menu option" : "Add menu option"}
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
              if (dialogInfo.success)
                navigation.navigate(routes.PERMISIONS_NAVIGATION, {
                  screen: routes.PERMISIONS_MENU_OPTIONS_SCREEN,
                });
            }}
          >
            Ok
          </Button>
        </View>
      </Dialog>
    </SafeArea>
  );
};

export default MenuOptionForm;

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
