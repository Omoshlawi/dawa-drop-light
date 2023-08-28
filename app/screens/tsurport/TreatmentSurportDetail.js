import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { List, Text, useTheme, Portal, FAB } from "react-native-paper";
import { useUser } from "../../api";
import { NestedProvider } from "../../theme";
import { AlertDialog, Dialog } from "../../components/dialog";
import { CodeDisplayCopy } from "../../components/scanner";
import routes from "../../navigation/routes";

const TreatmentSurportDetail = ({ navigation, route }) => {
  const treatmentSurport = route.params;
  const { getUserId } = useUser();
  const userId = getUserId();
  const {
    patientCareReceiver,
    userCareGiver,
    careGiver: careGiver_,
    userCareReceiver,
    canPickUpDrugs,
    canOrderDrug,
  } = treatmentSurport;
  const [state, setState] = useState({ open: false });
  const careReceiver = patientCareReceiver[0];
  const careGiver = userCareGiver[0];
  const careReceiverUser = userCareReceiver[0];
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const { colors } = useTheme();
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    mode: "qr",
    message: "",
  });
  return (
    <View style={styles.screen}>
      <ScrollView>
        <Text style={styles.title} variant="titleMedium">
          Caregiver
        </Text>
        {careGiver ? (
          <>
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              title="Name"
              description={`${
                careGiver.firstName && careGiver.lastName
                  ? careGiver.firstName + " " + careGiver.lastName
                  : careGiver.username
              }`}
              left={(props) => <List.Icon {...props} icon="account" />}
            />
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              title="Email"
              description={careGiver.email}
              left={(props) => <List.Icon {...props} icon="email" />}
            />
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              title="Phone number"
              description={careGiver.phoneNumber}
              left={(props) => <List.Icon {...props} icon="phone" />}
            />
          </>
        ) : (
          <Text variant="headlineLarge">No caregiver</Text>
        )}
        <Text style={styles.title} variant="titleMedium">
          Care Receiver
        </Text>
        {careReceiver ? (
          <>
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              title="Name"
              description={`${
                careReceiverUser.firstName && careReceiverUser.lastName
                  ? careReceiverUser.firstName + " " + careReceiverUser.lastName
                  : careReceiverUser.username
              }`}
              left={(props) => <List.Icon {...props} icon="account" />}
            />
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              title="Email"
              description={careReceiverUser.email}
              left={(props) => <List.Icon {...props} icon="email" />}
            />
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              title="Phone number"
              description={careReceiverUser.phoneNumber}
              left={(props) => <List.Icon {...props} icon="phone" />}
            />
            <List.Item
              style={[styles.listItem, { backgroundColor: colors.surface }]}
              title="Patient cccNumber"
              description={careReceiver.cccNumber}
              left={(props) => <List.Icon {...props} icon="identifier" />}
            />
          </>
        ) : (
          <Text variant="headlineLarge">No care Receiver user</Text>
        )}

        <Text style={styles.title} variant="titleMedium">
          Permisions
        </Text>
        <List.Item
          style={[styles.listItem, { backgroundColor: colors.surface }]}
          title="Can order drug for Care receiver?"
          description={canOrderDrug ? "Yes" : "No"}
          left={(props) => <List.Icon {...props} icon="shield-check" />}
        />
        <List.Item
          style={[styles.listItem, { backgroundColor: colors.surface }]}
          title="Can pickup drugs and deliver to Care receiver?"
          description={canPickUpDrugs ? "Yes" : "No"}
          left={(props) => <List.Icon {...props} icon="shield-check" />}
        />
      </ScrollView>
      <Dialog
        visible={dialogInfo.show}
        onRequestClose={() => {
          setDialogInfo({ ...dialogInfo, show: false });
          if (dialogInfo.mode === "qr") {
            navigation.goBack();
          }
        }}
      >
        {dialogInfo.mode === "qr" && (
          <CodeDisplayCopy message={dialogInfo.message} />
        )}
        {(dialogInfo.mode === "success" || dialogInfo.mode === "error") && (
          <AlertDialog
            mode={dialogInfo.mode}
            message={dialogInfo.message}
            onButtonPress={() => {
              setDialogInfo({ ...dialogInfo, show: false });
              if (dialogInfo.mode === "success") {
                navigation.goBack();
              }
            }}
          />
        )}
      </Dialog>
    </View>
  );
};

export default TreatmentSurportDetail;

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 2,
  },
  title: {
    paddingHorizontal: 10,
  },
  screen: {
    flex: 1,
  },
});
