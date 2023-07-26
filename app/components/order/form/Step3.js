import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button, List, Text, useTheme } from "react-native-paper";
import { screenWidth } from "../../../utils/contants";
import moment from "moment/moment";
import { FormField, FormItemPicker, FormLocationPicker } from "../../forms";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RadioButton } from "../../input";

const Step3 = ({ onPrevious, onNext }) => {
  const { colors, roundness } = useTheme();
  const [currierInfo, setCurrierInfo] = useState({
    options: [
      "Through Community ART",
      "Through Treatment surport budding",
      "Through Currier Service",
    ],
    current: null,
  });
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={require("../../../assets/dev-red.png")}
          resizeMode="contain"
        />
      </View>
      <Text variant="headlineLarge">Almost there: Courrier info</Text>
      <View style={styles.form}>
        <RadioButton
          label="How do you want drugs delivered? "
          data={currierInfo.options}
          labelExtractor={(val) => val}
          valueExtractor={(val) => val}
          value={currierInfo.current}
          onValueChange={(current) =>
            setCurrierInfo({ ...currierInfo, current })
          }
        />
        <Button mode="contained" onPress={onPrevious} style={styles.btn}>
          Previous
        </Button>
        <Button mode="contained" onPress={onNext} style={styles.btn}>
          Next
        </Button>
      </View>
    </View>
  );
};

export default Step3;

const styles = StyleSheet.create({
  img: {
    height: screenWidth * 0.5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  form: {
    width: "100%",
    padding: 10,
    flex: 1,
  },
  itemContainer: {
    margin: 5,
  },
  listItem: {
    padding: 10,
  },
  btn: {
    marginTop: 10,
  },
});