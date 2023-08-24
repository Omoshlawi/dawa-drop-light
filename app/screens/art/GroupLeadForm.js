import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { useART } from "../../api";
import Logo from "../../components/Logo";
import {
  Form,
  FormDateTimePicker,
  FormField,
  FormItemPicker,
  FormSubmitButton,
} from "../../components/forms";
import { screenWidth } from "../../utils/contants";
import { AlertDialog, Dialog } from "../../components/dialog";
import { List, useTheme } from "react-native-paper";

const validationSchemer = Yup.object().shape({
  user: Yup.string().label("User").required(),
  artModel: Yup.string().label("ART Distribution model"),
});

const GroupLeadForm = ({ navigation, route }) => {
  const { addARTGroupLead, updateARTGroupLead } = useART();
  const [loading, setLoading] = useState(false);
  const { artGroupLead, artModels, users } = route.params;
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: `ART Distribution group ${
      artGroupLead ? "Updated" : "Added"
    } Successfully!`,
    mode: "success",
  });
  const { colors, roundness } = useTheme();

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    let response;
    if (artGroupLead) {
      response = await updateARTGroupLead(artGroupLead._id, values);
    } else {
      response = await addARTGroupLead(values);
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
      }
      console.log(response.data);
    }
  };
  return (
    <View style={styles.screen}>
      <Logo size={screenWidth * 0.4} />
      <View style={styles.form}>
        <Form
          initialValues={
            artGroupLead
              ? {
                  user: artGroupLead.user[0] ? artGroupLead.user[0]._id : "",
                  artModel: artGroupLead.artModel[0]
                    ? artGroupLead.artModel[0]._id
                    : "",
                }
              : {
                  user: "",
                  artModel: "",
                }
          }
          validationSchema={validationSchemer}
          onSubmit={handleSubmit}
        >
          <FormItemPicker
            name="user"
            icon="account-outline"
            searchable
            label="User"
            data={users}
            valueExtractor={({ _id }) => _id}
            labelExtractor={({ username }) => username}
            renderItem={({ item }) => (
              <List.Item
                title={item.username}
                style={styles.listItem}
                left={(props) => (
                  <List.Icon {...props} icon="account-outline" />
                )}
              />
            )}
            itemContainerStyle={[
              styles.itemContainer,
              { borderRadius: roundness },
            ]}
          />
          <FormItemPicker
            name="artModel"
            icon="account-supervisor-outline"
            searchable
            label="ART Distribution model"
            data={artModels}
            valueExtractor={({ _id }) => _id}
            labelExtractor={({ name }) => name}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                style={styles.listItem}
                left={(props) => (
                  <List.Icon {...props} icon="account-supervisor-outline" />
                )}
              />
            )}
            itemContainerStyle={[
              styles.itemContainer,
              { borderRadius: roundness },
            ]}
          />
          <FormSubmitButton
            title={
              artGroupLead ? "Update ART Group Lead" : "Add ART Group Lead"
            }
            mode="contained"
            style={styles.btn}
            loading={loading}
            disabled={loading}
          />
          <View style={{ flex: 1 }} />
        </Form>
      </View>
      <Dialog visible={dialogInfo.show}>
        <AlertDialog
          mode={dialogInfo.mode}
          message={dialogInfo.message}
          onButtonPress={() => {
            navigation.goBack();
          }}
        />
      </Dialog>
    </View>
  );
};

export default GroupLeadForm;

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
  itemContainer: {
    margin: 5,
  },
  listItem: {
    padding: 10,
  },
});
