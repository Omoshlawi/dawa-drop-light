import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, Card, IconButton, useTheme } from "react-native-paper";

const CardTitle = ({ onPress, text, icon }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <Card.Title
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        subtitle={text}
        subtitleVariant="bodyLarge"
        left={(props) => <Avatar.Icon {...props} icon={icon} />}
        right={(props) => (
          <IconButton
            {...props}
            icon="chevron-right"
            disabled
            iconColor={colors.primary}
          />
        )}
      />
    </TouchableOpacity>
  );
};

export default CardTitle;

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 5,
  },
});
