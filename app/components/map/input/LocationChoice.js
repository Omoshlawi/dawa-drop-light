import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
/**
 *
 * @param {*} param0
 * docs: https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md
 * docs2:https://github.com/react-native-maps/react-native-maps
 * @returns
 */

const LocationChoice = ({
  defaultSpanLoc,
  defaultLocation,
  onLocationChosen,
}) => {
  const [markerLocation, setMarkerLocation] = useState(defaultLocation);
  const [spanLocation, setSpanLocation] = useState(defaultSpanLoc);

  return (
    <View style={styles.screen}>
      {defaultSpanLoc && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: spanLocation.latitude,
              longitude: spanLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={markerLocation}
              title="Long press and drag to your desired location"
              draggable
              onDragEnd={(e) => {
                setMarkerLocation(e.nativeEvent.coordinate);
                onLocationChosen(e.nativeEvent.coordinate);
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
    </View>
  );
};

export default LocationChoice;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  screen: {
    flex: 1,
  },
});
