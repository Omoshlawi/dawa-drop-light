import { StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Marker, Callout, Polyline } from "react-native-maps";
import { useGeoService, useOrder, useSocket } from "../../api";
import { useLocation } from "../../components/map";
import { Avatar, Button, Card, List, useTheme } from "react-native-paper";
import { callNumber } from "../../utils/helpers";
import { AlertDialog, Dialog } from "../../components/dialog";
import routes from "../../navigation/routes";
import { useFocusEffect } from "@react-navigation/native";

const ProviderTruckDelivery = ({ navigation, route: navRoute }) => {
  const _delivery = navRoute.params;
  const { direction } = useGeoService();
  const location = useLocation();
  const [route, setRoute] = useState([]);
  const [currLocation, setCurrLocation] = useState();
  const { subscribe } = useSocket();
  const { colors, roundness } = useTheme();
  const { tripAction, getDelivery } = useOrder();
  const [loading, setLoading] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message: "Yor trip was ended successfully!",
    mode: "success",
  });
  const [delivery, setDelivery] = useState(_delivery);
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

  const simulateMovement = () => {
    const { emit, disconect } = subscribe({
      name: "join",
      receiver: (data) => {
        console.log("Received data", data);
        disconect();
      },
    });
    emit("omosh");
  };

  const handleTripAction = async (action) => {
    setLoading(true);
    const response = await tripAction(delivery._id, action, {
      location: currLocation,
    });
    setLoading(false);
    if (response.ok) {
      setDialogInfo({
        ...dialogInfo,
        show: true,
        mode: "success",
        message: `Trip ${
          action === "start" ? "started" : "ended"
        } successfully!`,
      });
      await handleFetch();
    } else if (response.status === 400) {
      setDialogInfo({
        ...dialogInfo,
        show: true,
        mode: "error",
        message: JSON.stringify(response.data),
      });
    } else {
      setDialogInfo({
        ...dialogInfo,
        show: true,
        mode: "error",
        message: response.data.detail
          ? response.data.detail
          : "Unknow Error Occured",
      });
    }
  };

  const handleFetch = async () => {
    const response = await getDelivery(_delivery._id);
    if (response.ok) {
      setDelivery(response.data);
    }
  };

  const mapRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );

  useEffect(() => {
    if (location) {
      setCurrLocation(location);
      handleFetchRoute();
    }
  }, [location]);
  return (
    <View style={styles.screen}>
      {currLocation && (
        <>
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
          <Card
            style={[
              styles.overLay,
              { backgroundColor: colors.waningLight, borderRadius: roundness },
            ]}
          >
            <Card.Title
              title={
                delivery.order.deliveryAddress.address
                  ? delivery.order.deliveryAddress.address
                  : `(${delivery.order.deliveryAddress.latitude},${delivery.order.deliveryAddress.longitude})`
              }
              titleVariant="titleLarge"
              titleNumberOfLines={2}
              // subtitle={"Status: " +delivery.status}
              left={(props) => <Avatar.Icon {...props} icon="google-maps" />}
            />
            <Card.Actions>
              <Button onPress={() => callNumber(delivery.order.phoneNumber)}>
                {"Call receiver"}
              </Button>
              {Boolean(delivery.status) === false && (
                <Button
                  loading={loading}
                  disabled={loading}
                  onPress={async () => await handleTripAction("start")}
                >
                  {"Start Trip"}
                </Button>
              )}
              {delivery.status === "pending" && (
                <Button
                  disabled={loading}
                  loading={loading}
                  onPress={async () => await handleTripAction("end")}
                >
                  {"End Trip"}
                </Button>
              )}
            </Card.Actions>
          </Card>
        </>
      )}
      <Dialog visible={dialogInfo.show}>
        <AlertDialog
          message={dialogInfo.message}
          mode={dialogInfo.mode}
          onButtonPress={() => {
            setDialogInfo({ ...dialogInfo, show: false });
            if (dialogInfo.mode === "success") {
            } else {
              navigation.navigate(routes.ORDERS_NAVIGATION, {
                screen: routes.ORDERS_PROVIDOR_DELIVERY_HISTORY_SCREEN,
              });
            }
          }}
        />
      </Dialog>
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
  overLay: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    width: "80%",
  },
});
