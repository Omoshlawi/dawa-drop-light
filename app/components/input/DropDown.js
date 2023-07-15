import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { getRandomColor } from "../../utils/helpers";
import { screenWidth } from "../../utils/contants";
import { useTheme } from "react-native-paper";
/**
 
 * *SchemaMaper takes item and retuns data that repect item schema as in docs
 * {
 *  label: 'label', // required
 *  value: 'value', // required
 *  icon: 'icon',
 *  parent: 'parent',
 *  selectable: 'selectable',
 *  disabled: 'disabled',
 *  testID: 'testID',
 *  containerStyle: 'containerStyle',
 *  labelStyle: 'labelStyle'
 * *}
 */

const DropDown = ({
  defaultValue,
  placeholder,
  schemaMapper,
  onChangeValue,
  multiple,
  items = [],
  searchPlacholder,
}) => {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [options, setOptions] = useState(
    items.map((item) => schemaMapper(item))
  );
  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={options}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setOptions}
        placeholder={placeholder}
        theme="LIGHT"
        onChangeValue={onChangeValue}
        multiple={multiple}
        mode="BADGE"
        badgeDotColors={options.map((options) => getRandomColor())}
        searchable
        style={{
          backgroundColor: colors.background,
          borderColor: colors.outline,
        }}
        containerStyle={{ backgroundColor: "red" }}
        listItemContainerStyle={{ backgroundColor: colors.surface }}
        searchContainerStyle={{ backgroundColor: colors.background }}
        searchPlaceholder={searchPlacholder}
        listItemLabelStyle={{ color: colors.primary }}
        itemSeparator
        stickyHeader
        autoScroll
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginVertical: 10,
  },
});
