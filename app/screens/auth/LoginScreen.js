import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../../components/Logo";
import { Input } from "@rneui/themed";

const LoginScreen = () => {
  return (
    <View style={styles.screen}>
      <Logo size={200} />
      <View style={styles.form}>
        <Input placeholder="Enter username" label="Username" />
        <Input placeholder="Enter password" label="Password" />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    flex: 1,
  },
  form: {
    flex: 1,
    width: "100%",
  },
});
