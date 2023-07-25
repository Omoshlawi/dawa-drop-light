import { StyleSheet, View, Text, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocationChoice from "./LocationChoice";
import { IconButton, useTheme } from "react-native-paper";
import useLocation from "../hooks/useLocation";
import { SearchHeader } from "../../input";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

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
        <View style={styles.header}>
          <IconButton
            style={styles.close}
            icon="close"
            iconColor={colors.error}
            onPress={() => setShowModal(false)}
          />
          <View style={{ flex: 1, width: "100%", }}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              query={{
                key: "YOUR API KEY",
                language: "en",
              }}
              onFail={(error) => console.error(error)}
            />
          </View>
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
  close: {
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
    borderWidth: 1,
    marginTop: 10,
  },
  input: {
    flex: 1,
    padding: 10,
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
  header: {
    padding: 5,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: "center",
    flex: 1,
    backgroundColor: "#FBF0DCA6",
  },
});
