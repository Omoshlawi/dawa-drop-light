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
      ({ careGiver, careReceiver }) =>
        careGiver && careReceiver && careGiver !== userId
    );
    const careReceivers = asociations.filter(
      ({ careGiver, careReceiver }) =>
        careGiver && careReceiver && careGiver === userId
    );
    const pendingCaregiverInvites = asociations.filter(
      ({ careGiver, careReceiver }) => careReceiver && !careGiver
    );
    const pendingCareReceiverInvites = asociations.filter(
      ({ careGiver, careReceiver }) => !careReceiver && careGiver
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
      {
        title: "Pending caregiver Invites",
        data: pendingCaregiverInvites,
      },
      {
        title: "Pending care receiver Invites",
        data: pendingCareReceiverInvites,
      },
    ];
  };

  return (
    <View style={styles.screen}>
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
            careReceiver: careReceiver_,
            userCareReceiver,
            _id,
          } = item;
          const careReceiver = patientCareReceiver[0];
          const careGiver = userCareGiver[0];
          const careReceiverUser = userCareReceiver[0];
          const isCareGiver = careGiver_ !== userId;
          const name = isCareGiver
            ? `${
                careGiver.firstName && careGiver.lastName
                  ? `${careGiver.firstName} ${careGiver.lastName}`
                  : `${careGiver.username}`
              }`
            : `${careReceiver.firstName} ${careReceiver.lastName}`;
          const description = isCareGiver
            ? `${careGiver.phoneNumber} | ${careGiver.email}`
            : `${careReceiver.cccNumber}`;
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.TREATMENT_SURPORT_NAVIGATION, {
                  screen: routes.TREATMENT_SURPORT_DETAIL_SCREEN,
                  params: item,
                })
              }
            >
              <Card.Title
                title={name ? name : "Invitation code"}
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
                subtitle={description ? description : _id}
                subtitleStyle={{ color: colors.disabled }}
              />
            </TouchableOpacity>
          );
        }}
      />
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
