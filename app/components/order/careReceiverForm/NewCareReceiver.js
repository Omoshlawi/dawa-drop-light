import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";

const NewCareReceiver = () => {
  const [formState, setFormState] = useState({
    cccNumber: "",
    firstName: "",
    upiNumber: "",
  });

  const handleVerify = async ({ onPostVeryfy }) => {};
  return (
    <View>
      <TextInput
        placeholder="Enter Patient ccc Number"
        label="Patient ccc Number"
        left={<TextInput.Icon icon="identifier" />}
        mode="outlined"
        onChangeText={(cccNumber) => setFormState({ ...formState, cccNumber })}
      />
      <TextInput
        placeholder="Enter patient first name"
        label="Fist name"
        left={<TextInput.Icon icon="account" />}
        mode="outlined"
        onChangeText={(firstName) => setFormState({ ...formState, firstName })}
      />
      <TextInput
        placeholder="Enter patient UPI no"
        label="Patient UPI Number(Optional)"
        left={<TextInput.Icon icon="identifier" />}
        mode="outlined"
        onChangeText={(upiNumber) => setFormState({ ...formState, upiNumber })}
      />
      <Button>Verify</Button>
    </View>
  );
};

export default NewCareReceiver;

const styles = StyleSheet.create({});
