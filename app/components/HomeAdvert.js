import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { useTheme, Text } from "react-native-paper";
import { screenWidth } from "../utils/contants";

const HomeAdvert = () => {
  const { colors, roundness } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.primary,
          borderRadius: roundness + 20,
        },
      ]}
    >
      <Image
        style={styles.nurse}
        resizeMode="contain"
        source={require("../assets/nurse.png")}
      />
      <View style={styles.cardContent}>
        <Text
          variant="headlineMedium"
          style={[styles.text, { fontWeight: "bold" }]}
        >
          Get the best Medical service and live healthy
        </Text>
        <Text style={styles.text}>Saving lives through digital solutions</Text>
      </View>
    </View>
  );
};

export default HomeAdvert;

const styles = StyleSheet.create({
  nurse: {
    height: "100%",
    flex: 1,
  },
  card: {
    height: screenWidth * 0.5,
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    overflow: "hidden",
    marginBottom: 20,
  },
  cardContent: {
    flex: 1,
  },
  text: {
    padding: 15,
  },
});
