import { StyleSheet, Text, View } from "react-native";
import React from "react";
import _ from "lodash";
import { useSettinsContext } from "../../context/hooks";
const PinIndicators = ({
  pin,
  digits = 4,
  activeColor,
  errorColor,
  inactiveColor,
  error,
}) => {
  const d = _.range(0, parseInt(digits));
  return (
    <View style={styles.container}>
      {d.map((_d, index) => {
        return (
          <View
            style={[
              styles.indicator,
              {
                backgroundColor: error
                  ? errorColor
                  : `${pin}`.length <= index
                  ? inactiveColor
                  : activeColor,
              },
            ]}
            key={index}
          />
        );
      })}
    </View>
  );
};

export default PinIndicators;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
  },
  indicator: {
    width: 20,
    height: 20,
    margin: 2,
    borderRadius: 5,
  },
});
