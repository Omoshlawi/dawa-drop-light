import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthNavigation from "./app/navigation/AuthNavigation";
import { PaperProvider } from "react-native-paper";
import MainTheme from "./app/theme/MainTheme";
import { UserContextProvider } from "./app/context/UserContext";
import useSecureStore from "./app/hooks/useSecureStore";
import MainStackNavigation from "./app/navigation/MainStackNavigation";

export default function App() {
  const [token, setToken, clearToken] = useSecureStore("jwtToken", null);

  return (
    <UserContextProvider value={{ token, setToken, clearToken }}>
      <MainTheme>
        <NavigationContainer>
          <MainStackNavigation />
        </NavigationContainer>
      </MainTheme>
    </UserContextProvider>
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
