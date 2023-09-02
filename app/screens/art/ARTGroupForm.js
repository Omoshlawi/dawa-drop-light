import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { useART } from "../../api";
import Logo from "../../components/Logo";
import { Form, FormField, FormSubmitButton } from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { AlertDialog, Dialog } from "../../components/dialog";
import { useTheme } from "react-native-paper";
import routes from "../../navigation/routes";
import ExtraSubscribersForm from "../../components/ExtraSubscribersForm";
import { ScrollView } from "react-native";

const validationSchemer = Yup.object().shape({
  title: Yup.string().label("Group Title").required(),
  description: Yup.string().label("Group Description"),
  extraSubscribers: Yup.array().label("Extra subscribers"),
});
const ARTGroupForm = ({ navigation, route }) => {
  const { addARTGroup, updateARTGroup } = useART();
  const [loading, setLoading] = useState(false);
  const artGroup = route.params;
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: `ART Distribution Group ${
      artGroup ? "Updated" : "Added"
    } Successfully!`,
    mode: "success",
  });
  const { colors, roundness } = useTheme();

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    let response;
    if (artGroup) {
      response = await updateARTGroup(artGroup._id, values);
    } else {
      response = await addARTGroup(values);
    }
    setLoading(false);
    if (response.ok) {
      setDialogInfo({ ...dialogInfo, show: response.ok, mode: "success" });
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
      }
      console.log(response.data);
    }
  };
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Logo size={screenWidth * 0.4} />
        </View>
        <View style={styles.form}>
          <Form
            initialValues={
              artGroup
                ? {
                    title: artGroup.title,
                    description: artGroup.description,
                    extraSubscribers: artGroup.extraSubscribers.map((user) => ({
                      name: user.name,
                      phoneNumber: user.phoneNumber,
                    })),
                  }
                : {
                    title: "",
                    description: "",
                    extraSubscribers: [],
                  }
            }
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <FormField
              placeholder="Enter Group name"
              label="Group title"
              name="title"
              icon="account-group"
            />
            <ExtraSubscribersForm
              name="extraSubscribers"
              icon="account-group"
            />
            <FormField
              placeholder="Enter Group Description"
              label="Group description"
              name="description"
              icon="information-variant"
              multiline
              numberOfLines={10}
            />

            <FormSubmitButton
              title={artGroup ? "Update ART Group" : "Add ART Group"}
              mode="contained"
              style={styles.btn}
              loading={loading}
              disabled={loading}
            />
            <View style={{ flex: 1 }} />
          </Form>
        </View>
      </ScrollView>
      <Dialog visible={dialogInfo.show}>
        <AlertDialog
          mode={dialogInfo.mode}
          message={dialogInfo.message}
          onButtonPress={() => {
            if (dialogInfo.mode === "success")
              navigation.navigate(routes.ART_NAVIGATION, {
                screen: routes.ART_GROUP_SCREEN,
              });
            else navigation.goBack();
          }}
        />
      </Dialog>
    </View>
  );
};

export default ARTGroupForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    width: "100%",
    padding: 10,
    flex: 1,
  },
  btn: {
    marginVertical: 20,
  },
  itemContainer: {
    margin: 5,
  },
  listItem: {
    padding: 10,
  },
});
