import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncStorage = (key, initialValue) => {
  const prefix = "cache_async_";
  const [valueStored, setValueToStore] = useState(initialValue);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const val = await AsyncStorage.getItem(prefix + key);
        const item = JSON.parse(val);
        if (item) {
          setValueToStore(item);
        }
      } catch (error) {
        console.log("Error: " + "useAsynceStorage->Get", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (valueStored) {
      asyncStore(valueStored);
    }
  }, [valueStored]);

  useEffect(() => {
    if (clear) {
      setValueToStore(null);
      asyncDelete();
      setClear(false);
    }
  }, [clear]);

  const asyncStore = async (value) => {
    try {
      await AsyncStorage.setItem(prefix + key, JSON.stringify(value));
    } catch (error) {
      console.log("Error: " + "useAsyncStorage->Set", error);
    }
  };

  const asyncDelete = async () => {
    try {
      await AsyncStorage.removeItem(prefix + key);
    } catch (error) {
      console.log("Error: " + "useAsyncStorage->Delete", error);
    }
  };

  return [valueStored, setValueToStore, setClear];
};

export default useAsyncStorage;
