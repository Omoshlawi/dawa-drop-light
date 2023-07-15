import { StyleSheet, View, Image, Dimensions } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeArea } from "../../../components/layout";
import { useUser } from "../../../api";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { ACTIONS } from "../../../utils/contants";
const itemWidth = Dimensions.get("window").width / 2 - 5;
const ActionsMenu = ({ navigation }) => {
  const { getUser } = useUser();
  const { colors } = useTheme();
  const [user, setUser] = useState(null);
  useFocusEffect(
    useCallback(() => {
      handleFetchUser();
    }, [])
  );
  const handleFetchUser = async () => {
    const response = await getUser();
    if (response.ok) {
      setUser(response.data);
    }
  };

  if (!user) {
    return null;
  }
  const { isSuperUser, roles } = user;
  return (
    <SafeArea>
      <FlatList
        data={ACTIONS}
        contentContainerStyle={styles.itemsContainer}
        numColumns={2}
        renderItem={({ item, index }) => {
          const { title, image, destination } = item;
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate(
                  destination.parentRoute,
                  destination.nestedRoute
                )
              }
            >
              <View style={[styles.item, { backgroundColor: colors.surface }]}>
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={image}
                />
                <Text variant="titleMedium" style={styles.title}>
                  {title}
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
