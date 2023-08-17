import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { CardTitle } from "../../components/common";
import { useSettinsContext } from "../../context/hooks";
import { List, Switch, useTheme } from "react-native-paper";
import useLocalAuth from "../../hooks/useLocalAuth";
import { Modal } from "react-native";
import { LocalAuthForm } from "../../components/localauth";

const SettingsScreen = () => {
  const {
    theme,
    enableDarkTheme,
    privacyEnabled,
    useFingerprint,
    disablePin,
    enablePin,
    enableFingerprint,
    pin: userPin,
  } = useSettinsContext();
  const { compatible, enabled, authenticate, fingerPrintOk } = useLocalAuth();
  const { colors } = useTheme();
  const [dialogInfo, setDialogInfo] = useState({
    show: false,
  });
  const handePrivacySwitch = () => {
    if (privacyEnabled) {
      Alert.alert("Confirm!", "Are you suire you wanna disable privacy", [
        {
          text: "yes",
          onPress: () => {
            disablePin(userPin);
          },
        },
        { text: "no" },
      ]);
    } else {
      setDialogInfo({ ...dialogInfo, show: true });
    }
  };

  const [pinState, setPinState] = useState({
    step: 1,
    error: false,
    message: "Please Enter pin",
  });
  const [pin, setPin] = useState({
    userPin: "",
    max: 4,
    userPinConfirm: "",
  });

  useEffect(() => {
    // Hnand message
    setPinState({ ...pin, error: false });
    if (pinState.step > 0) {
      setPinState({ ...pinState, message: "Please enter pin" });
    }
    if (pinState.step > 1) {
      setPinState({ ...pinState, message: "Please confirm pin" });
    }
    // handle move to next step
    if (pinState.step === 1 && `${pin.userPin}`.length === pin.max) {
      console.log("Move to step 2");
      setPinState({ ...pinState, step: 2 });
    }
    if (pinState.step === 2 && `${pin.userPinConfirm}`.length === pin.max) {
      console.log("Check if pins are same");
      if (pin.userPin === pin.userPinConfirm) {
        // setPin
        enablePin(pin.userPin);
        setDialogInfo({ ...dialogInfo, show: false });
      } else {
        setPinState({
          ...pinState,
          error: true,
          message: "Pin don't match",
          step: 1,
        });
        setPin({ ...pin, userPin: "", userPinConfirm: "" });
      }
    }
  }, [pin]);
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.screen}>
        <List.Section title="Theme settings">
          <List.Item
            title="Theme"
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            description={theme}
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={(props) => (
              <Switch
                value={theme === "dark"}
                onValueChange={enableDarkTheme}
              />
            )}
          />
        </List.Section>
        <List.Section title="Privacy Settings">
          <List.Accordion
            style={[styles.listItem, { backgroundColor: colors.surface }]}
            title="Enable advanced privacy features"
            left={(props) => <List.Icon {...props} icon="shield-key-outline" />}
            right={(props) => (
              <Switch value={privacyEnabled} color={colors.primary} />
            )}
            expanded={privacyEnabled}
            onPress={handePrivacySwitch}
          >
            {fingerPrintOk ? (
              <List.Item
                title="Enable fingerprint Unlock"
                style={[styles.listItem, { backgroundColor: colors.surface }]}
                right={(props) => (
                  <Switch
                    value={Boolean(useFingerprint)}
                    color={colors.primary}
                    onValueChange={async (value) => {
                      if (await authenticate()) {
                        enableFingerprint(value);
                      }
                    }}
                  />
                )}
              />
            ) : null}
          </List.Accordion>
        </List.Section>
      </ScrollView>
      <Modal
        visible={dialogInfo.show}
        onRequestClose={() => {
          setDialogInfo({ ...dialogInfo, show: false });
          setPin({ ...pin, userPin: "", userPinConfirm: "" });
          setPinState({ ...pinState, error: "", message: "", step: 1 });
        }}
      >
        <LocalAuthForm
          maxDigits={pin.max}
          pin={pinState.step === 1 ? pin.userPin : pin.userPinConfirm}
          onPinChanged={(userPin) => {
            if (pinState.step === 1) setPin({ ...pin, userPin });
            else setPin({ ...pin, userPinConfirm: userPin });
          }}
          error={pinState.error}
          message={pinState.message}
        />
      </Modal>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 2,
  },
  screen: {
    flex: 1,
  },
});
