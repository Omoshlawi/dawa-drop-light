import { StyleSheet, View, Image } from "react-native";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Button,
  List,
  Text,
  useTheme,
} from "react-native-paper";
import { screenHeight } from "../../../utils/contants";
import { useFormikContext } from "formik";
import moment from "moment/moment";
import { usePatient } from "../../../api";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import routes from "../../../navigation/routes";
/**
 * Look for eligibility
 * @returns
 */
const Step2 = ({ onNext, onPrevious, onDialogInfoChange }) => {
  const { values } = useFormikContext();
  const { colors, roundness } = useTheme();
  const { checkCareReceiverEligibility } = usePatient();
  const [appointment, setAppointment] = useState();
  const [regimen, setRegimen] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleCheckEligible = async () => {
    setLoading(true);
    const response = await checkCareReceiverEligibility({
      careReceiver: values["careReceiver"],
    });
    setLoading(false);
    if (response.ok) {
      setAppointment(response.data.appointment);
      setRegimen(response.data.currentRegimen);
    } else {
      onDialogInfoChange((dialogInfo) => ({
        ...dialogInfo,
        show: true,
        mode: "error",
        message: response.data.detail
          ? response.data.detail
          : "Unknow Error Occured",
        onDismiss: () => {
          navigation.navigate(routes.ORDERS_NAVIGATION, {
            screen: routes.ORDERS_ORDER_FOR_ANOTHER_SCREEN,
          });
        },
      }));
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleCheckEligible();
    }, [])
  );

  return (
    <View style={styles.screen}>
      <View style={styles.img}>
        <Image
          style={styles.img}
          source={require("./../../../assets/confirmation.png")}
          resizeMode="contain"
        />
      </View>
      <Text style={{ textAlign: "center" }} variant="headlineSmall">
        Step 2: Medication Details
      </Text>
      <View style={styles.content}>
        {loading && (
          <View style={{ alignItems: "center" }}>
            <ActivityIndicator size={50} />
            <Text>Checking Eligibility...</Text>
          </View>
        )}
        {appointment && regimen && (
          <>
            <View style={styles.dataContainer}>
              <List.Item
                style={[
                  styles.listItem,
                  { backgroundColor: colors.surface, borderRadius: roundness },
                ]}
                title="Patient name"
                description={`${regimen.firstname} ${regimen.middlename} ${regimen.lastname}`}
                descriptionStyle={{ color: colors.disabled }}
                left={(props) => <List.Icon {...props} icon="account" />}
              />
              <List.Item
                style={[
                  styles.listItem,
                  { backgroundColor: colors.surface, borderRadius: roundness },
                ]}
                title="Patient CCC Number"
                description={regimen.ccc_no}
                descriptionStyle={{ color: colors.disabled }}
                left={(props) => <List.Icon {...props} icon="identifier" />}
              />
              <List.Item
                style={[
                  styles.listItem,
                  { backgroundColor: colors.surface, borderRadius: roundness },
                ]}
                title="Current Regimen"
                description={regimen.regimen}
                descriptionStyle={{ color: colors.disabled }}
                left={(props) => <List.Icon {...props} icon="pill" />}
              />
              <List.Item
                style={[
                  styles.listItem,
                  { backgroundColor: colors.surface, borderRadius: roundness },
                ]}
                title={`${appointment.appointment_type} Appointment`}
                description={moment(
                  appointment.appointment.split("-").reverse().join("-")
                ).format("Do dddd MMMM yyy")}
                descriptionStyle={{ color: colors.disabled }}
                left={(props) => <List.Icon {...props} icon="calendar-clock" />}
              />
            </View>
            <Button onPress={onPrevious} mode="contained" style={styles.navBtn}>
              Previous
            </Button>
            <Button onPress={onNext} mode="contained" style={styles.navBtn}>
              Next
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  navBtn: {
    marginVertical: 5,
  },
  content: {
    padding: 10,
  },
  img: {
    width: "100%",
    height: screenHeight * 0.2,
  },
  listItem: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
  },
  dataContainer: {
    padding: 10,
  },
});
