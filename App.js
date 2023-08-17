
import { StatusBar } from "expo-status-bar";
import { Modal, StyleSheet, Text, View } from "react-native";
import { UserContextProvider } from "./app/context/UserContext";
import useSecureStore from "./app/hooks/useSecureStore";
import MainStackNavigation from "./app/navigation/MainStackNavigation";
import { MainTheme } from "./app/theme";
import useAsyncStorage from "./app/hooks/useAsyncStorage";
import { AppState } from "react-native";
import React, { useEffect } from "react";
import { SettingsContextProvider } from "./app/context/SettingsContext";
import ThemedNavigationContainer from "./app/navigation/ThemedNavigationContainer";
import { Authentication } from "./app/components/localauth";

export default function App() {
  const [token, setToken, clearToken] = useSecureStore("jwtToken", null);
  const [appConf, setAppConf, clearAppConf] = useAsyncStorage("config", {
    privacy: {
      isAuthenticated: false,
      pin: null,
      enabled: false,
      useBiometric: false,
    },
    theme: "light",
  });

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      // App gains focus
      // Perform your login logic here
      console.log("App is active, state is", appConf);
    } else if (nextAppState.match(/inactive|background/)) {
      // App goes to background or is closed
      // Perform any necessary cleanup or logout logic here
      if (appConf && appConf.privacy.enabled) {
        console.log("App is in background or closed, state is", appConf);
        setAppConf((prevAppConf) => ({
          ...prevAppConf,
          privacy: { ...prevAppConf.privacy, isAuthenticated: false },
        }));
      }
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [appConf]);
  return (
    <UserContextProvider value={{ token, setToken, clearToken }}>
      <SettingsContextProvider
        value={{
          appConfiguration: appConf,
          setAppConfiguration: setAppConf,
          clearAppConfiguration: clearAppConf,
        }}
      >
        <StatusBar style={appConf.theme} />
        <MainTheme theme={appConf.theme}>
          <ThemedNavigationContainer>
            <MainStackNavigation />
          </ThemedNavigationContainer>
          <Modal
            visible={
              !appConf.privacy.isAuthenticated && appConf.privacy.enabled
            }
          >
            <Authentication />
          </Modal>
        </MainTheme>
      </SettingsContextProvider>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
