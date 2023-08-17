import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import LocalAuthForm from "./LocalAuthForm";
import { useSettinsContext } from "../../context/hooks";

const Authentication = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { authenticate } = useSettinsContext();
  useEffect(() => {
    if (`${pin}`.length === 4) {
      if (!authenticate(pin)) {
        setError("Invalid Pin");
      }
    }
  }, [pin]);
  return (
    <LocalAuthForm
      pin={pin}
      onPinChanged={setPin}
      error={error}
      message={error}
    />
  );
};

export default Authentication;

const styles = StyleSheet.create({});
