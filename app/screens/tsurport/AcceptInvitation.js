import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CodeScanner } from "../../components/scanner";
import { SearchHeader } from "../../components/input";
import { useUser } from "../../api";
import {
  ActivityIndicator,
  Button,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import { AlertDialog, Dialog } from "../../components/dialog";

const AcceptInvitation = ({ navigation }) => {
  const [code, setCode] = useState("");
  const { getTreatmentSurportDetail, acceptTreatmentSurportInvite } = useUser();
  const [association, setAsociation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!code) return setAsociation(null);
    setLoading(true);
    const response = await getTreatmentSurportDetail(code);
    setLoading(false);
    if (response.ok) {
      setAsociation(response.data);
    }
  };

  const handleAcceptInvitation = async () => {
    if (association) {
      const response = await acceptTreatmentSurportInvite(association._id);
      if (response.ok) {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          mode: "success",
          message: "Asociation accepted successfully",
        });
      } else {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          mode: "error",
          message: response.data.detail,
        });
      }
    }
  };
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    mode: "form",
    message: "",
  });
  const { colors, roundness } = useTheme();
  useEffect(() => {
    handleFetch();
  }, [code]);
  return (
    <View style={styles.screen}>
      <CodeScanner label="Scan Invitation code" onScaned={setCode} />
      <SearchHeader text={code} onTextChange={setCode} onSearch={handleFetch} />
      {loading && <ActivityIndicator />}
      {!association && !loading && (
        <Text variant="headlineLarge" style={{ alignSelf: "center" }}>
          No Invitation...
        </Text>
      )}
      {association && (
        <ScrollView>
          {association.userCareGiver?.length > 0 && (
            <>
              <Text style={styles.title} variant="titleMedium">
                Caregiver
              </Text>
              <List.Item
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title="Name"
                description={`${
                  association.userCareGiver[0].firstName &&
                  association.userCareGiver[0].lastName
                    ? association.userCareGiver[0].firstName +
                      " " +
                      association.userCareGiver[0].lastName
                    : association.userCareGiver[0].username
                }`}
                left={(props) => <List.Icon {...props} icon="account" />}
              />
              <List.Item
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title="Email"
                description={association.userCareGiver[0].email}
                left={(props) => <List.Icon {...props} icon="email" />}
              />
              <List.Item
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title="Phone number"
                description={association.userCareGiver[0].phoneNumber}
                left={(props) => <List.Icon {...props} icon="phone" />}
              />
            </>
          )}

          {association.userCareReceiver?.length > 0 && (
            <>
              <Text style={styles.title} variant="titleMedium">
                Care Receiver
              </Text>
              <List.Item
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title="Name"
                description={`${
                  association.userCareReceiver[0].firstName &&
                  association.userCareReceiver[0].lastName
                    ? association.userCareReceiver[0].firstName +
                      " " +
                      association.userCareReceiver[0].lastName
                    : association.userCareReceiver[0].username
                }`}
                left={(props) => <List.Icon {...props} icon="account" />}
              />
              <List.Item
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title="Email"
                description={association.userCareReceiver[0].email}
                left={(props) => <List.Icon {...props} icon="email" />}
              />
              <List.Item
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title="Phone number"
                description={association.userCareReceiver[0].phoneNumber}
                left={(props) => <List.Icon {...props} icon="phone" />}
              />
            </>
          )}

          <Text style={styles.title} variant="titleMedium">
            Permisions
          </Text>
          <List.Item
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            title="Can order drug for Care receiver?"
            description={association.canOrderDrug ? "Yes" : "No"}
            left={(props) => <List.Icon {...props} icon="shield-check" />}
          />
          <List.Item
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            title="Can pickup drugs and deliver to Care receiver?"
            description={association.canPickUpDrugs ? "Yes" : "No"}
            left={(props) => <List.Icon {...props} icon="shield-check" />}
          />
          {!(association.careGiver && association.careReceiver) && (
            <Button
              style={{ margin: 10 }}
              mode="contained"
              onPress={handleAcceptInvitation}
            >
              Accept invitation
            </Button>
          )}
        </ScrollView>
      )}
      <Dialog
        visible={dialogInfo.show}
        swipable
        onRequestClose={() => setDialogInfo({ ...dialogInfo, show: false })}
      >
        {(dialogInfo.mode === "success" || dialogInfo.mode === "error") && (
          <AlertDialog
            mode={dialogInfo.mode}
            message={dialogInfo.message}
            onButtonPress={() => {
              setDialogInfo({ ...dialogInfo, show: false });
              navigation.goBack();
            }}
          />
        )}
      </Dialog>
    </View>
  );
};

export default AcceptInvitation;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listItem: {
    marginVertical: 2,
  },
  title: {
    paddingHorizontal: 10,
  },
});
