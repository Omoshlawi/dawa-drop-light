import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";

const MemberFeedBack = ({ event }) => {
  const { values } = useFormikContext();
  const { feedBacks, patientSubscribers } = event;

  const feedBack = feedBacks.find(
    ({ user }) =>
      user ===
      patientSubscribers.find(({ _id }) => _id === values["member"])?.user
  );
  if (!feedBack) return false;
  return (
    <View>
      <Text>MemberFeedBack</Text>
    </View>
  );
};

export default MemberFeedBack;

const styles = StyleSheet.create({});
