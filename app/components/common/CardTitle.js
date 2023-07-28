import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, Card, IconButton, useTheme } from "react-native-paper";

const CardTitle = ({ onPress, text, icon, subText }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!(onPress instanceof Function)}
    >
      <Card.Title
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        title={subText ? text : undefined}
        
        subtitle={subText ? subText : text}
        subtitleVariant={subText ? "bodySmall" : "bodyLarge"}
        left={(props) => <Avatar.Icon {...props} icon={icon} />}
        right={(props) =>
          onPress instanceof Function ? (
            <IconButton
              {...props}
              icon="chevron-right"
              disabled
              iconColor={colors.primary}
            />
          ) : undefined
        }
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
