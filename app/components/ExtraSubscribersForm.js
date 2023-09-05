import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { default as CommunityDateTimePicker } from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useTheme,
  Text,
  TextInput,
  Button,
  HelperText,
} from "react-native-paper";
import { Pressable } from "react-native";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native";
import { getRandomColor } from "../utils/helpers";
import { Dialog } from "./dialog";
import { useFormikContext } from "formik";

const ExtraSubscribersForm = ({
  label = "Extra subscribers",
  onChangeValue,
  icon,
  name,
}) => {
  const { colors, roundness } = useTheme();
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
    name: "",
    phoneNumber: "",
    cccNumber: "",
    error: "",
  });
  const { setFieldValue, errors, touched, values } = useFormikContext();
  return (
    <>
      <View style={styles.component}>
        {values[name].length > 0 && label && (
          <Text
            style={[
              styles.label,
              {
                backgroundColor: colors.background,
                color: colors.onSurfaceVariant,
              },
            ]}
            variant="labelSmall"
          >
            {label}
          </Text>
        )}
        <View
          style={[
            styles.container,
            { borderRadius: roundness, borderColor: colors.outline },
          ]}
        >
          <View style={styles.inputContainer}>
            {icon && (
              <TouchableHighlight
                underlayColor={colors.disabled}
                style={{ borderRadius: 10 }}
                onPress={() => setDialogInfo({ ...dialogInfo, show: true })}
              >
                <MaterialCommunityIcons
                  name={icon}
                  size={20}
                  color={colors.outline}
                />
              </TouchableHighlight>
            )}

            {values[name].length > 0 ? (
              <FlatList
                horizontal
                data={values[name]}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.disabled,
                      borderRadius: roundness,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      marginHorizontal: 3,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      const _values = [...values[name]];
                      _values.splice(index, 1);
                      setFieldValue(name, _values);
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: getRandomColor(),
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 3,
                      }}
                    />
                    <Text>{`${item.name} (${item.phoneNumber} | ${item.cccNumber})`}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text variant="labelLarge" style={styles.textInput}>
                {label}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => setDialogInfo({ ...dialogInfo, show: true })}
              style={{ borderRadius: 10 }}
            >
              <MaterialCommunityIcons
                name="plus"
                size={20}
                color={colors.outline}
              />
            </TouchableOpacity>

            <Dialog
              visible={dialogInfo.show}
              swipable
              onRequestClose={() =>
                setDialogInfo({ ...dialogInfo, show: false })
              }
            >
              <View style={{}}>
                <Text variant="titleMedium" style={{ textAlign: "center" }}>
                  Add extra people you want to send reminder nortification to
                </Text>
                <TextInput
                  mode="outlined"
                  label="Name"
                  placeholder="Enter name"
                  left={<TextInput.Icon icon="account" />}
                  value={dialogInfo.name}
                  onChangeText={(name) =>
                    setDialogInfo({ ...dialogInfo, name })
                  }
                />
                <TextInput
                  mode="outlined"
                  label="Patient CCC Number"
                  placeholder="Enter ccc number"
                  left={<TextInput.Icon icon="identifier" />}
                  value={dialogInfo.cccNumber}
                  onChangeText={(cccNumber) =>
                    setDialogInfo({ ...dialogInfo, cccNumber })
                  }
                />
                <TextInput
                  mode="outlined"
                  label="Phone number"
                  placeholder="Enter phone number"
                  left={<TextInput.Icon icon="phone" />}
                  inputMode="tel"
                  value={dialogInfo.phoneNumber}
                  onChangeText={(phoneNumber) =>
                    setDialogInfo({ ...dialogInfo, phoneNumber })
                  }
                />
                {dialogInfo["error"] && (
                  <HelperText type="error" visible={dialogInfo.error}>
                    {dialogInfo.error}
                  </HelperText>
                )}

                <Button
                  mode="contained"
                  style={{ marginVertical: 5 }}
                  onPress={() => {
                    const {
                      name: userName,
                      phoneNumber,
                      cccNumber,
                    } = dialogInfo;
                    if (userName && phoneNumber && cccNumber) {
                      setFieldValue(name, [
                        ...values[name],
                        {
                          name: userName,
                          phoneNumber,
                          cccNumber,
                        },
                      ]);
                      setDialogInfo({
                        ...dialogInfo,
                        name: "",
                        phoneNumber: "",
                        cccNumber: "",
                        show: false,
                      });
                    } else {
                      setDialogInfo({
                        ...dialogInfo,
                        error:
                          "Please provide name, ccc number and phone number",
                      });
                    }
                  }}
                >
                  Add
                </Button>
              </View>
            </Dialog>
          </View>
        </View>
      </View>
      {errors[name] && (
        <HelperText type="error" visible={errors[name] && touched[name]}>
          {typeof errors[name] === "object"
            ? Object.values(errors[name]).join(", ")
            : `${errors[name]}`}
        </HelperText>
      )}
    </>
  );
};

export default ExtraSubscribersForm;

const styles = StyleSheet.create({
  label: {
    left: 10,
    position: "absolute",
    zIndex: 1,
    paddingHorizontal: 5,
  },
  component: {
    marginTop: 5,
  },
  container: {
    borderWidth: 1,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    margin: 5,
    padding: 10,
    flex: 1,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
