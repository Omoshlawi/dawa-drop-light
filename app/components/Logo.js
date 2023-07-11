import { Image, View, StyleSheet } from "react-native";
import React from "react";

const Logo = ({ variant, size = 100, backgroundColor }) => {
  return (
    <View style={{ backgroundColor }}>
      <Image
        style={{ width: size, height: size }}
        source={require("../assets/logo.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Logo;
