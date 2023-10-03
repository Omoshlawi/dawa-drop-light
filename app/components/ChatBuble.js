import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { screenWidth } from "../utils/contants";
import moment from "moment/moment";

const ChatBubble = ({ message, createdAt, sender, isImage, isSender }) => {
  const { colors, roundness } = useTheme();

  return (
    <TouchableOpacity style={styles.container}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isImage
              ? colors.surface
              : isSender
              ? colors.secondary
              : colors.primary,
            alignSelf: isSender ? "flex-end" : "flex-start",
          },
        ]}
      >
        <Text variant="bodySmall">{sender}</Text>
        {isImage ? (
          <Image
            source={{ uri: message }}
            resizeMode="cover"
            style={styles.image}
          />
        ) : (
          <Text style={styles.text}>{message}</Text>
        )}
        <Text variant="labelSmall" style={{ textAlign: "right" }}>
          {moment(createdAt).format("LT")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingHorizontal: 16,
  },
  bubble: {
    paddingHorizontal: 12,
    borderRadius: 12,
    maxWidth: screenWidth * 0.7,
  },
  text: {
    color: "white",
    fontSize: 16,
    minWidth: screenWidth * 0.3,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
});
