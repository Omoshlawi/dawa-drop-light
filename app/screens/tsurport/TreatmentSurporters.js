import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SearchHeader } from "../../components/input";
import { CodeScanner } from "../../components/scanner";
import { useProvidor } from "../../api";
import { FAB, useTheme } from "react-native-paper";
import routes from "../../navigation/routes";

const TreatmentSurporters = ({ navigation }) => {
  const [params, setParams] = useState({ search: "" });
  const {} = useProvidor();
  const { colors } = useTheme();
  return (
    <View style={styles.screen}>
      <CodeScanner
        label="Scan Patient QRCode"
        widthRation={0.1}
        onScaned={(search) => setParams({ ...params, search })}
      />
      <SearchHeader
        placeholder={"Enter patient id or CCC Number"}
        text={params.search}
        onTextChange={(search) => setParams({ ...params, search })}
      />
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.secondary }]}
        onPress={() =>
          navigation.navigate(routes.TREATMENT_SURPORT_NAVIGATION, {
            screen: routes.TREATMENT_SURPORT_PROVIDOR_FORM_SCREEN,
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
  },
});
