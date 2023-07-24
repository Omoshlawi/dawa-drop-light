import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchHeader from "./SearchHeader";
import { FlatList } from "react-native";
import { useTheme } from "react-native-paper";


const AutoComplete = () => {
  const { colors, roundness } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <SearchHeader backgroundColor={colors.surface} />
      <FlatList
        data={["Hellow", "There", "sample", "test"]}
        renderItem={({ item, index }) => <Text key={index}>{item}</Text>}
      />
    </View>
  );
};

export default AutoComplete;

const styles = StyleSheet.create({});
