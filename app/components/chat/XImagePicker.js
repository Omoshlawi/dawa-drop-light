import { Image, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { TextInput, useTheme } from "react-native-paper";

const XImagePicker = ({ children, image, onImageChange }) => {
  const [status, requestPermision] = useMediaLibraryPermissions();
  const handleOnClick = async () => {
    if (image) {
      Alert.alert("Delete", "Are tou sure you want to delete this image", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onImageChange(undefined),
          style: "destructive",
        },
      ]);
    } else {
      await pickImage();
    }
  };

  const pickImage = async () => {
    try {
      const { assets, canceled } = await launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: MediaTypeOptions.Images,
        quality: 0.5, //hold value between o and 1, 1 for highest quality and 1 best highest quality
      });
      if (canceled) {
      } else {
        onImageChange(assets[0].uri);
      }
    } catch (error) {
      alert(error);
    }
  };
  const askImagePermisions = async () => {
    const { granted } = await requestPermision();
    if (!granted) {
      alert("Permisions for camera access need");
    }
  };

  useEffect(() => {
    askImagePermisions();
  }, []);
  return (
    <TouchableOpacity onPress={handleOnClick}>{children}</TouchableOpacity>
  );
};

export default XImagePicker;

const styles = StyleSheet.create({});
