import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconButton, useTheme, Text } from "react-native-paper";
import { Modal } from "react-native";

const SearchBar = ({
  placeholder,
  searchValue,
  onSearchValueChange,
  searchResults = [],
  renderItem,
  itemContainerStyle,
  onSelectItem,
  onClearSearchText,
}) => {
  const { colors, roundness } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <View>
      <View
        style={[
          {
            backgroundColor: colors.surface,
            borderRadius: roundness,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.inputContainer, { padding: 10 }]}
          onPress={() => setOpen(true)}
        >
          <MaterialCommunityIcons name="magnify" size={20} />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            editable={false}
            value={searchValue}
          />
          <MaterialCommunityIcons name="close" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={open}
        onRequestClose={() => setOpen(false)}
        animationType="fade"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setOpen(false)}>
            <MaterialCommunityIcons name="chevron-left" size={30} />
          </TouchableOpacity>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colors.background,
                borderRadius: roundness + 30,
                marginHorizontal: 10,
              },
            ]}
          >
            <MaterialCommunityIcons name="magnify" size={20} />
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              autoFocus
              onChangeText={onSearchValueChange}
              value={searchValue}
            />
            {searchValue && (
              <TouchableOpacity
                style={{ paddingRight: 5 }}
                onPress={onClearSearchText}
              >
                <MaterialCommunityIcons name="close-circle" size={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={styles.title} variant="titleLarge">
          Search Results
        </Text>
        <FlatList
          data={searchResults}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={itemContainerStyle}
              onPress={() => {
                if (onSelectItem instanceof Function) {
                  onSelectItem(item);
                }
                setOpen(false);
              }}
            >
              {renderItem({ item, index })}
            </TouchableOpacity>
          )}
        />
      </Modal>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {},
  input: {
    flex: 1,

    marginHorizontal: 10,
  },
  inputContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingLeft: 10,
  },
  title: {
    padding: 10,
  },
});
