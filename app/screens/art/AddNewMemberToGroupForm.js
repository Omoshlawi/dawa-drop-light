import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CodeScanner } from "../../components/scanner";
import { SearchHeader } from "../../components/input";
import { useART, useAuthorize, useProvidor, useUser } from "../../api";
import {
  ActivityIndicator,
  Button,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import { AlertDialog, Dialog } from "../../components/dialog";
import routes from "../../navigation/routes";

const AddNewMemberToGroupForm = ({ navigation, route }) => {
  const group = route.params;
  const [code, setCode] = useState("");
  const { getTreatmentSurportDetail, addARTGroupMember } = useART();
  const { getUsers } = useAuthorize();
  const { getPatients } = useProvidor();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!code) return setPatient(null);
    setLoading(true);
    const response = await getPatients({ search: code });
    setLoading(false);
    if (response.ok) {
      setPatient(response.data.results[0]);
    }
  };

  const handleSubmit = async () => {
    if (patient) {
      const response = await addARTGroupMember(group._id, {
        paticipant: patient._id,
      });
      if (response.ok) {
        setDialogInfo({
          ...dialogInfo,
          show: true,
          mode: "success",
          message: "User added to group successfully",
        });
      } else {
        if (response.status === 400)
          setDialogInfo({
            ...dialogInfo,
            show: true,
            mode: "error",
            message: response.data.errors["paticipant"],
          });
        else
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
      <CodeScanner label="Scan Paticipant to search" onScaned={setCode} />
      <SearchHeader
        text={code}
        onTextChange={setCode}
        onSearch={handleFetch}
        placeholder={"Enter ccc number, national id, phone number"}
      />
      {loading && <ActivityIndicator />}
      {!patient && !loading && (
        <Text variant="headlineLarge" style={{ alignSelf: "center" }}>
          No Pticipant...
        </Text>
      )}
      {patient && (
        <ScrollView>
          {patient.user.length > 0 && (
            <>
              <Text style={styles.title} variant="titleMedium">
                User Info
              </Text>
              <List.Item
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title="Name"
                description={`${
                  patient.user[0].firstName && patient.user[0].lastName
                    ? patient.user[0].firstName + " " + patient.user[0].lastName
                    : patient.user[0].username
                }`}
                left={(props) => <List.Icon {...props} icon="account" />}
              />
              <List.Item
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title="Email"
                description={patient.user[0].email}
                left={(props) => <List.Icon {...props} icon="email" />}
              />
              <List.Item
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                title="Phone number"
                description={patient.user[0].phoneNumber}
                left={(props) => <List.Icon {...props} icon="phone" />}
              />
            </>
          )}
          <Text style={styles.title} variant="titleMedium">
            Patient Info
          </Text>
          <List.Item
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            title="Name"
            description={`${patient.firstName} ${patient.lastName}`}
            left={(props) => <List.Icon {...props} icon="account" />}
          />
          <List.Item
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            title="CCC Number"
            description={patient.cccNumber}
            left={(props) => <List.Icon {...props} icon="identifier" />}
          />
          <List.Item
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            title="Phone number"
            description={patient.phoneNumber}
            left={(props) => <List.Icon {...props} icon="phone" />}
          />
          <List.Item
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            title="ART Distribution Model"
            description={patient.artModel.name}
            left={(props) => <List.Icon {...props} icon="box" />}
          />
          <Button
            style={{ margin: 10 }}
            mode="contained"
            onPress={handleSubmit}
            disabled={
              ![
                "community_art_peer",
                "community_art_hcw",
                "facility_art_peer",
                "facility_art_hcw",
              ].includes(patient.artModel.modelCode)
            }
          >
            Add to group
          </Button>
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
              if (dialogInfo.mode === "success")
                navigation.navigate(routes.ART_NAVIGATION, {
                  screen: routes.ART_GROUP_SCREEN,
                });
              else navigation.goBack();
            }}
          />
        )}
      </Dialog>
    </View>
  );
};

export default AddNewMemberToGroupForm;

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
