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
  const [currIndex, setCurIndex] = useState(null);

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
          provider="google"
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {requests.map((request, index) => {
            const {
              _id,
              deliveryAddress: { latitude, longitude, address },
            } = request;
            return (
              <Marker
                coordinate={{ latitude, longitude }}
                title={address}
                key={_id}
                onPress={() => {
                  setCurIndex(index);
                }}
              >
                <Image
                  //   source={require("../../assets/hospitalmarker.png")}
                  source={{
                    uri: "https://assets.mapquestapi.com/icon/v2/marker-start-md-F8E71C-417505-A@1x.png",
                  }}
                  style={{ width: 60, height: 60 }}
                />
              </Marker>
            );
          })}
        </MapView>
      )}
      {currIndex !== null && (
        <SwipableBottomSheet>
          <View style={styles.requestContainer}>
            <Text>{requests[currIndex]._id}</Text>
          </View>
        </SwipableBottomSheet>
      )}
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
  requestContainer: {
    flex: 1,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
  },
});
