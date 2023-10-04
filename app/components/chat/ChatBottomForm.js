import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { IconButton, useTheme } from "react-native-paper";
import { TextInput } from "react-native-paper";
import XImagePicker from "./XImagePicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChatBottomForm = ({ onMessageChange, message, onSend }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <IconButton
        icon={message.messageType === "image" ? "keyboard" : "camera"}
        mode="outlined"
        onPress={() => {
          if (message?.messageType === "image") {
            return onMessageChange({ messageType: "text", message: "" });
          }
          if (message?.messageType === "text") {
            return onMessageChange({ messageType: "image", message: "" });
          }
        }}
      />
      <View style={{ flex: 1 }}>
        {message.messageType === "text" && (
          <TextInput
            placeholder="message ...."
            mode="outlined"
            multiline
            onChangeText={(message) =>
              onMessageChange({
                message,
                messageType: "text",
              })
            }
            value={
              message?.messageType === "text" ? message.message : undefined
            }
          />
        )}
        {message.messageType === "image" && (
          <XImagePicker
            onImageChange={(imageUri) =>
              onMessageChange({
                messageType: "image",
                message: imageUri,
              })
            }
            image={
              message?.messageType === "image" ? message.message : undefined
            }
          >
            {message.message ? (
              <Image
                source={{ uri: message.message }}
                resizeMode="contain"
                style={{ width: 200, height: 200, borderRadius: 12 }}
              />
            ) : (
              <MaterialCommunityIcons name="image-area" size={200} />
            )}
          </XImagePicker>
        )}
      </View>
      <IconButton
        icon={"send"}
        onPress={onSend}
        mode="contained"
        iconColor={"white"}
        containerColor={colors.primary}
      />
    </View>
  );
};

export default ChatBottomForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    alignItems: "flex-end",
  },
});
