import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../../components/Logo";
import routes from "../../navigation/routes";

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.background}
      source={require("./../../assets/splash.png")}
      resizeMode="cover"
    >
      <View style={styles.col}>
        <View style={{ alignItems: "center" }}>
          <Logo size={300} />
        </View>
        <View style={{ width: "100%" }}>
          <Button
            title="Login"
            onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
          />
          <Button
            title="Register"
            onPress={() => navigation.navigate(routes.REGISTER_SCREEN)}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  col: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
  },
  slogan: {
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    // color: colors.white,
  },
});
