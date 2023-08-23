import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useAuthorize } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { Avatar, Card, FAB, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";

const ARTModels = ({ navigation }) => {
  const { getARTModels } = useAuthorize();
  const [loading, setLoading] = useState(false);
  const [artModels, setARTModels] = useState([]);
  const { colors, roundness } = useTheme();
  const handleFetch = async () => {
    setLoading(true);
    const response = await getARTModels();
    setLoading(false);
    if (response.ok) {
      setARTModels(response.data.results);
    } else {
      console.log(response.problem, response.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  return (
    <View style={styles.screen}>
      <FlatList
        refreshing={loading}
        onRefresh={handleFetch}
        data={artModels}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => {
          const { _id, name, description } = item;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.PERMISIONS_NAVIGATION, {
                  screen: routes.PERMISIONS_ART_MODELS_FORM_SCREEN,
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
                  <Avatar.Icon {...props} icon="account-supervisor-outline" />
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
          navigation.navigate(routes.PERMISIONS_NAVIGATION, {
            screen: routes.PERMISIONS_ART_MODELS_FORM_SCREEN,
          });
        }}
      />
    </View>
  );
};

export default ARTModels;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listItem: {
    marginVertical: 2,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
