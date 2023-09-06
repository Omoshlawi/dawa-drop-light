import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import { List, useTheme } from "react-native-paper";

const MemberFeedBack = ({ event }) => {
  const { values } = useFormikContext();
  const { feedBacks, patientSubscribers } = event;
  const { colors, roundness } = useTheme();
  const feedBack = feedBacks.find(
    ({ user }) =>
      user ===
      patientSubscribers.find(({ _id }) => _id === values["member"])?.user
  );
  return (
    <View
      style={{
        margin: 10,
        padding: 10,
      }}
    >
      {!feedBack && <Text>No feedBack</Text>}
      {feedBack && (
        <>
          <List.Item
            title="Confirmed Attendance?"
            description={feedBack?.confirmedAttendance ? "Yes" : "No"}
            left={(props) => (
              <List.Icon
                {...props}
                icon={feedBack.confirmedAttendance ? "check" : "close"}
              />
            )}
          />
          <List.Item
            title="Requested delivery?"
            description={feedBack?.confirmedAttendance === false ? "Yes" : "No"}
            left={(props) => (
              <List.Icon
                {...props}
                icon={feedBack.confirmedAttendance === false ? "check" : "close"}
              />
            )}
          />
        </>
      )}

      {feedBack?.confirmedAttendance === false && (
        <Text>Requested Delivery</Text>
      )}
    </View>
  );
};

export default MemberFeedBack;

const styles = StyleSheet.create({});
