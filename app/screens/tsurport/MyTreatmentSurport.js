import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "../../api";
import routes from "../../navigation/routes";
import { Avatar, Card, useTheme, Portal, FAB } from "react-native-paper";
import { NestedProvider } from "../../theme";
import { useFocusEffect } from "@react-navigation/native";

const MyTreatmentSurport = ({ navigation }) => {
  const { getTreatmentSurport, getUserId } = useUser();
  const [asociations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors, roundness } = useTheme();
  const [state, setState] = useState({ open: false });
  const userId = getUserId();
  const onStateChange = ({ open }) => setState({ open });
  const handleFetch = async () => {
    setLoading(true);
    const response = await getTreatmentSurport();
    setLoading(false);
    if (response.ok) {
      setAssociations(response.data.results);
    }
  };
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    mode: "qr",
    message: "",
  });
  const { open } = state;

  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );

  const asociationsToSectionListData = (asociations = []) => {
    const careGivers = asociations.filter(
      ({ careGiver }) => careGiver !== userId
    );
    const careReceivers = asociations.filter(
      ({ careGiver }) => careGiver === userId
    );
    return [
      {
        title: "Care Givers",
        data: careGivers,
      },
      {
        title: "Care Receivers",
        data: careReceivers,
      },
    ];
  };

  return (
    <View style={styles.screen}>
      <NestedProvider>
        <SectionList
          sections={asociationsToSectionListData(asociations)}
          renderSectionHeader={({ section: { title, data } }) =>
            data.length ? <Text style={styles.title}>{title}</Text> : null
          }
          refreshing={loading}
          onRefresh={handleFetch}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => {
            const {
              patientCareReceiver,
              userCareGiver,
              careGiver: careGiver_,
            } = item;
            const careReceiver = patientCareReceiver[0];
            const careGiver = userCareGiver[0];
            const isCareGiver = careGiver_ === userId;
            const name = isCareGiver
              ? `${careGiver.phoneNumber} (${careGiver.email})`
              : `${careReceiver.firstName} ${careReceiver.lastName} (${careReceiver.cccNumber})`;
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routes.ORDERS_NAVIGATION, {
                    screen: routes.ORDERS_ORDER_DETAIL_SCREEN,
                    params: { modes, timeSlots, methods, order: item },
                  })
                }
              >
                <Card.Title
                  title={name}
                  style={[styles.listItem, { backgroundColor: colors.surface }]}
                  left={(props) => <Avatar.Icon {...props} icon="connection" />}
                  right={(props) => (
                    <Avatar.Icon
                      {...props}
                      icon="chevron-right"
                      color={colors.primary}
                      style={{ backgroundColor: colors.surface }}
                    />
                  )}
                  subtitle={careReceiver._id}
                  subtitleStyle={{ color: colors.disabled }}
                />
              </TouchableOpacity>
            );
          }}
        />
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

export default MyTreatmentSurport;

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
