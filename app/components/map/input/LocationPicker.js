import { StyleSheet, View, Text, Modal, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocationChoice from "./LocationChoice";
import { IconButton, List, useTheme } from "react-native-paper";
import useLocation from "../hooks/useLocation";
import { SearchBar, SearchHeader } from "../../input";
import { useGeoService } from "../../../api";
import MapView, { Marker, Callout } from "react-native-maps";
import { TouchableOpacity } from "react-native";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const LocationPicker = ({ location, onLocationChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const { searchPlace, reverseGeoCode } = useGeoService();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const currLocation = useLocation();
  const { colors, roundness } = useTheme();
  const [markerLocation, setMarkerLocation] = useState();
  const [region, setRegion] = useState();
  const [geoCoded, setGeoCoded] = useState("");
  useEffect(() => {
    handleSearch();
  }, [search]);
  useEffect(() => {
    if (currLocation) {
      setMarkerLocation(currLocation);
      setRegion({
        ...currLocation,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [currLocation]);
  useEffect(() => {
    if (markerLocation) {
      handleReverseGeoCode({
        lat: markerLocation.latitude,
        lng: markerLocation.longitude,
      });
      if (onLocationChange instanceof Function && selected) {
        onLocationChange({ ...markerLocation, address: geoCoded });
        setSelected(false);
      }
    }
  }, [markerLocation, geoCoded, selected]);

  const handleSpanAndPlot = (selected) => {
    setSearch(selected.display);
    const {
      coordinates: { lat: latitude, lng: longitude },
    } = selected;
    setMarkerLocation({ latitude, longitude });
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleSearch = async () => {
    const response = await searchPlace({ q: search });
    if (response.ok) {
      setSearchResults(response.data.results);
    }
  };

  const handleReverseGeoCode = async ({ lat, lng }) => {
    const response = await reverseGeoCode({ location: `${lat},${lng}` });
    if (
      response.ok &&
      response.data.results.length > 0 &&
      response.data.results[0].locations.length > 0
    ) {
      const location = response.data.results[0].locations[0];
      setGeoCoded(location.label);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.inputContainer, { borderRadius: roundness }]}
        onPress={() => setShowModal(true)}
      >
        <MaterialCommunityIcons
          name="hospital-marker"
          size={30}
          color={colors.outline}
        />
        <Text style={[styles.input]}>
          {location?.latitude && location?.longitude
            ? `${location.address || ""}(${location.latitude}, ${
                location.longitude
              })`
            : "Choose Delivery Location"}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={30} />
      </TouchableOpacity>
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
              region={region}
              onRegionChangeComplete={(newRegion) => {
                setRegion(newRegion);
              }}
            >
              <Marker
                coordinate={markerLocation}
                title="Long press and drag to your desired location"
                draggable
                onDragEnd={async (e) => {
                  setMarkerLocation(e.nativeEvent.coordinate);
                  setRegion({ ...region, ...e.nativeEvent.coordinate });
                }}
              >
                <Image
                  source={require("../../../assets/hospitalmarker.png")}
                  style={{ width: 60, height: 60 }}
                />
                <Callout
                  style={styles.callOut}
                  onPress={() => {
                    Alert.alert(
                      "Confirmation",
                      `Are you sure you want choose location ${geoCoded}(${markerLocation.latitude}, ${markerLocation.longitude})`,
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            setSelected(true);
                            setShowModal(false);
                          },
                        },
                        { text: "No" },
                      ]
                    );
                  }}
                >
                  <Text>{geoCoded}</Text>
                </Callout>
              </Marker>
            </MapView>
          </View>
        )}
      </Modal>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  close: {
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
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
