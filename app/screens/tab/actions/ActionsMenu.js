import { StyleSheet, View, Image, Dimensions } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeArea } from "../../../components/layout";
import { useAuthorize, useUser } from "../../../api";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { getImageUrl } from "../../../utils/helpers";
import { get } from "../../../navigation";
const itemWidth = Dimensions.get("window").width / 2 - 5;
const ActionsMenu = ({ navigation }) => {
  const { getUser, getUserId } = useUser();
  const { getUserAuthInfo } = useAuthorize();
  const { colors } = useTheme();
  const [user, setUser] = useState(null);
  const [menuOptions, setMenuOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );
  const handleFetch = async () => {
    setLoading(true);
    const response = await getUser();
    const mresponse = await getUserAuthInfo(getUserId());
    setLoading(false);
    if (response.ok) {
      setUser(response.data);
    }
    if (mresponse.ok) {
      setMenuOptions(mresponse.data.menuOptions);
    }
  };

  if (!user) {
    return null;
  }
  const { isSuperUser, roles } = user;
  return (
    <SafeArea>
      <FlatList
        onRefresh={handleFetch}
        refreshing={loading}
        data={menuOptions}
        contentContainerStyle={styles.itemsContainer}
        numColumns={2}
        renderItem={({ item, index }) => {
          const { label, image, link } = item;
          const { screen, route, params } = get(link);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate(route, { screen, params });
              }}
            >
              <View style={[styles.item, { backgroundColor: colors.surface }]}>
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={{ uri: getImageUrl(image) }}
                />
                <Text variant="titleMedium" style={styles.title}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeArea>
  );
};

export default ActionsMenu;

const styles = StyleSheet.create({
  image: {
    width: itemWidth,
    height: 60,
  },
  item: {
    width: itemWidth - 5,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemsContainer: {
    padding: 10,
    alignItems: "center",
  },
});
