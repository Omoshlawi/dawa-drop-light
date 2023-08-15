import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconButton, useTheme, Text } from "react-native-paper";
import { Modal } from "react-native";
import { getRandomColor } from "../../utils/helpers";
import _ from "lodash";
import SearchHeader from "./SearchHeader";

const RemoteItemPicker = ({
  icon,
  valueExtractor, //required
  renderItem,
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
  remoteConfig = {
    get: undefined,
    paramKey: "q",
    responseResultsExtractor: (response) => response.results,
    isRequestSuccessfull: (response) => response.ok,
  },
}) => {
  const { colors, roundness } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState();
  const current = multiple
    ? data.filter((item) => value.includes(valueExtractor(item)))
    : data.find((item) => valueExtractor(item) === value);
  useEffect(() => {
    handleFetch();
  }, [params]);
  const handleFetch = async () => {
    console.log(params);
    if (
      remoteConfig.get instanceof Function &&
      remoteConfig.paramKey &&
      remoteConfig.resultExtractor instanceof Function &&
      remoteConfig.isRequestSuccessfull instanceof Function
    ) {
      const response = await remoteConfig.get({
        [remoteConfig.paramKey]: params,
      });
      if (remoteConfig.isRequestSuccessfull(response)) {
        setData(remoteConfig.responseResultsExtractor(response));
      }
    }
  };
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
      <TouchableOpacity
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
        onPress={() => setShowModal(true)}
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
              <Text variant="labelLarge" style={styles.input}>
                {label}
              </Text>
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
        <MaterialCommunityIcons name="chevron-down" size={30} />
      </TouchableOpacity>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.mordal}>
          <View style={styles.header}>
            <IconButton
              style={styles.close}
              icon="close"
              onPress={() => setShowModal(false)}
              iconColor={colors.error}
              // mode="outlined"
            />
            <Text style={[styles.title, titleStyle]} variant="titleLarge">
              {title}
            </Text>
          </View>
          {searchable && (
            <SearchHeader
              onTextChange={(q) => {
                setParams(q);
              }}
              text={params}
              backgroundColor={colors.background}
            />
          )}
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
                {renderItem({
                  item,
                  index,
                  selected: multiple && current.includes(item),
                })}
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default RemoteItemPicker;

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
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 5,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 15,
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
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 10,
  },
});
