import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import LocalAuthForm from "./LocalAuthForm";
import { useSettinsContext } from "../../context/hooks";

const Authentication = () => {
  const [pin, setPin] = useState("");
  const [formState, setFormState] = useState({
    error: false,
    message: "",
  });
  const { authenticate } = useSettinsContext();
  useEffect(() => {
    if (pin) setFormState({ ...formState, error: false, message: "Enter pin" });
    if (`${pin}`.length === 4) {
      if (!authenticate(pin)) {
        setFormState({
          ...formState,
          error: true,
          message: "Invalid pin, please retry",
        });
      }
      setPin("");
    }
  }, [pin]);
  return (
    <LocalAuthForm
      pin={pin}
      onPinChanged={setPin}
      error={formState.error}
      message={formState.message}
      scanFingerPrint={() => {}}
    />
  );
};

export default Authentication;

const styles = StyleSheet.create({});
