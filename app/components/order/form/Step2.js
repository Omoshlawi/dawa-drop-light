import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { Button, List, Text, useTheme } from "react-native-paper";
import { screenWidth } from "../../../utils/contants";
import moment from "moment/moment";
import { FormField, FormItemPicker, FormLocationPicker } from "../../forms";

const Step2 = ({ onNext, onPrevious, modes }) => {
  const { colors, roundness } = useTheme();
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.img}
          source={require("../../../assets/dev.png")}
          resizeMode="contain"
        />
      </View>
      <Text variant="headlineLarge">STEP 2: Order Information</Text>
      <View style={styles.form}>
        <FormField
          name="phoneNumber"
          placeholder="Enter Phon enumber"
          label="Phone number"
          icon="phone"
        />
        <FormItemPicker
          name="deliveryMode"
          icon="truck-delivery"
          searchable
          label="Delivery mode"
          data={modes}
          valueExtractor={({ _id }) => _id}
          labelExtractor={({ name }) => name}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              style={styles.listItem}
              left={(props) => <List.Icon {...props} icon="truck-delivery" />}
            />
          )}
          itemContainerStyle={[
            styles.itemContainer,
            { borderRadius: roundness },
          ]}
        />
        <FormLocationPicker name="deliveryAddress" />
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

export default Step2;

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
