import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useOrder } from "../../api";
import { SafeArea } from "../../components/layout";
import { FlatList } from "react-native";
import { FAB, List, useTheme, Card, Avatar } from "react-native-paper";
import routes from "../../navigation/routes";

const DeliveryMethod = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  const { getDeliveryMethods } = useOrder();
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const handleFetch = async () => {
    setLoading(true);
    const response = await getDeliveryMethods();
    setLoading(false);
    if (response.ok) {
      setDeliveryMethods(response.data.results);
    } else {
      console.log(response.problem, response.data);
    }
  };
  return (
    <SafeArea>
      <FlatList
        refreshing={loading}
        onRefresh={handleFetch}
        data={deliveryMethods}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => {
          const { _id, name, description } = item;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.ORDERS_NAVIGATION, {
                  screen: routes.ORDERS_DELIVERY_METHOD_FORM_SCREEN,
                  params: item,
                })
              }
            >
              <Card.Title
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title={name}
                titleVariant="headlineSmall"
                subtitle={description}
                subtitleVariant="bodyLarge"
                subtitleNumberOfLines={3}
                subtitleStyle={{ color: colors.disabled }}
                left={(props) => (
                  <Avatar.Icon {...props} icon="truck-delivery" />
                )}
                right={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="chevron-right"
                    color={colors.primary}
                    style={{ backgroundColor: colors.surface }}
                  />
                )}
              />
            </TouchableOpacity>
          );
        }}
      />
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.secondary }]}
        color={colors.surface}
        onPress={() => {
          navigation.navigate(routes.ORDERS_NAVIGATION, {
            screen: routes.ORDERS_DELIVERY_METHOD_FORM_SCREEN,
          });
        }}
      />
    </SafeArea>
  );
};

export default DeliveryMethod;

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
