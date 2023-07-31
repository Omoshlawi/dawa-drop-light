import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { useLocation } from "../../components/map";
import { useProvidor } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { SwipableBottomSheet } from "../../components/display";
import { Avatar, Button, Card, List, useTheme } from "react-native-paper";
import { pick } from "lodash";

const ProvidorDeliveryRequests = () => {
  const location = useLocation();
  const { getPendingOrderRequests } = useProvidor();
  const [requests, setRequests] = useState([]);
  const [currIndex, setCurIndex] = useState(-1);
  const [region, setRegion] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleFetch = async () => {
    const response = await getPendingOrderRequests();
    if (response.ok) {
      setRequests(response.data.results);
    }
  };

  useEffect(() => {
    if (location) {
      setRegion({ ...region, ...location });
    }
  }, [location]);

  const handleFetchRoute = async () => {
    if (location && currIndex !== -1) {
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  const { colors, roundness } = useTheme();
  return (
    <View style={styles.screen}>
      {region.latitude && region.longitude && (
        <MapView
          style={styles.map}
          mapType="mutedStandard"
          provider="google"
          region={region}
          onRegionChange={setRegion}
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
                  source={require("../../assets/hospitalmarker.png")}
                  // source={{
                  //   uri: "https://assets.mapquestapi.com/icon/v2/marker-start-md-F8E71C-417505-A@1x.png",
                  // }}
                  style={{ width: 60, height: 60 }}
                />
              </Marker>
            );
          })}
        </MapView>
      )}
      {currIndex !== -1 && (
        <SwipableBottomSheet>
          <View style={styles.requestContainer}>
            <FlatList
              data={requests}
              keyExtractor={({ _id }) => _id}
              renderItem={({ item, index }) => {
                const { _id, deliveryAddress } = item;
                const active = index === currIndex;
                return (
                  <Card
                    style={[
                      {
                        backgroundColor: active
                          ? colors.disabled
                          : colors.background,
                      },
                      styles.card,
                    ]}
                    onPress={() => {
                      setCurIndex(index);
                      setRegion({
                        ...region,
                        ...pick(requests[index].deliveryAddress, [
                          "longitude",
                          "latitude",
                        ]),
                      });
                    }}
                  >
                    <Card.Title
                      title={deliveryAddress.address || _id}
                      subtitle="Duration: 65758 meters | Time: 65758 hours"
                      left={(props) => (
                        <Avatar.Icon {...props} icon="google-maps" />
                      )}
                    />
                    <Card.Actions>
                      <Button>Take Task</Button>
                    </Card.Actions>
                  </Card>
                );
              }}
            />
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
    borderRadius: 20,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
});
