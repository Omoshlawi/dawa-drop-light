import { StyleSheet, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { useFormikContext } from "formik";
import { DateTimePicker } from "../../input";
import moment from "moment/moment";

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
        inputMode="numeric"
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
        inputMode="tel"
        value={formState.phoneNumber}
        onChangeText={(phoneNumber) => {
          setFieldValue(name, { ...formState, phoneNumber });
        }}
      />
      <DateTimePicker
        defaultMode="time"
        icon="clock"
        label="Pick up time"
        value={formState.pickUpTime}
        onChangeValue={(pickUpTime) => {
          setFieldValue(name, { ...formState, pickUpTime });
        }}
        formarter={(date) => moment(date).format("HH:mm")}
      />
      {errors[name] && (
        <HelperText type="error" visible={errors[name] && touched[name]}>
          {typeof errors[name] === "object"
            ? Object.values(errors[name]).join(", ")
            : `${errors[name]}`}
        </HelperText>
      )}
    </View>
  );
};

export default DeliveryPersonDetails;

const styles = StyleSheet.create({});
