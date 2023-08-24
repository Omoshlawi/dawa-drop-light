import { StyleSheet, Text, View } from "react-native";
import React from "react";

const GroupLeadDetail = ({ navigation, route }) => {
  const { artGroupLead, artModels, users } = route.params;
  return (
    <View>
      <Text>GroupLeadDetail</Text>
    </View>
  );
};

export default GroupLeadDetail;

const styles = StyleSheet.create({});
