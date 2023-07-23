import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Button, List, Text, useTheme } from "react-native-paper";
import { screenWidth } from "../../../utils/contants";
import moment from "moment/moment";

const Step1 = ({ onNext, appointment, regimen }) => {
  const { colors, roundness } = useTheme();
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={require("../../../assets/fast-dev.png")}
          resizeMode="contain"
        />
      </View>
      <Text variant="headlineLarge">Step 1</Text>
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

        <Button mode="contained" style={{ marginTop: 10 }} onPress={onNext}>
          PROCEED TO NEXT STEP
        </Button>
      </View>
    </View>
  );
};

export default Step1;

const styles = StyleSheet.create({
  img: {
    height: screenWidth * 0.5,
  },
  container: {
    flex: 1,
    alignItems: "center",
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
