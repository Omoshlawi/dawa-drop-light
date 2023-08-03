import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Callout, Polyline } from "react-native-maps";
import { useGeoService } from "../../api";
import { useLocation } from "../../components/map";

const ProviderTruckDelivery = ({ navigation, route: navRoute }) => {
  const delivery = navRoute.params;
  const { direction } = useGeoService();
  const location = useLocation();
  const [route, setRoute] = useState([]);
  const [currLocation, setCurrLocation] = useState();

  const handleFetchRoute = async () => {
    if (location) {
      const response = await direction({
        src: { lat: location.latitude, lng: location.longitude },
        dst: {
          lat: delivery.order.deliveryAddress.latitude,
          lng: delivery.order.deliveryAddress.longitude,
        },
      });
      if (
        response.ok &&
        response.data.route &&
        response.data.route.legs.length > 0
      ) {
        setRoute(
          response.data.route.legs[0].maneuvers.map((man) => ({
            latitude: man.startPoint.lat,
            longitude: man.startPoint.lng,
          }))
        );
        if (mapRef.current) {
          mapRef.current.fitToSuppliedMarkers([
            "currLocation",
            "destinationLocation",
          ]);
        }
      }
    }
  };

  const mapRef = useRef(null);

  useEffect(() => {
    if (location) {
      setCurrLocation(location);
      handleFetchRoute();
    }
  }, [location]);
  return (
    <View style={styles.screen}>
      {currLocation && (
        <MapView
          ref={mapRef}
          style={styles.map}
          mapType="mutedStandard"
          provider="google"
          initialRegion={{
            latitude: currLocation.latitude,
            longitude: currLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          fitToSuppliedMarkers={[]}
        >
          <>
            <Polyline coordinates={route} strokeWidth={3} />
            <Marker
              coordinate={currLocation} //Source(Ahent curent location marker)
              title={"Your Current Location"}
              identifier="currLocation"
            >
              <Image
                source={require("../../assets/hospital.png")}
                style={{ width: 60, height: 60 }}
              />
            </Marker>
            <Marker
              coordinate={{
                latitude: delivery.order.deliveryAddress.latitude,
                longitude: delivery.order.deliveryAddress.longitude,
              }} // Patient Order delivery Address marker
              title={delivery.order.deliveryAddress.address}
              identifier="destinationLocation"
            >
              <Image
                source={require("../../assets/hospitalmarker.png")}
                style={{ width: 60, height: 60 }}
              />
            </Marker>
          </>
        </MapView>
      )}
    </View>
  );
};

export default ProviderTruckDelivery;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
