import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthNavigation from "./app/navigation/AuthNavigation";
import MainTheme from "./app/theme/MainTheme";

export default function App() {
  return (
    <MainTheme>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </MainTheme>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
