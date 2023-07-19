import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, IconButton, useTheme } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../hooks/useLocation";
/**
 *
 * @param {*} param0
 * docs: https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md
 * docs2:https://github.com/react-native-maps/react-native-maps
 * @returns
 */

const LocationChoice = ({ setVisible, onLocationChosen }) => {
  const location = useLocation();
  const { colors } = useTheme();
  const [markerLocation, setMarkerLocation] = useState();
  useEffect(() => {
    setMarkerLocation({ ...location });
  }, [location]);
  return (
    <View style={styles.screen}>
      <View style={styles.buttonsGroup}>
        <IconButton
          icon="check"
          mode="outlined"
          iconColor={colors.primary}
          disabled={!Boolean(location)}
          onPress={() => {
            if (onLocationChosen instanceof Function) {
              onLocationChosen(markerLocation);
            }
            setVisible(false);
          }}
        />
        <IconButton
          icon="close"
          mode="outlined"
          iconColor={colors.danger}
          onPress={() => setVisible(false)}
        />
      </View>
      {location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
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
  buttonsGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
