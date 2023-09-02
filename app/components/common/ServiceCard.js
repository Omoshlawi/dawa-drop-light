import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { useTheme, Text } from "react-native-paper";

const ServiceCard = ({ image, title, subTitle }) => {
  const { colors, roundness } = useTheme();
  return (
    <View
      style={[
        styles.card,
        { borderRadius: roundness, backgroundColor: colors.surface },
      ]}
    >
      <View
        style={[
          styles.imgContainer,
          {
            backgroundColor: colors.waningLight,
            borderRadius: roundness + 10,
          },
        ]}
      >
        <Image source={image} resizeMode="contain" style={styles.image} />
      </View>
      <View style={styles.cardContent}>
        <Text variant="headlineSmall">{title}</Text>
        <Text>{subTitle}</Text>
      </View>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  imgContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingLeft: 10,
    flex: 1,
  },
  text: {
    textAlign: "left",
  },
});
