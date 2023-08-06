import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MapView, { Marker, Callout, Polyline } from "react-native-maps";
import { useLocation } from "../../components/map";
import { useGeoService, useProvidor, useUser } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { SwipableBottomSheet } from "../../components/display";
import { Avatar, Button, Card, List, useTheme } from "react-native-paper";
import { pick } from "lodash";
import { AlertDialog, Dialog } from "../../components/dialog";
import { AcceptDeliveryTaskForm } from "../../components/order";

const ProvidorDeliveryRequests = ({ navigation }) => {
  const location = useLocation();
  const { getPendingOrderRequests, createDelivery } = useProvidor();
  const { getUserId } = useUser();
  const [requests, setRequests] = useState([]);
  const [options, setOptions] = useState({
    currIndex: -1,
    showPath: false,
  });
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    message:
      "The delivery task has been assigned to you succesfully Successfully!",
    mode: "success",
  });
  const { aproximateDistanceTime, direction } = useGeoService();
  const [matrix, setMatrix] = useState({
    distance: null,
    time: null,
  });

  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFetch = async () => {
    const response = await getPendingOrderRequests();
    if (response.ok) {
      setRequests(response.data.results);
    }
  };

  const handleFetchMatrix = async (data) => {
    if (location && currIndex !== -1) {
      const response = await aproximateDistanceTime({
        src: { lat: location.latitude, lng: location.longitude },
        dst: {
          lat: requests[currIndex].deliveryAddress.latitude,
          lng: requests[currIndex].deliveryAddress.longitude,
        },
      });
      if (response.ok && response.data.time && response.data.distance) {
        setMatrix({
          distance: response.data.distance[1],
          time: response.data.time[1],
        });
      }
    }
  };

  const { currIndex, showPath } = options;

  const handleFetchRoute = async (data) => {
    if (location && currIndex !== -1) {
      const response = await direction({
        src: { lat: location.latitude, lng: location.longitude },
        dst: {
          lat: requests[currIndex].deliveryAddress.latitude,
          lng: requests[currIndex].deliveryAddress.longitude,
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
        setMatrix({
          distance: response.data.route.distance,
          time: response.data.route.time,
        });
      }
    }
  };

  const handleAcceptJob = async (values, { setFieldError }) => {
    if (location && currIndex !== -1) {
      setLoading(true);
      const response = await createDelivery({
        order: requests[currIndex]._id,
        deliveredBy: getUserId(),
        status: "pending",
        ...values,
      });
      setLoading(false);
      if (response.ok) {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          mode: "success",
          message:
            "The delivery task has been assigned to you succesfully Successfully!",
        });
      } else if (response.status === 400) {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          mode: "error",
          message: JSON.stringify(response.data),
        });
        console.log(response.data);
      } else {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          mode: "error",
          message: response.data.detail
            ? response.data.detail
            : "Unknow Error Occured",
        });
        console.log(response.data);
      }
    }
  };

  useEffect(() => {
    if (currIndex !== -1) {
      // handleFetchMatrix();
      handleFetchRoute();
    }
  }, [options]);

  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  const { colors, roundness } = useTheme();
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
          {showPath === false &&
            requests.map((request, index) => {
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
                    setOptions({ ...options, currIndex: index });
                  }}
                >
                  <Image
                    source={require("../../assets/hospitalmarker.png")}
                    // source={{
                    //   uri: "https://assets.mapquestapi.com/icon/v2/marker-start-md-F8E71C-417505-A@1x.png",
                    // }}
                    style={{ width: 60, height: 60 }}
                  />
                </Marker>
              );
            })}
          {showPath && (
            <>
              <Polyline coordinates={route} strokeWidth={3} />
              <Marker
                coordinate={location} //Source(Ahent curent location marker)
                title={"Your Current Location"}
              >
                <Image
                  source={require("../../assets/hospital.png")}
                  style={{ width: 60, height: 60 }}
                />
              </Marker>
              <Marker
                coordinate={{
                  latitude: requests[currIndex].deliveryAddress.latitude,
                  longitude: requests[currIndex].deliveryAddress.longitude,
                }} // Patient Order delivery Address marker
                title={requests[currIndex].deliveryAddress.address}
              >
                <Image
                  source={require("../../assets/hospitalmarker.png")}
                  style={{ width: 60, height: 60 }}
                />
              </Marker>
            </>
          )}
        </MapView>
      )}
      {currIndex !== -1 && (
        <SwipableBottomSheet>
          <View style={styles.requestContainer}>
            <FlatList
              data={[requests[currIndex]]}
              keyExtractor={({ _id }) => _id}
              renderItem={({ item, index }) => {
                const { _id, deliveryAddress } = item;
                const active = index === currIndex;
                return (
                  <View
                    style={[
                      { backgroundColor: colors.background },
                      styles.card,
                    ]}
                  >
                    <Card.Title
                      title={deliveryAddress.address || _id}
                      left={(props) => (
                        <Avatar.Icon {...props} icon="google-maps" />
                      )}
                    />
                    <Card.Content>
                      <List.Item
                        style={{
                          backgroundColor: colors.surface,
                          marginBottom: 5,
                        }}
                        title="Distance(Meteres)"
                        description={
                          matrix.distance ? matrix.distance : "Unknown"
                        }
                        left={(props) => (
                          <List.Icon {...props} icon="map-marker-distance" />
                        )}
                      />
                      <List.Item
                        style={{ backgroundColor: colors.surface }}
                        title="Time"
                        description={matrix.time ? matrix.time : "Unknown"}
                        left={(props) => <List.Icon {...props} icon="clock" />}
                      />
                    </Card.Content>
                    <Card.Actions>
                      <Button
                        onPress={() =>
                          setOptions({ ...options, showPath: !showPath })
                        }
                      >
                        Toggle Show Route
                      </Button>
                      <Button
                        onPress={() => {
                          setDialogInfo({
                            ...dialogInfo,
                            show: true,
                            mode: "form",
                          });
                        }}
                      >
                        Take Task
                      </Button>
                    </Card.Actions>
                  </View>
                );
              }}
            />
          </View>
        </SwipableBottomSheet>
      )}
      <Dialog visible={dialogInfo.show}>
        {dialogInfo.mode === "form" ? (
          <>
            <AcceptDeliveryTaskForm
              defaultValues={{ location, streamUrl: "" }}
              onSubmit={handleAcceptJob}
              loading={loading}
            />
          </>
        ) : (
          <AlertDialog
            message={dialogInfo.message}
            mode={dialogInfo.mode}
            onButtonPress={() => {
              setDialogInfo({ ...dialogInfo, show: false });
              navigation.goBack();
            }}
          />
        )}
      </Dialog>
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
    borderRadius: 20,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
});
