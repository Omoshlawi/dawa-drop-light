import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconButton, useTheme } from "react-native-paper";
import { TextInput } from "react-native-paper";

const ChatBottomForm = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Type message"
          right={<TextInput.Icon icon={"camera"} />}
          mode="outlined"
        />
      </View>
      <IconButton
        icon={"send"}
        onPress={() => {}}
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
    alignItems: "center",
  },
});
