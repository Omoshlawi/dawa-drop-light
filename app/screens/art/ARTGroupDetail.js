import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useART } from "../../api";
import { NestedProvider } from "../../theme";
import { FAB, Portal, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";
const ARTGroupDetail = ({ navigation, route }) => {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const { colors, roundness } = useTheme();
  return (
    <View style={styles.screen}>
      <NestedProvider>
        <Portal>
          <FAB.Group
            open={open}
            fabStyle={[styles.fab, { backgroundColor: colors.secondary }]}
            color={colors.surface}
            label={open ? "Close" : "Actions"}
            backdropColor={colors.backdrop}
            visible
            icon={open ? "close" : "dots-vertical"}
            actions={[
              {
                icon: "plus",
                label: "Add Group lead",
                color: true ? colors.secondary : colors.disabled,
                labelTextColor: true ? colors.secondary : colors.disabled,
                onPress: () => {
                  navigation.navigate(routes.TREATMENT_SURPORT_NAVIGATION, {
                    screen: routes.TREATMENT_SURPORT_ACCEPT_INVITE_SCREEN,
                  });
                },
              },
              {
                icon: "account-plus-outline",
                label: "Add care giver",
                onPress: () => {
                  navigation.navigate(routes.TREATMENT_SURPORT_NAVIGATION, {
                    screen: routes.TREATMENT_SURPORT_CAREGIVER_FORM_SCREEN,
                  });
                },
                color: colors.secondary,
              },
              {
                icon: "account-plus",
                label: "Add care receiver",
                color: true ? colors.secondary : colors.disabled,
                labelTextColor: true ? colors.secondary : colors.disabled,
                onPress: () => {
                  navigation.navigate(routes.TREATMENT_SURPORT_NAVIGATION, {
                    screen: routes.TREATMENT_SURPORT_CARERECEIVER_FORM_SCREEN,
                  });
                },
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </NestedProvider>
    </View>
  );
};

export default ARTGroupDetail;

const styles = StyleSheet.create({
  screen: {
    paddingTop: 5,
    flex: 1,
  },
  listItem: {
    marginBottom: 5,
  },
  title: {
    textTransform: "capitalize",
    padding: 10,
    fontWeight: "bold",
  },
  fab: {
    marginVertical: 3,
  },
});
