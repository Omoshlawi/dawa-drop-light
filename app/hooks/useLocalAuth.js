import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

const useLocalAuth = () => {
  useEffect(() => {
    handleLocalAuth();
  }, []);
  const [fingerprintSettings, setFingerprintSettings] = useState({
    enabled: false, // check if fingerprint is enrolled
    compatible: false, //check if there exist fingerprint hardware
    results: "",
  });

  const handleLocalAuth = async () => {
    const auth = await LocalAuthentication.getEnrolledLevelAsync();
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setFingerprintSettings({
      ...fingerprintSettings,
      enabled: auth === LocalAuthentication.SecurityLevel.BIOMETRIC,
      compatible,
    });
  };

  const handleScanFingerprint = async () => {
    const results = await LocalAuthentication.authenticateAsync(
      "Scan your finger."
    );
    setFingerprintSettings({
      ...fingerprintSettings,
      results: JSON.stringify(results),
    });
    return results.success;
  };

  return {
    enabled: fingerprintSettings.enabled,
    compatible: fingerprintSettings.compatible,
    scanResuts: fingerprintSettings.results,
    authenticate: handleScanFingerprint,
    fingerPrintOk:
      fingerprintSettings.enabled && fingerprintSettings.compatible
  };
};

export default useLocalAuth;

const styles = StyleSheet.create({});
