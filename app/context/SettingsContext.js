import React, { createContext } from "react";

const SettingsContext = createContext();
export const SettingsContextProvider = SettingsContext.Provider;
export const SettingsContextConsumer = SettingsContext.Consumer;

export default SettingsContext;
