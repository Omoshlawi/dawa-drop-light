import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { CardTitle } from "../../components/common";
import { useSettinsContext } from "../../context/hooks";
import { List, Switch, useTheme } from "react-native-paper";

const SettingsScreen = () => {
  const { theme, enableDarkTheme } = useSettinsContext();
  const { colors } = useTheme();
  return (
    <ScrollView style={styles.screen}>
      <List.Item
        title="Theme"
        style={[styles.listItem, { backgroundColor: colors.surface }]}
        description={theme}
        left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
        right={(props) => (
          <Switch value={theme === "dark"} onValueChange={enableDarkTheme} />
        )}
      />
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 2,
  },
});
