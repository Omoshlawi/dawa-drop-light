import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { Chip } from "react-native-paper";

const ChipedMultipleSelector = ({ defaultSelection = [], items = [] }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={items}
      renderItem={({ item }) => {
        <Chip></Chip>
      }}
    />
  );
};

export default ChipedMultipleSelector;

const styles = StyleSheet.create({});
