import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SearchHeader } from "../../components/input";
import { CodeScanner } from "../../components/scanner";
import { useProvidor } from "../../api";
import {
  ActivityIndicator,
  FAB,
  useTheme,
  Text,
  List,
} from "react-native-paper";
import routes from "../../navigation/routes";
import { useFocusEffect } from "@react-navigation/native";

const TreatmentSurporters = ({ navigation }) => {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [treatmentSurports, setTreatmentSurports] = useState([]);
  const { searchTreatmentSurporter } = useProvidor();
  const { colors } = useTheme();

  const handlSearch = async () => {
    setLoading(true);
    const response = await searchTreatmentSurporter(q);
    setLoading(false);
    if (response.ok) {
      setTreatmentSurports(response.data.results);
    } else {
      console.log(response.data);
    }
  };

  useEffect(() => {
    handlSearch();
  }, [q]);

  useFocusEffect(
    useCallback(() => {
      setQ("");
    }, [])
  );
  return (
    <View style={styles.screen}>
      <CodeScanner
        label="Scan Patient QRCode"
        widthRation={0.1}
        onScaned={setQ}
      />
      <SearchHeader
        placeholder={"Enter patient id or CCC Number"}
        text={q}
        onTextChange={setQ}
      />
      <View style={styles.results}>
        {loading && <ActivityIndicator />}
        {!loading && treatmentSurports.length === 0 && (
          <Text variant="headlineLarge" style={{ textAlign: "center" }}>
            No Treatment Surporters
          </Text>
        )}
        <FlatList
          data={treatmentSurports}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item }) => {
            const {
              careGiver: careGiver_,
              patientCareReceiver,
              userCareGiver,
            } = item;
            const careReceiver = patientCareReceiver[0];
            const careGiver = userCareGiver[0];
            return (
              <List.Item
                onPress={() => {
                  navigation.navigate(routes.TREATMENT_SURPORT_NAVIGATION, {
                    screen: routes.TREATMENT_SURPORT_PROVIDOR_FORM_SCREEN,
                    params: { treatmentSurport: item },
                  });
                }}
                style={{ backgroundColor: colors.surface, marginVertical: 2 }}
                title={`${careGiver.phoneNumber} (${careGiver.email})`}
                description={`${careReceiver.firstName} ${careReceiver.lastName} (${careReceiver.cccNumber})`}
                left={(props) => <List.Icon {...props} icon="account" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
              />
            );
          }}
        />
      </View>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.secondary }]}
        onPress={() =>
          navigation.navigate(routes.TREATMENT_SURPORT_NAVIGATION, {
            screen: routes.TREATMENT_SURPORT_PROVIDOR_FORM_SCREEN,
            params: {},
          })
        }
        color={colors.surface}
      />
    </View>
  );
};

export default TreatmentSurporters;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  screen: {
    flex: 1,
    alignItems: "center",
  },
  results: {
    width: "100%",
  },
});
