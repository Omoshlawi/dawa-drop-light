import { useContext } from "react";
import UserContext from "./UserContext";
import SettingsContext from "./SettingsContext";

export const useUserContext = () => {
  const { clearToken, user, setUser, token, setToken } =
    useContext(UserContext);
  return { clearToken, user, setUser, token, setToken };
};

export const useSettinsContext = () => {
  const { appConfiguration, setAppConfiguration, clearAppConfiguration } =
    useContext(SettingsContext);
  const { privacy, theme } = appConfiguration;
  const {
    pin,
    isAuthenticated,
    enabled,
    useBiometric: useFingerprint,
  } = privacy;
  const authenticate = (userPiin) => {
    setAppConfiguration({
      ...appConfiguration,
      privacy: { ...privacy, isAuthenticated: pin === userPiin },
    });
    return pin === userPiin;
  };
  const enablePin = (userPin) => {
    // enable pin
    setAppConfiguration({
      ...appConfiguration,
      privacy: {
        ...privacy,
        enabled: true,
        pin: userPin,
        isAuthenticated: true,
      },
    });
    return true;
  };

  const enableFingerprint = (enable) => {
    setAppConfiguration({
      ...appConfiguration,
      privacy: {
        ...privacy,
        useBiometric: Boolean(enable),
      },
    });
  };

  const disablePin = (userPin) => {
    if (userPin === pin) {
      setAppConfiguration({
        ...appConfiguration,
        privacy: { ...privacy, enabled: false },
      });
    }
    userPin === pin;
  };

  const deAuthenticate = () => {
    setAppConfiguration({
      ...appConfiguration,
      privacy: { ...privacy, isAuthenticated: false },
    });
  };
  const enableDarkTheme = (enable = false) => {
    setAppConfiguration({
      ...appConfiguration,
      theme: enable ? "dark" : "light",
    });
  };
  return {
    pin,
    deAuthenticate,
    isAuthenticated,
    authenticate,
    enablePin,
    disablePin,
    privacyEnabled: enabled,
    clearAppConfiguration,
    appConfiguration,
    enableFingerprint,
    useFingerprint,
    enableDarkTheme,
    theme: theme ? theme : "light",
  };
};
