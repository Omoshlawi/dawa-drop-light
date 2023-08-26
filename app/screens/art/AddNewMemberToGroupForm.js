import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CodeScanner } from "../../components/scanner";
import { SearchHeader } from "../../components/input";
import { useART, useAuthorize, useUser } from "../../api";
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!code) return setUser(null);
    setLoading(true);
    const response = await getUsers({ _id: code });
    setLoading(false);
    if (response.ok) {
      setUser(response.data.results[0]);
    }
  };

  const handleSubmit = async () => {
    if (user) {
      const response = await addARTGroupMember(group._id, { paticipant: code });
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
      <SearchHeader text={code} onTextChange={setCode} onSearch={handleFetch} />
      {loading && <ActivityIndicator />}
      {!user && !loading && (
        <Text variant="headlineLarge" style={{ alignSelf: "center" }}>
          No Pticipant...
        </Text>
      )}
      {user && (
        <ScrollView>
          <Text style={styles.title} variant="titleMedium">
            User Info
          </Text>
          {console.log(user)}
          <List.Item
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            title="Name"
            description={`${
              user.firstName && user.lastName
                ? user.firstName + " " + user.lastName
                : user.username
            }`}
            left={(props) => <List.Icon {...props} icon="account" />}
          />
          <List.Item
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            title="Email"
            description={user.email}
            left={(props) => <List.Icon {...props} icon="email" />}
          />
          <List.Item
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            title="Phone number"
            description={user.phoneNumber}
            left={(props) => <List.Icon {...props} icon="phone" />}
          />
          <Button
            style={{ margin: 10 }}
            mode="contained"
            onPress={handleSubmit}
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
