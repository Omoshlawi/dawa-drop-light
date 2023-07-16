import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconButton, useTheme } from "react-native-paper";
import { Modal } from "react-native";
import { getRandomColor } from "../../utils/helpers";
const ItemPicker = ({
  icon,
  data = [],
  valueExtractor,
  renderItem,
  placeHolder,
  title,
  labelExtractor,
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
}) => {
  const { colors, roundness } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const current = multiple
    ? data.filter((item) => value.includes(valueExtractor(item)))
    : data.find((item) => valueExtractor(item) === value);

  return (
    <>
      <View style={[styles.inputContainer, {}]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={25}
            color={colors.outline}
          />
        )}

        {multiple ? (
          <View style={styles.inputMultiple}>
            <FlatList
              horizontal
              data={current}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.disabled,
                    borderRadius: roundness,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginHorizontal: 3,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    if (onValueChange instanceof Function) {
                      let values = current.map((cur) => valueExtractor(cur));
                      if (values.includes(valueExtractor(item))) {
                        // remove
                        values = values.filter(
                          (v) => v !== valueExtractor(item)
                        );
                      }
                      onValueChange(values);
                    }
                  }}
                >
                  <View
                    style={{
                      backgroundColor: getRandomColor(),
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      marginHorizontal: 3,
                    }}
                  />
                  <Text key={index}>{labelExtractor(item)}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <Text
            style={[styles.input, current ? {} : { color: colors.disabled }]}
          >
            {current ? labelExtractor(current) : placeHolder}
          </Text>
        )}
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
                  if (onValueChange instanceof Function) {
                    if (multiple) {
                      let values = current.map((cur) => valueExtractor(cur));
                      if (values.includes(valueExtractor(item))) {
                        // remove
                        values = values.filter(
                          (v) => v !== valueExtractor(item)
                        );
                      } else {
                        // add
                        values.push(valueExtractor(item));
                      }
                      onValueChange(values);
                    } else onValueChange(valueExtractor(item));
                  }
                  setShowModal(multiple);
                }}
                style={[
                  itemContainerStyle,
                  multiple && current.includes(item)
                    ? {
                        backgroundColor: activeBackgroundColor
                          ? activeBackgroundColor
                          : colors.disabled,
                      }
                    : {
                        backgroundColor: inactiveBackgroundColor
                          ? inactiveBackgroundColor
                          : colors.background,
                      },
                ]}
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

export default ItemPicker;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    margin: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 5,
  },
  inputMultiple: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
  },
  mordal: {
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
  },

  listItem: {
    marginTop: 8,
  },
  itemDescription: {},
  itemTitle: {},
});
