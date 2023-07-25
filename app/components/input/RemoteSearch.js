import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RemoteSearch = ({
  icon,
  data = [],
  valueExtractor, //required
  renderItem,
  placeHolder,
  title,
  labelExtractor, //required
  value,
  onValueChange,
  numColumns,
  horozontal,
  titleStyle,
  contentContainerStyle,
  itemContainerStyle,
  multiple = false,
  activeBackgroundColor,
  inactiveBackgroundColor,
  outline = true,
  label,
  searchable,
}) => {
  return (
    <View>
      <Text>RemoteSearch</Text>
    </View>
  );
};

export default RemoteSearch;

const styles = StyleSheet.create({});
