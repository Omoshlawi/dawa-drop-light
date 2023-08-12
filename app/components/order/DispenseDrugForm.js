import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { screenWidth } from "../../utils/contants";
import { DateTimePicker } from "../input";
import { Button } from "react-native-paper";
import moment from "moment/moment";
import { useProvidor } from "../../api";

const DispenseDrugForm = ({ onSubmit, order }) => {
  const { dispenseDrug } = useProvidor();
  const [formState, setFormState] = useState({
    nextAppointmentDate: new Date(),
    order: order._id,
  });

  const handleSubmit = async () => {
    const response = await dispenseDrug(formState);
    let submitResult = {};
    if (response.ok) {
      submitResult = {
        mode: "success",
        show: true,
        message: `Drug for order ${order._id} dispensed successfull!`,
      };
    } else {
      submitResult = {
        mode: "error",
        show: true,
        message: response.data.detail,
      };
    }
    if (typeof onSubmit === "function") {
      onSubmit(submitResult);
    }
  };
  return (
    <View style={styles.dialog}>
      <DateTimePicker
        formarter={(date) => moment(date).format("dddd Do MMMM yyyy")}
        defaultMode="date"
        label="Next Refill Date"
        value={new Date(formState.nextAppointmentDate)}
        icon="calendar"
        onChangeValue={(date) =>
          setFormState({
            ...formState,
            nextAppointmentDate: new Date(date).toISOString(),
          })
        }
      />

      <Button style={styles.btn} mode="contained" onPress={handleSubmit}>
        Dispense
      </Button>
    </View>
  );
};

export default DispenseDrugForm;

const styles = StyleSheet.create({
  dialog: {
    width: screenWidth * 0.8,
  },
  btn: {
    marginTop: 20,
  },
});
