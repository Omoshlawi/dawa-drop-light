import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Button, List, Text, useTheme } from "react-native-paper";
import { screenWidth } from "../../../utils/contants";
import moment from "moment/moment";
import { FormField, FormItemPicker, FormLocationPicker } from "../../forms";

const Step3 = ({ onPrevious, onNext }) => {
  const { colors, roundness } = useTheme();
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={require("../../../assets/dev-red.png")}
          resizeMode="contain"
        />
      </View>
      <Text variant="headlineLarge">Almost there: Curiour info</Text>
      <View style={styles.form}>
        <View
          style={[
            styles.choiceContainer,
            { backgroundColor: colors.surface, borderRadius: roundness },
          ]}
        >
          <Text>How do you want drugs delivered ? </Text>
          <View style={styles.choiceContainer}>
            <View
              style={[
                styles.response,
                { backgroundColor: colors.disabled, borderRadius: roundness },
              ]}
            >
              <Text variant="titleLarge">Choice One</Text>
            </View>
            <View
              style={[
                styles.response,
                { backgroundColor: colors.disabled, borderRadius: roundness },
              ]}
            >
              <Text variant="titleLarge">Choice Two</Text>
            </View>
          </View>
        </View>
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
  choiceContainer: {
    padding: 10,
  },
  responsesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  response: {
    padding: 10,
    margin: 10,
  },
});
