import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthNavigation from "./app/navigation/AuthNavigation";
import { PaperProvider } from "react-native-paper";
import { UserContextProvider } from "./app/context/UserContext";
import useSecureStore from "./app/hooks/useSecureStore";
import MainStackNavigation from "./app/navigation/MainStackNavigation";
import { MainTheme } from "./app/theme";

export default function App() {
  const [token, setToken, clearToken] = useSecureStore("jwtToken", null);

  return (
    <UserContextProvider value={{ token, setToken, clearToken }}>
      <MainTheme>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: "#E1EDED",
            },
          }}
        >
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
