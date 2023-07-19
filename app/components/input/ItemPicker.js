import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconButton, useTheme, Text } from "react-native-paper";
import { Modal } from "react-native";
import { getRandomColor } from "../../utils/helpers";
import _ from "lodash";
const ItemPicker = ({
  icon,
  data = [],
  valueExtractor,//required
  renderItem,
  placeHolder,
  title,
  labelExtractor,//required
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
}) => {
  const { colors, roundness } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const current = multiple
    ? data.filter((item) => value.includes(valueExtractor(item)))
    : data.find((item) => valueExtractor(item) === value);

  return (
    <View style={styles.container}>
      {outline && label && !_.isEmpty(current) && (
        <Text
          variant="labelSmall"
          style={[
            styles.label,
            {
              backgroundColor: colors.background,
              color: colors.onSurfaceVariant,
            },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          outline
            ? {
                borderWidth: 1,
                borderColor: colors.outline,
                borderRadius: roundness,
              }
            : {},
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={25}
            color={colors.outline}
          />
        )}

        {multiple ? (
          <View style={styles.inputMultiple}>
            {_.isEmpty(current) ? (
              <Text style={styles.input}>{label}</Text>
            ) : (
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
            )}
          </View>
        ) : (
          <Text style={[styles.input]}>
            {current ? labelExtractor(current) : label}
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
                    } else {
                      const value = valueExtractor(item);
                      onValueChange(value);
                    }
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
    </View>
  );
};

export default ItemPicker;

const styles = StyleSheet.create({
  container: { marginTop: 5 },
  label: {
    position: "absolute",
    top: 0,
    left: 10,
    zIndex: 1,
    verticalAlign: "middle",
    paddingHorizontal: 5,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    marginTop: 5,
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
