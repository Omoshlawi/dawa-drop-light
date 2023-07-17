import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { IconButton, Text, useTheme } from "react-native-paper";

const SearchHeader = ({ text, onTextChange, onSearch, placeholder }) => {
  const { colors, roundness } = useTheme();
  return (
    <View style={styles.header}>
      <View
        style={[
          styles.search,
          { backgroundColor: colors.surface, borderRadius: roundness },
        ]}
      >
        <TextInput
          style={[styles.input]}
          value={text}
          onChangeText={onTextChange}
          placeholder={placeholder ? placeholder : "Search..."}
        />
        <IconButton
          style={{ borderRadius: roundness }}
          icon="magnify"
          mode="outlined"
          onPress={onSearch}
          containerColor={colors.primary}
          iconColor={colors.surface}
        />
      </View>
      {/* <IconButton
        style={styles.filterButton}
        icon="filter"
        mode="outlined"
        iconColor={colors.white}
        size={27}
      /> */}
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    flex: 1,
  },
  input: {
    padding: 10,
    flex: 1,
  },
  filterButton: {
    borderRadius: 10,
  },
  header: {
    margin: 10,
    flexDirection: "row",
  },
});
