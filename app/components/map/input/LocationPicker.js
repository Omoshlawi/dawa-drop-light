import { StyleSheet, View, TextInput, Text, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocationChoice from "./LocationChoice";
import { IconButton } from "react-native-paper";
import { AppErrorMessage } from "../forms";
import { useFormikContext } from "formik";
const LocationPicker = () => {
  const [showModal, setShowModal] = useState(false);
  const { setFieldValue, errors, touched, values, handleChange } =
    useFormikContext();
  const [deliverLocation, setDeliveryLocation] = useState();

  useEffect(() => {
    if (deliverLocation) {
      setFieldValue("latitude", deliverLocation.latitude);
      setFieldValue("longitude", deliverLocation.longitude);
    }
  }, [deliverLocation]);

  return (
    <>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="hospital-marker"
          size={30}
          color={colors.medium}
        />
        <Text
          style={[
            styles.input,
            values.longitude || values.latitude ? {} : { color: colors.medium },
          ]}
        >
          {values.longitude || values.latitude
            ? `(${values.latitude}, ${values.longitude})`
            : "Choose Delivery Location"}
        </Text>
        <IconButton
          icon="chevron-down"
          size={30}
          onPress={() => setShowModal(true)}
        />
      </View>
      <AppErrorMessage
        error={
          errors.latitude || errors.longitude
            ? "Delivery address cant be null"
            : ""
        }
        visible={touched}
      />
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        animationType="slide"
      >
        <LocationChoice
          setVisible={setShowModal}
          onLocationChosen={setDeliveryLocation}
        />
      </Modal>
    </>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    margin: 5,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 5,
  },
  listItem: {
    backgroundColor: colors.white,
    marginTop: 8,
  },
  mordal: {
    backgroundColor: colors.background,
    flex: 1,
  },
  itemDescription: {
    color: colors.medium,
  },
  itemTitle: {
    color: colors.black,
  },
  title: {
    padding: 10,
    textAlign: "center",
    color: colors.primary,
  },
});
