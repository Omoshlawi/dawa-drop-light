import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { useAuthorize } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { SafeArea } from "../../components/layout";
import { FlatList } from "react-native";
import { Avatar, Card, FAB, List, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";
import { getImageUrl } from "../../utils/helpers";

const MenuOptiions = ({ navigation, route }) => {
  const { getMenuOptions } = useAuthorize();
  const [menuOptions, setMenuOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  useFocusEffect(
    useCallback(() => {
      handleFetchMenuOptions();
    }, [])
  );

  const handleFetchMenuOptions = async () => {
    setLoading(true);
    const response = await getMenuOptions();
    setLoading(false);

    if (response.ok) {
      setMenuOptions(response.data.results);
    }
  };
  return (
    <SafeArea>
      <FlatList
        refreshing={loading}
        onRefresh={handleFetchMenuOptions}
        data={menuOptions}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => {
          const { label, description, image, link } = item;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.PERMISIONS_NAVIGATION, {
                  screen: routes.PERMISIONS_MENU_OPTION_DETAIL_SCREEN,
                  params: item,
                })
              }
            >
              <Card.Title
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title={label}
                titleVariant="headlineSmall"
                subtitle={description}
                subtitleVariant="bodyLarge"
                subtitleNumberOfLines={3}
                subtitleStyle={{ color: colors.disabled }}
                left={(props) => (
                  <Avatar.Image
                    source={{ uri: getImageUrl(image) }}
                    {...props}
                  />
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
        onPress={() =>
          navigation.navigate(routes.PERMISIONS_NAVIGATION, {
            screen: routes.PERMISIONS_MENU_OPTION_FORM_SCREEN,
          })
        }
        color={colors.surface}
      />
    </SafeArea>
  );
};

export default MenuOptiions;

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 5,
    padding: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
