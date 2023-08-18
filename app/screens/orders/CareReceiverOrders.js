import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FAB, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";

const CareReceiverOrders = ({ navigation }) => {
  const { colors, roundness } = useTheme();
  return (
    <View style={styles.screen}>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.secondary }]}
        color={colors.surface}
        label="New Order"
        onPress={() => {
          navigation.navigate(routes.ORDERS_NAVIGATION, {
            screen: routes.ORDERS_ORDER_FOR_ANOTHER_FORM_SCREEN,
          });
        }}
      />
    </View>
  );
};

export default CareReceiverOrders;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
