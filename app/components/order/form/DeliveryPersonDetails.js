import { StyleSheet, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { useFormikContext } from "formik";

const DeliveryPersonDetails = ({ name }) => {
  const { setFieldValue, errors, values, touched } = useFormikContext();
  const formState = values[name] || {
    fullName: "",
    nationalId: "",
    phoneNumber: "",
  };
  return (
    <View>
      <TextInput
        placeholder="Enter Full name"
        label="Name"
        left={<TextInput.Icon icon="account" />}
        mode="outlined"
        value={formState.fullName}
        onChangeText={(fullName) => {
          setFieldValue(name, { ...formState, fullName });
        }}
      />
      <TextInput
        placeholder="Enter National Id"
        label="National id"
        left={<TextInput.Icon icon="identifier" />}
        mode="outlined"
        value={formState.nationalId}
        onChangeText={(nationalId) => {
          setFieldValue(name, { ...formState, nationalId });
        }}
      />
      <TextInput
        placeholder="Enter Phone number"
        label="Phone number"
        left={<TextInput.Icon icon="phone" />}
        mode="outlined"
        value={formState.phoneNumber}
        onChangeText={(phoneNumber) => {
          setFieldValue(name, { ...formState, phoneNumber });
        }}
      />
      {errors[name] && (
        <HelperText type="error" visible={errors[name] && touched[name]}>
          {Object.values(errors[name]).join(", ")}
        </HelperText>
      )}
    </View>
  );
};

export default DeliveryPersonDetails;

const styles = StyleSheet.create({});
