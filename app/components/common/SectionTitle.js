import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconText } from "../display";

const SectionTitle = ({ text, icon = "square-edit-outline", onPress }) => {
  return (
    <View style={styles.titleRow}>
      <Text style={styles.title}>{text}</Text>
      <IconText icon={icon} size={20} onPress={onPress} />
    </View>
  );
};

export default SectionTitle;

const styles = StyleSheet.create({
  title: {
    textTransform: "capitalize",
    padding: 10,
    fontWeight: "bold",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
});
