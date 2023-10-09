import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Button, List, Text, useTheme } from "react-native-paper";
import { screenHeight, screenWidth } from "../../../utils/contants";
import moment from "moment/moment";
import {
  FormDateTimePicker,
  FormField,
  FormItemPicker,
  FormLocationPicker,
} from "../../forms";
import { useFormikContext } from "formik";
import DeliveryPersonDetails from "../form/DeliveryPersonDetails";
const Step2 = ({ courrierServices, onNext, onPrevious, loading }) => {
  const { colors, roundness } = useTheme();
  const { values, validateForm, setFieldTouched, errors } = useFormikContext();
  // console.log(errors);
  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <Image
          style={styles.img}
          source={require("../../../assets/gift.png")}
          resizeMode="contain"
        />
      </View>
      <Text variant="headlineLarge">Finish: Delivery Information</Text>
      <View style={styles.form}>
        {values["deliveryType"] === "self" && (
          <>
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
          </>
        )}
        {values["deliveryType"] === "courrier" && (
          <>
            <FormItemPicker
              name="courrierService"
              icon="truck-fast"
              searchable
              label="Courrier Service"
              data={courrierServices}
              valueExtractor={({ _id }) => _id}
              labelExtractor={({ name }) => name}
              renderItem={({ item }) => (
                <List.Item
                  title={item.name}
                  style={styles.listItem}
                  left={(props) => <List.Icon {...props} icon="truck" />}
                />
              )}
              itemContainerStyle={[
                styles.itemContainer,
                { borderRadius: roundness },
              ]}
            />
          </>
        )}
        {["courrier"].includes(values["deliveryType"]) && (
          <>
            <View
              style={{
                padding: 10,
                backgroundColor: colors.surface,
                margin: 5,
                borderRadius: roundness,
              }}
            >
              <Text>Delivery Person details</Text>
              <DeliveryPersonDetails name="deliveryPerson" />
            </View>
            
          </>
        )}

        
        {/* <VenueFormInput
          name="deliveryAddress"
          icon="google-maps"
          placeholder="Enter delivery address"
          label="Delivery address"
        /> */}
        {values["deliveryType"] === "patient-preferred" && (
          <List.Item
            title="Using Patient Prefered delivery Information"
            style={{ backgroundColor: colors.surface, marginVertical: 10 }}
            left={(props) => (
              <List.Icon
                {...props}
                icon={"radiobox-marked"}
                color={colors.primary}
              />
            )}
          />
        )}
        <Button mode="contained" onPress={onPrevious} style={styles.btn}>
          Previous
        </Button>
        <Button
          mode="contained"
          loading={loading}
          onPress={async () => {
            if (values["deliveryType"] === "patient-preferred") return onNext();
            const fields = [
              
              "courrierService",
              "phoneNumber",
              "deliveryPerson",
            ];
            const errors = await validateForm(values);
            const invalidFields = Object.keys(errors);
            let valid = true;
            for (const field of fields) {
              const inValid = invalidFields.includes(field);
              if (inValid) {
                valid = !inValid;
                setFieldTouched(field, true);
              }
            }
            if (valid) onNext();
          }}
          style={styles.btn}
        >
          Confirm
        </Button>
      </View>
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({
  img: {
    height: screenWidth * 0.5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  form: {
    width: "100%",
    padding: 10,
    flex: 1,
  },
  itemContainer: {
    margin: 5,
  },
  listItem: {
    padding: 10,
  },
  btn: {
    marginTop: 10,
  },
});
