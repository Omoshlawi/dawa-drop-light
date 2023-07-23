import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { getImageUrl } from "../../utils/helpers";
import { useTheme, Text } from "react-native-paper";
import { screenWidth } from "../../utils/contants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MenuItem = ({ item: { image, label }, checked }) => {
  const { colors, roundness } = useTheme();
  return (
    <View style={[styles.container]}>
      <MaterialCommunityIcons
        name={checked ? "radiobox-marked" : "radiobox-blank"}
        style={styles.icon}
        color={colors.primary}
        size={25}
      />
      <Image source={{ uri: getImageUrl(image) }} style={styles.img} />
      <Text style={styles.text} variant="titleLarge">
        {label}
      </Text>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  img: {
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
  },
  container: {
    padding: 10,
    width: screenWidth * 0.47,
    height: screenWidth * 0.47,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  text: {
    textAlign: "center",
    padding:10
  },
});
