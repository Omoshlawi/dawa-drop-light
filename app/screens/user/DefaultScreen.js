import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeArea } from "../../components/layout";
import Logo from "../../components/Logo";
import { Button } from "react-native-paper";

const DefaultScreen = ({ navigation }) => {
  return (
    <SafeArea style={styles.screen}>
      <Logo size={200} />
      <Button
        icon="chevron-left"
        style={styles.btn}
        onPress={() => {
          navigation.goBack();
        }}
        mode="contained"
      >
        Back
      </Button>
    </SafeArea>
  );
};

export default DefaultScreen;

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    fontSize: 20,
  },
});
