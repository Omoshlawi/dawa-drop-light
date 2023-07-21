import { StyleSheet, View, Text, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocationChoice from "./LocationChoice";
import { IconButton, useTheme } from "react-native-paper";
import useLocation from "../hooks/useLocation";
const LocationPicker = ({ location, onLocationChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [deliverLocation, setDeliveryLocation] = useState();
  const currLocation = useLocation();
  const { colors, roundness } = useTheme();
  useEffect(() => {
    if (deliverLocation) {
      if (onLocationChange instanceof Function) {
        onLocationChange(deliverLocation);
      }
    }
  }, [deliverLocation]);

  return (
    <>
      <View style={[styles.inputContainer, { borderRadius: roundness }]}>
        <MaterialCommunityIcons
          name="hospital-marker"
          size={30}
          color={colors.outline}
        />
        <Text style={[styles.input]}>
          {location && (location.longitude || location.latitude)
            ? `(${location.latitude}, ${location.longitude})`
            : "Choose Delivery Location"}
        </Text>
        <IconButton
          icon="chevron-down"
          size={30}
          onPress={() => setShowModal(true)}
        />
      </View>
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        animationType="slide"
      >
        <View style={styles.buttonsGroup}>
          <IconButton
            icon="check"
            mode="outlined"
            iconColor={colors.primary}
            // disabled={!Boolean(location)}
            onPress={() => {
              setShowModal(false);
            }}
          />
          <IconButton
            icon="close"
            mode="outlined"
            iconColor={colors.danger}
            onPress={() => setShowModal(false)}
          />
        </View>
        <LocationChoice
          defaultSpanLoc={location ? location : currLocation}
          onLocationChosen={setDeliveryLocation}
          defaultLocation={location ? location : currLocation}
        />
      </Modal>
    </>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,

    alignItems: "center",
    borderWidth: 1,
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 5,
  },
  listItem: {
    marginTop: 8,
  },
  mordal: {
    flex: 1,
  },
  itemDescription: {},
  itemTitle: {},
  title: {
    padding: 10,
    textAlign: "center",
  },
  buttonsGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
