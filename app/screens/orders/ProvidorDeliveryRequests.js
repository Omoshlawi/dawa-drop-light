import { StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { useLocation } from "../../components/map";
import { useProvidor } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { SwipableBottomSheet } from "../../components/display";

const ProvidorDeliveryRequests = () => {
  const location = useLocation();
  const { getPendingOrderRequests } = useProvidor();
  const [requests, setRequests] = useState([]);

  const handleFetch = async () => {
    const response = await getPendingOrderRequests();
    if (response.ok) {
      setRequests(response.data.results);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  return (
    <View style={styles.screen}>
      {location && (
        <MapView
          style={styles.map}
          mapType="mutedStandard"
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {requests.map((request) => {
            const {
              _id,
              deliveryAddress: { latitude, longitude, address },
            } = request;
            return (
              <Marker
                coordinate={{ latitude, longitude }}
                title={address}
                key={_id}
              >
                <Image
                  source={require("../../assets/hospitalmarker.png")}
                  style={{ width: 60, height: 60 }}
                />
              </Marker>
            );
          })}
        </MapView>
      )}
      <SwipableBottomSheet />
    </View>
  );
};

export default ProvidorDeliveryRequests;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
