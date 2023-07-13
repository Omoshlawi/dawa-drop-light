import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { IconButton } from "react-native-paper";
import { Modal } from "react-native";

const AppPicker = ({
  icon,
  data = [],
  valueExtractor,
  renderItem,
  placeHolder,
  title,
  labelExtractor,
  value, //shape: {key: "key used in data e,g url", value:"value in data"}
  onSelectItem,
  numColumns,
  horozontal,
  titleStyle,
  contentContainerStyle,
}) => {
  const [showModal, setShowModal] = useState(false);
  const current = data.find((item) => valueExtractor(item) === value);
  return (
    <>
      <View style={styles.inputContainer}>
        {icon && (
          <MaterialCommunityIcons name={icon} size={25} color={colors.medium} />
        )}

        <Text style={[styles.input, current ? {} : { color: colors.medium }]}>
          {current ? labelExtractor(current) : placeHolder}
        </Text>
        <IconButton
          icon="chevron-down"
          size={30}
          onPress={() => setShowModal(true)}
        />
      </View>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.mordal}>
          <IconButton
            style={styles.close}
            icon="close"
            onPress={() => setShowModal(false)}
            iconColor={colors.danger}
            mode="outlined"
          />
          <Text style={[styles.title, titleStyle]} variant="titleLarge">
            {title}
          </Text>
          <FlatList
            contentContainerStyle={contentContainerStyle}
            numColumns={numColumns}
            horizontal={horozontal}
            data={data}
            keyExtractor={valueExtractor}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  if (onSelectItem instanceof Function) {
                    onSelectItem(valueExtractor(item));
                  }
                  setShowModal(false);
                }}
              >
                {renderItem({ item, index })}
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    margin: 5,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 5,
  },
  mordal: {
    backgroundColor: colors.light1,
    flex: 1,
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    padding: 10,
    textAlign: "center",
    color: colors.primary,
  },

  listItem: {
    backgroundColor: colors.white,
    marginTop: 8,
  },
  itemDescription: {
    color: colors.medium,
  },
  itemTitle: {
    color: colors.black,
  },
});
