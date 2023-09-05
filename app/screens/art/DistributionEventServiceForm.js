import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import * as Yup from "yup";
import { useART } from "../../api";
import Logo from "../../components/Logo";
import {
  Form,
  FormDateTimePicker,
  FormDatesListPicker,
  FormField,
  FormItemPicker,
  FormLocationPicker,
  FormSubmitButton,
} from "../../components/forms";
import { screenHeight, screenWidth } from "../../utils/contants";
import { AlertDialog, Dialog } from "../../components/dialog";
import { List, RadioButton, useTheme, Text } from "react-native-paper";
import routes from "../../navigation/routes";
import moment from "moment/moment";
import { ScrollView } from "react-native";
import { MyTestComponent } from "../../components/input";
import ExtraSubscribersForm from "../../components/ExtraSubscribersForm";
import VenueFormInput from "../../components/VenueFormInput";

const validationSchemer = Yup.object().shape({
  member: Yup.string().label("Member").required(),
  services: Yup.array().default([]).label("Ëxtra services"),
});

const DistributionEventServiceForm = ({ navigation, route }) => {
  const { addDistributionEvent, updateDistributionEvent } = useART();
  const [loading, setLoading] = useState(false);
  const [isSmartPhoneUser, setIsSmartphoneUser] = useState("yes");
  const { event, delivery } = route.params;
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: `ART Distribution event ${
      delivery ? "Updated" : "Added"
    } Successfully!`,
    mode: "success",
  });
  const { colors, roundness } = useTheme();

  const handleSubmit = async (values, { setErrors, errors }) => {
    setLoading(true);
    let response;
    if (delivery) {
      response = await updateDistributionEvent(delivery._id, values);
    } else {
      response = await addDistributionEvent(values);
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
      <ScrollView>
        <View style={styles.img}>
          <Image
            style={styles.img}
            source={require("./../../assets/arrived.png")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.form}>
          <Form
            initialValues={
              delivery
                ? {
                    title: delivery.title,
                    distributionTime: delivery.distributionTime,
                    distributionLocation: {
                      latitude: delivery.distributionLocation.latitude,
                      longitude: delivery.distributionLocation.longitude,
                      address: delivery.distributionLocation.address,
                    },
                    remarks: delivery.remarks,
                    remiderNortificationDates:
                      delivery.remiderNortificationDates,
                    services: [],
                  }
                : {
                    title: "",
                    distributionTime: "",
                    distributionLocation: null,
                    remarks: "",
                    remiderNortificationDates: [],
                    services: [],
                  }
            }
            validationSchema={validationSchemer}
            onSubmit={handleSubmit}
          >
            <Text>Does patient have smartphone with installed dawa drop?</Text>
            <View style={{}}>
              <RadioButton.Group
                onValueChange={setIsSmartphoneUser}
                value={isSmartPhoneUser}
              >
                <RadioButton.Item
                  label="Yes (Will choose from list of subscribers)"
                  value="yes"
                  labelVariant="bodySmall"
                />
                <RadioButton.Item
                  label="No (Will provide ccc number of patient)"
                  value="no"
                  labelVariant="bodySmall"
                />
              </RadioButton.Group>
            </View>
            {isSmartPhoneUser === "yes" ? (
              <FormItemPicker
                name="member"
                icon="account-group"
                searchable
                label="Subscriber"
                data={event.subscribers}
                valueExtractor={({ _id }) => _id}
                labelExtractor={({ username, firstName, lastName }) =>
                  firstName && lastName ? `${firstName} ${lastName}` : username
                }
                renderItem={({
                  item: { username, firstName, lastName, email, phoneNumber },
                }) => (
                  <List.Item
                    title={
                      firstName && lastName
                        ? `${firstName} ${lastName}`
                        : username
                    }
                    style={styles.listItem}
                    left={(props) => (
                      <List.Icon {...props} icon="account-group" />
                    )}
                  />
                )}
                itemContainerStyle={[
                  styles.itemContainer,
                  { borderRadius: roundness },
                ]}
              />
            ) : (
              <FormField
                label="Patient ccc Number"
                icon="identifier"
                name="cccNumber"
                placeholder="Enter Patient ccc Number"
              />
            )}
            <FormItemPicker
              name="services"
              icon="medical-bag"
              searchable
              multiple
              label="Extra services"
              data={[
                { name: "FP Screening" },
                { name: "TB Screening" },
                { name: "STI Screening" },
                { name: "Pregnancy Intention" },
                { name: "Triage" },
              ]}
              valueExtractor={(val) => val.name}
              labelExtractor={(val) => val.name}
              renderItem={({ item, selected }) => (
                <List.Item
                  title={item.name}
                  style={styles.listItem}
                  left={(props) => <List.Icon {...props} icon="medical-bag" />}
                  right={(props) => (
                    <List.Icon
                      {...props}
                      icon={selected ? "radiobox-marked" : "radiobox-blank"}
                    />
                  )}
                />
              )}
              itemContainerStyle={[
                styles.itemContainer,
                { borderRadius: roundness },
              ]}
            />
            <FormSubmitButton
              title={delivery ? "Update ART Distribution event" : "Next"}
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
                screen: routes.ART_DISTRIBUTION_EVENTS_SCREEN,
              });
            else navigation.goBack();
          }}
        />
      </Dialog>
    </View>
  );
};

export default DistributionEventServiceForm;

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
  img: {
    width: "100%",
    height: screenHeight * 0.2,
  },
});
