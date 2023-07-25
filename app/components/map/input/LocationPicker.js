import { StyleSheet, View, Text, Modal, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocationChoice from "./LocationChoice";
import { IconButton, List, useTheme } from "react-native-paper";
import useLocation from "../hooks/useLocation";
import { SearchBar, SearchHeader } from "../../input";
import { useGeoService } from "../../../api";
import MapView, { Marker } from "react-native-maps";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const LocationPicker = ({ location, onLocationChange }) => {
  const [showModal, setShowModal] = useState(false);
  const { searchPlace } = useGeoService();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const currLocation = useLocation();
  const { colors, roundness } = useTheme();
  const [markerLocation, setMarkerLocation] = useState();

  useEffect(() => {
    handleSearch();
  }, [search]);
  useEffect(() => {
    if (currLocation) {
      setMarkerLocation(currLocation);
    }
  }, [currLocation]);

  const handleSpanAndPlot = (selected) => {
    setSearch(selected.display);
    const {
      coordinates: { lat: latitude, lng: longitude },
    } = selected;
    setMarkerLocation({ latitude, longitude });
  };

  const handleSearch = async () => {
    const response = await searchPlace({ q: search });
    if (response.ok) {
      setSearchResults(response.data.results);
    }
  };

  const coords = markerLocation || currLocation;

  return (
    <>
      <View style={[styles.inputContainer, { borderRadius: roundness }]}>
        <MaterialCommunityIcons
          name="hospital-marker"
          size={30}
          color={colors.outline}
        />
        <Text style={[styles.input]}>
          {location?.latitude && location?.longitude
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
          <View style={{ flex: 1, width: "100%" }}>
            {/* <GooglePlacesAutocomplete
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
            /> */}
            <SearchBar
              placeholder="Search..."
              searchValue={search}
              onSearchValueChange={setSearch}
              searchResults={searchResults}
              renderItem={({ item }) => <List.Item title={item.display} />}
              onSelectItem={handleSpanAndPlot}
              onClearSearchText={() => setSearch("")}
            />
          </View>
        </View>
        {markerLocation && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: markerLocation.latitude,
                longitude: markerLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={markerLocation }
                title="Long press and drag to your desired location"
                draggable
                onDragEnd={(e) => {
                  setMarkerLocation(e.nativeEvent.coordinate);
                  if (onLocationChange instanceof Function)
                    onLocationChange(e.nativeEvent.coordinate);
                }}
              >
                <Image
                  source={require("../../../assets/hospitalmarker.png")}
                  style={{ width: 60, height: 60 }}
                />
              </Marker>
            </MapView>
          </View>
        )}
      </Modal>
    </>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },
  map: {
    flex: 1,
  },
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
