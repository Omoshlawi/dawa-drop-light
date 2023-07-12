import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../../components/Logo";
import routes from "../../navigation/routes";
import { Button } from "react-native-paper";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={{ flex: 1 }} />
      <View style={{ alignItems: "center" }}>
        <Logo size={300} />
      </View>
      <View style={{ flex: 2 }} />

      <View style={styles.btnContainer}>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate(routes.AUTH_LOGIN_SCREEN)}
        >
          Login
        </Button>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate(routes.AUTH_REGISTER_SCREEN)}
        >
          Register
        </Button>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  btnContainer: {
    padding: 10,
    width: "100%",
  },
  btn: {
    margin: 10,
  },
});
